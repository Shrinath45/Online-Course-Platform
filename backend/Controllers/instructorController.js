// import db from "../config/db.js";
// import cloudinary from "../config/cloudinary.js";
// import streamifier from "streamifier";

// /**
//  * GET /api/instructor/dashboard
//  */
// export const getDashboardData = async (req, res) => {
//   try {
//     if (!req.user || !req.user.user_id) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const instructorId = req.user.user_id;

//     /* -------- TOTAL COURSES -------- */
//     const [[{ totalCourses }]] = await db.query(
//       `SELECT COUNT(*) AS totalCourses
//        FROM courses
//        WHERE instructor_id = ?`,
//       [instructorId]
//     );

//     /* -------- TOTAL STUDENTS -------- */
//     const [[{ totalStudents }]] = await db.query(
//       `SELECT COUNT(DISTINCT e.student_id) AS totalStudents
//        FROM enrollments e
//        JOIN courses c ON e.course_id = c.course_id
//        WHERE c.instructor_id = ?`,
//       [instructorId]
//     );

//     /* -------- TOTAL EARNINGS -------- */
//     const [[{ totalEarnings }]] = await db.query(
//       `SELECT COALESCE(SUM(amount),0) AS totalEarnings
//        FROM transactions
//        WHERE instructor_id = ? AND status = 'Completed'`,
//       [instructorId]
//     );

//     /* -------- RECENT COURSES -------- */
//     const [recentCourses] = await db.query(
//       `SELECT
//         c.course_id,
//         c.title,
//         c.course_type,
//         c.price,
//         COUNT(e.id) AS students
//        FROM courses c
//        LEFT JOIN enrollments e ON c.course_id = e.course_id
//        WHERE c.instructor_id = ?
//        GROUP BY c.course_id
//        ORDER BY c.created_at DESC
//        LIMIT 5`,
//       [instructorId]
//     );

//     res.json({
//       success: true,
//       data: {
//         totalCourses,
//         totalStudents,
//         totalEarnings: Number(totalEarnings),
//         recentCourses,
//       },
//     });
//   } catch (error) {
//     console.error("Dashboard Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // export const addCourse = async (req, res) => {
// //   try {
// //     /* ---------------- AUTH CHECK ---------------- */
// //     if (!req.user?.user_id) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Unauthorized",
// //       });
// //     }

// //     const instructorId = req.user.user_id;

// //     /* ---------------- BODY DATA ---------------- */
// //     const { title, description, language, course_type, price } = req.body;

// //     if (!title || !language) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Title and language are required",
// //       });
// //     }

// //     if (!req.files?.thumbnail || !req.files?.video) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Thumbnail and video are required",
// //       });
// //     }

// //     const thumbnailFile = req.files.thumbnail[0];
// //     const videoFile = req.files.video[0];

// //     /* ---------------- UPLOAD VIDEO ---------------- */
// //     const uploadVideo = () =>
// //       new Promise((resolve, reject) => {
// //         const stream = cloudinary.uploader.upload_stream(
// //           {
// //             resource_type: "video",
// //             folder: "courses/videos",
// //           },
// //           (error, result) => {
// //             if (error) reject(error);
// //             else resolve(result);
// //           }
// //         );

// //         streamifier.createReadStream(videoFile.buffer).pipe(stream);
// //       });

// //     const videoUploadResult = await uploadVideo();

// //     /* ---------------- VIDEO DURATION ---------------- */
// //     const durationInSeconds = videoUploadResult.duration || 0;
// //     const videoDurationHours = (durationInSeconds / 3600).toFixed(2);

// //     /* ---------------- UPLOAD THUMBNAIL ---------------- */
// //     const uploadThumbnail = () =>
// //       new Promise((resolve, reject) => {
// //         const stream = cloudinary.uploader.upload_stream(
// //           {
// //             folder: "courses/thumbnails",
// //           },
// //           (error, result) => {
// //             if (error) reject(error);
// //             else resolve(result);
// //           }
// //         );

// //         streamifier.createReadStream(thumbnailFile.buffer).pipe(stream);
// //       });

// //     const thumbnailUploadResult = await uploadThumbnail();

// //     /* ---------------- INSERT INTO DB ---------------- */
// //     const [result] = await db.query(
// //       `INSERT INTO courses
// //       (
// //         instructor_id,
// //         title,
// //         description,
// //         language,
// //         course_type,
// //         price,
// //         thumbnail_url,
// //         video_url,
// //         video_duration_hours
// //       )
// //       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
// //       [
// //         instructorId,
// //         title,
// //         description || null,
// //         language,
// //         course_type === "PAID" ? "PAID" : "FREE",
// //         course_type === "PAID" ? price : 0,
// //         thumbnailUploadResult.secure_url,
// //         videoUploadResult.secure_url,
// //         videoDurationHours,
// //       ]
// //     );

// //     return res.status(201).json({
// //       success: true,
// //       message: "Course uploaded successfully",
// //       courseId: result.insertId,
// //     });
// //   } catch (error) {
// //     console.error("Add Course Error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //     });
// //   }
// // };

