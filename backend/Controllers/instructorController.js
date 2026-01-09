import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* ================= TOTAL COURSES ================= */
export const totalCourses = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    // ✅ FIXED
    const instructorId = req.user.user_id;

    const [[{ totalCourses }]] = await db.query(
      `SELECT COUNT(*) AS totalCourses
       FROM courses
       WHERE instructor_id = ?`,
      [instructorId]
    );

    return res.status(200).json({
      success: true,
      totalCourses,
    });
  } catch (error) {
    console.error("Total courses error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get courses",
    });
  }
};

/* ================= TOTAL STUDENTS ================= */
export const totalStudents = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    // ✅ FIXED
    const instructorId = req.user.user_id;

    const [[{ totalStudents }]] = await db.query(
      `SELECT COUNT(DISTINCT e.learner_id) AS totalStudents
       FROM enrollments e
       JOIN courses c ON e.course_id = c.course_id
       WHERE c.instructor_id = ?`,
      [instructorId]
    );

    return res.status(200).json({
      success: true,
      totalStudents,
    });
  } catch (error) {
    console.error("Total students error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get students",
    });
  }
};

/* ================= TOTAL EARNINGS ================= */
export const totalEarnings = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    // ✅ FIXED
    const instructorId = req.user.user_id;

    const [[{ totalEarnings }]] = await db.query(
      `SELECT 
        IFNULL(SUM(p.instructor_share), 0) AS totalEarnings
      FROM payments p
      JOIN enrollments e ON p.enrollment_id = e.enrollment_id
      JOIN courses c ON e.course_id = c.course_id
      WHERE c.instructor_id = ?`,
      [instructorId]
    );

    return res.status(200).json({
      success: true,
      totalEarnings,
    });
  } catch (error) {
    console.error("Total earnings error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get Total Earning",
    });
  }
};

/* ================= VIDEO DURATION HELPER ================= */
const getVideoDurationWithRetry = async (publicId, retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const resource = await cloudinary.api.resource(publicId, {
        resource_type: "video",
      });

      if (resource?.duration) {
        return Math.floor(resource.duration);
      }
    } catch (error) {
      console.error("Cloudinary metadata error:", error.message);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return 0;
};

/* ================= ADD COURSE ================= */
export const addCourse = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const instructorId = req.user.user_id;
    const { title, description, language, course_type, price } = req.body;

    if (!title || !language) {
      return res.status(400).json({
        success: false,
        message: "Title and language are required",
      });
    }

    if (!req.files?.thumbnail || !req.files?.video) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail and video are required",
      });
    }

    if (course_type === "PAID" && (!price || price <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Valid price is required for paid courses",
      });
    }

    const thumbnailFile = req.files.thumbnail[0];
    const videoFile = req.files.video[0];

    if (videoFile.size > 500 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Video size exceeds 500MB limit",
      });
    }

    /* Upload Video */
    const videoUploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "courses/videos" },
        (error, result) => (error ? reject(error) : resolve(result))
      );

      streamifier.createReadStream(videoFile.buffer).pipe(stream);
    });

    const videoDurationSeconds = await getVideoDurationWithRetry(
      videoUploadResult.public_id
    );

    /* Upload Thumbnail */
    const thumbnailUploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "courses/thumbnails" },
        (error, result) => (error ? reject(error) : resolve(result))
      );

      streamifier.createReadStream(thumbnailFile.buffer).pipe(stream);
    });

    const [result] = await db.query(
      `INSERT INTO courses (
        instructor_id,
        title,
        description,
        language,
        course_type,
        price,
        thumbnail_url,
        video_url,
        video_duration_hours
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Course uploaded successfully",
      courseId: result.insertId,
    });
  } catch (error) {
    console.error("Add Course Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
