// import db from "../config/db.js";
// import cloudinary from "../config/cloudinary.js";
// import streamifier from "streamifier";
// import { sendMail } from "../utils/sendMail.js";


// export const getAllCourses = async (req, res) => {
//     try {
//         if(!req.user?.user_id){
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized User"
//             });
//         }

//         const [courses] = await db.query("SELECT c.course_id, c.instructor_id, c.title, c.thumbnail_url, c.video_url, c.video_duration_hours, c.description, c.price, c.created_at, c.language, c.approval_status, u.name AS instructor_name FROM courses c join users u ON c.instructor_id = u.user_id ORDER BY created_at DESC");

//         if (!courses || courses.length === 0) {
//       return res.status(200).json({
//         success: true,
//         message: "No courses found",
//         courses: [],
//       });
//     }

//     // ✅ Return courses
//     return res.status(200).json({
//       success: true,
//       message: "Courses found successfully",
//       courses, // sending actual course data
//     });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to get courses"
//         });
//     }
// };

// export const enrollCourse = async (req, res) => {
//   const userId = req.user.user_id; // ✅ from JWT
//   const { courseId } = req.body;

//   try {
//     // ✅ Check if already enrolled
//     const [existing] = await db.query(
//       "SELECT * FROM enrollments WHERE user_id=? AND course_id=?",
//       [userId, courseId]
//     );

//     if (existing.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: "You already enrolled this course"
//       });
//     }

//     // ✅ Check course type
//     const [course] = await db.query(
//       "SELECT course_type FROM courses WHERE course_id=?",
//       [courseId]
//     );

//     if (course.length === 0) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     let paymentStatus = "UNPAID";

//     if (course[0].course_type === "FREE") {
//       paymentStatus = "PAID";
//     }

//     await db.query(
//       "INSERT INTO enrollments(user_id, course_id, payment_status) VALUES (?, ?, ?)",
//       [userId, courseId, paymentStatus]
//     );

//     res.json({ success: true, paymentStatus });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Enroll failed" });
//   }
// };




// export const checkAccess = async (req, res) => {
//   try {
//     const userId = req.user.user_id; // ✅ from JWT
//     const { courseId } = req.body;

//     const [result] = await db.query(
//       "SELECT * FROM enrollments WHERE user_id=? AND course_id=?",
//       [userId, courseId]
//     );

//     if (result.length > 0) {
//       return res.json({ enrolled: true });
//     } else {
//       return res.json({ enrolled: false });
//     }

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Check enroll failed" });
//   }
// };


import db from "../config/db.js";

export const getAllCourses = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const [courses] = await db.query(`
      SELECT c.course_id, c.instructor_id, c.title, c.thumbnail_url, 
      c.video_url, c.video_duration_hours, c.description, c.price, 
      c.created_at, c.language, c.course_type, u.name AS instructor_name 
      FROM courses c 
      JOIN users u ON c.instructor_id = u.user_id 
      ORDER BY c.created_at DESC
    `);

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get courses" });
  }
};


// ✅ ENROLL COURSE
export const enrollCourse = async (req, res) => {
  try {
    const userId = req.user.user_id; // ✅ from JWT
    const { courseId } = req.body;

    // ✅ Check if already enrolled
    const [existing] = await db.query(
      "SELECT * FROM enrollments WHERE user_id=? AND course_id=?",
      [userId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You already enrolled this course",
      });
    }

    // ✅ Check course type
    const [course] = await db.query(
      "SELECT course_type FROM courses WHERE course_id=?",
      [courseId]
    );

    if (course.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    let paymentStatus = "UNPAID";

    if (course[0].course_type === "FREE") {
      paymentStatus = "PAID";
    }

    await db.query(
      "INSERT INTO enrollments(user_id, course_id, payment_status) VALUES (?, ?, ?)",
      [userId, courseId, paymentStatus]
    );

    return res.json({
      success: true,
      paymentStatus,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Enroll failed" });
  }
};


// ✅ CHECK ACCESS (ENROLLED OR NOT)
export const checkAccess = async (req, res) => {
  try {
    const userId = req.user.user_id; // ✅ from JWT
    const { courseId } = req.body;

    const [result] = await db.query(
      "SELECT * FROM enrollments WHERE user_id=? AND course_id=?",
      [userId, courseId]
    );

    if (result.length > 0) {
      return res.json({ enrolled: true });
    } else {
      return res.json({ enrolled: false });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Check failed" });
  }
};