// const getVideoDurationWithRetry = async (publicId, retries = 5) => {
//   for (let i = 0; i < retries; i++) {
//     const resource = await cloudinary.api.resource(publicId, {
//       resource_type: "video",
//     });

//     if (resource.duration) {
//       return resource.duration; // seconds
//     }

//     // wait 2 seconds before retrying
//     await new Promise(resolve => setTimeout(resolve, 2000));
//   }

//   return 0;
// };

// /* ---------------- ADD COURSE ---------------- */
// export const addCourse = async (req, res) => {
//   try {
//     /* ---------------- AUTH CHECK ---------------- */
//     if (!req.user?.user_id) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const instructorId = req.user.user_id;
//     const { title, description, language, course_type, price } = req.body;

//     if (!title || !language) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and language are required",
//       });
//     }

//     if (!req.files?.thumbnail || !req.files?.video) {
//       return res.status(400).json({
//         success: false,
//         message: "Thumbnail and video are required",
//       });
//     }

//     const thumbnailFile = req.files.thumbnail[0];
//     const videoFile = req.files.video[0];

//     /* ---------------- UPLOAD VIDEO ---------------- */
//     const uploadVideo = () =>
//       new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: "video",
//             folder: "courses/videos",
//           },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );

//         streamifier.createReadStream(videoFile.buffer).pipe(stream);
//       });

//     const videoUploadResult = await uploadVideo();

//     /* ---------------- FETCH VIDEO METADATA FROM CLOUDINARY ---------------- */
//     const durationInSeconds = await getVideoDurationWithRetry(
//   videoUploadResult.public_id
// );

//     const videoDurationHours = (durationInSeconds / 3600).toFixed(2);

//     /* ---------------- UPLOAD THUMBNAIL ---------------- */
//     const uploadThumbnail = () =>
//       new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             folder: "courses/thumbnails",
//           },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );

//         streamifier.createReadStream(thumbnailFile.buffer).pipe(stream);
//       });

//     const thumbnailUploadResult = await uploadThumbnail();

//     /* ---------------- INSERT INTO DB ---------------- */
//     const [result] = await db.query(
//       `INSERT INTO courses
//       (
//         instructor_id,
//         title,
//         description,
//         language,
//         course_type,
//         price,
//         thumbnail_url,
//         video_url,
//         video_duration_hours
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         instructorId,
//         title,
//         description || null,
//         language,
//         course_type === "PAID" ? "PAID" : "FREE",
//         course_type === "PAID" ? price : 0,
//         thumbnailUploadResult.secure_url,
//         videoUploadResult.secure_url,
//         videoDurationHours,
//       ]
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Course uploaded successfully",
//       courseId: result.insertId,
//     });

//   } catch (error) {
//     console.error("Add Course Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const totalCourses = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const instructorId = req.user_id;

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

export const totalStudents = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const instructorId = req.user_id;

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
    console.error("Total courses error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get students",
    });
  }
};

export const totalEarnings = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const instructorId = req.user.id;

    const [[{ totalEarnings }]] = await db.query(
      `SELECT COALESCE(SUM(p.amount),0) AS totalEarnings
      FROM payments p
      JOIN courses c ON p.course_id = c.course_id
      WHERE c.instructor_id = ?
      AND p.status = 'Completed'`,
      [instructorId]
    );

    return res.status(200).json({
      success: true,
      totalEarnings,
    });
  } catch (error) {
    console.error("Total courses error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get Total Earning",
    });
  }
};

const getVideoDurationWithRetry = async (publicId, retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const resource = await cloudinary.api.resource(publicId, {
        resource_type: "video",
      });

      if (resource?.duration) {
        return Math.floor(resource.duration); // seconds
      }
    } catch (error) {
      console.error("Cloudinary metadata error:", error.message);
    }

    // wait 2 seconds before retry
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return 0;
};

/* =========================================================
   ADD COURSE
========================================================= */
export const addCourse = async (req, res) => {
  try {
    /* -------- AUTH CHECK -------- */
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const instructorId = req.user.user_id;
    const { title, description, language, course_type, price } = req.body;

    /* -------- VALIDATION -------- */
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

    // Max 500MB
    if (videoFile.size > 500 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Video size exceeds 500MB limit",
      });
    }

    /* -------- UPLOAD VIDEO -------- */
    const uploadVideo = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "courses/videos",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier
          .createReadStream(videoFile.buffer)
          .on("error", reject)
          .pipe(stream);
      });

    const videoUploadResult = await uploadVideo();

    /* -------- FETCH VIDEO DURATION -------- */
    const videoDurationSeconds = await getVideoDurationWithRetry(
      videoUploadResult.public_id
    );

    /* -------- UPLOAD THUMBNAIL -------- */
    const uploadThumbnail = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "courses/thumbnails",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier
          .createReadStream(thumbnailFile.buffer)
          .on("error", reject)
          .pipe(stream);
      });

    const thumbnailUploadResult = await uploadThumbnail();

    /* -------- INSERT INTO DB -------- */
    const [result] = await db.query(
      `INSERT INTO courses
      (
        instructor_id,
        title,
        description,
        language,
        course_type,
        price,
        thumbnail_url,
        video_url,
        video_duration_hours
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
