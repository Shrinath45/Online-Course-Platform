import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* ================= TOTAL COURSES ================= */
export const totalCourses = async (req, res) => {
  try {
    if (!req.user?.user_id) return res.status(401).json({ success: false, message: "Unauthorized User" });

    const instructorId = req.user.user_id;

    const [[{ totalCourses }]] = await db.query(
      `SELECT COUNT(*) AS totalCourses FROM courses WHERE instructor_id = ?`,
      [instructorId]
    );

    return res.status(200).json({ success: true, totalCourses });
  } catch (error) {
    console.error("Total courses error:", error);
    return res.status(500).json({ success: false, message: "Unable to get courses" });
  }
};

/* ================= TOTAL STUDENTS ================= */
export const totalStudents = async (req, res) => {
  try {
    if (!req.user?.user_id) return res.status(401).json({ success: false, message: "Unauthorized User" });

    const instructorId = req.user.user_id;

    const [[{ totalStudents }]] = await db.query(
      `SELECT COUNT(DISTINCT e.user_id) AS totalStudents
       FROM enrollments e
       JOIN courses c ON e.course_id = c.course_id
       WHERE c.instructor_id = ?`,
      [instructorId]
    );

    return res.status(200).json({ success: true, totalStudents });
  } catch (error) {
    console.error("Total students error:", error);
    return res.status(500).json({ success: false, message: "Unable to get students" });
  }
};

/* ================= PENDING COURSES ================= */
export const pendingCoursesCount = async (req, res) => {
  try {
    if (!req.user?.user_id) return res.status(401).json({ success: false, message: "Unauthorized User" });

    const instructorId = req.user.user_id;

    const [[{ pendingCourses }]] = await db.query(
      `SELECT COUNT(*) AS pendingCourses 
       FROM courses 
       WHERE instructor_id = ? AND approval_status = 'PENDING'`,
      [instructorId]
    );

    return res.status(200).json({ success: true, pendingCourses });
  } catch (error) {
    console.error("Pending courses count error:", error);
    return res.status(500).json({ success: false, message: "Unable to get pending courses" });
  }
};

/* ================= TOTAL EARNINGS ================= */
export const totalEarnings = async (req, res) => {
  try {
    if (!req.user?.user_id) return res.status(401).json({ success: false, message: "Unauthorized User" });

    const instructorId = req.user.user_id;

    const [[{ totalEarnings }]] = await db.query(
      `SELECT IFNULL(SUM(p.instructor_share), 0) AS totalEarnings
       FROM payments p
       JOIN enrollments e ON p.enrollment_id = e.enrollment_id
       JOIN courses c ON e.course_id = c.course_id
       WHERE c.instructor_id = ?`,
      [instructorId]
    );

    return res.status(200).json({ success: true, totalEarnings });
  } catch (error) {
    console.error("Total earnings error:", error);
    return res.status(500).json({ success: false, message: "Unable to get Total Earning" });
  }
};

/* ================= VIDEO DURATION HELPER ================= */
const getVideoDurationWithRetry = async (publicId, retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const resource = await cloudinary.api.resource(publicId, { resource_type: "video" });
      if (resource?.duration) return Math.floor(resource.duration);
    } catch (error) {
      console.error("Cloudinary metadata error:", error.message);
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  return 0;
};

/* ================= ADD COURSE ================= */
export const addCourse = async (req, res) => {
  try {
    if (!req.user?.user_id) return res.status(401).json({ success: false, message: "Unauthorized" });

    const instructorId = req.user.user_id;
    const { title, description, language, course_type, price } = req.body;

    if (!title || !language)
      return res.status(400).json({ success: false, message: "Title and language are required" });
    if (!req.files?.thumbnail || !req.files?.video)
      return res.status(400).json({ success: false, message: "Thumbnail and video are required" });
    if (course_type === "PAID" && (!price || price <= 0))
      return res.status(400).json({ success: false, message: "Valid price is required for paid courses" });

    const thumbnailFile = req.files.thumbnail[0];
    const videoFile = req.files.video[0];

    if (videoFile.size > 2048 * 1024 * 1024)
      return res.status(400).json({ success: false, message: "Video size exceeds 500MB limit" });

    // ---------------- UPLOAD VIDEO ----------------
    const videoUploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "courses/videos", format: "mp4", eager: [{ format: "mp4", quality: "auto" }], eager_async: true },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      streamifier.createReadStream(videoFile.buffer).pipe(stream);
    });

    let videoDurationSeconds = videoUploadResult.duration || 0;
    if (!videoDurationSeconds) videoDurationSeconds = await getVideoDurationWithRetry(videoUploadResult.public_id, 15);

    const videoDurationMinutes = Math.floor(videoDurationSeconds / 60);
    const videoDurationHours = Number((videoDurationSeconds / 3600).toFixed(2));

    // ---------------- UPLOAD THUMBNAIL ----------------
    const thumbnailUploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "courses/thumbnails" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      streamifier.createReadStream(thumbnailFile.buffer).pipe(stream);
    });

    // ---------------- SAVE COURSE TO DB ----------------
    const [result] = await db.query(
      `INSERT INTO courses (
        instructor_id, title, description, language, course_type, price, thumbnail_url, video_url, 
        video_duration_seconds, video_duration_minutes, video_duration_hours
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        instructorId,
        title,
        description || null,
        language,
        course_type === "PAID" ? "PAID" : "FREE",
        course_type === "PAID" ? price : 0,
        thumbnailUploadResult.secure_url,
        videoUploadResult.secure_url,
        videoDurationSeconds,
        videoDurationMinutes,
        videoDurationHours
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Course uploaded successfully",
      courseId: result.insertId,
      duration: { seconds: videoDurationSeconds, minutes: videoDurationMinutes, hours: videoDurationHours }
    });

  } catch (error) {
    console.error("Add Course Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= GET INSTRUCTOR COURSES ================= */
export const getInstructorCourses = async (req, res) => {
  try {
    if (!req.user?.user_id) return res.status(401).json({ success: false, message: "Unauthorized User" });

    const instructorId = req.user.user_id;

    const [courses] = await db.query(
      `SELECT 
        course_id, title, thumbnail_url, video_url, language, course_type, price, approval_status,
        video_duration_seconds, video_duration_minutes, video_duration_hours, created_at
       FROM courses
       WHERE instructor_id = ?
       ORDER BY created_at DESC`,
      [instructorId]
    );

    const formattedCourses = courses.map(course => ({
      ...course,
      duration: {
        seconds: course.video_duration_seconds,
        minutes: course.video_duration_minutes,
        hours: course.video_duration_hours
      }
    }));

    return res.status(200).json({ success: true, courses: formattedCourses });
  } catch (error) {
    console.error("Get instructor courses error:", error);
    return res.status(500).json({ success: false, message: "Unable to fetch courses" });
  }
};

/* ================= DELETE COURSE ================= */
export const deleteCourse = async (req, res) => {
  try {
    if (!req.user?.user_id) return res.status(401).json({ success: false, message: "Unauthorized user" });

    const instructorId = req.user.user_id;
    const { course_id } = req.params;

    const [result] = await db.query(
      `DELETE FROM courses WHERE course_id = ? AND instructor_id = ?`,
      [course_id, instructorId]
    );

    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Course not found or not authorized" });

    return res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete course error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
