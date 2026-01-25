import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { sendMail } from "../utils/sendMail.js";

/* ================= TOTAL COURSES ================= */
export const totalCourses = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const [[{ totalCourses }]] = await db.query(
      `SELECT COUNT(*) AS totalCourses FROM courses`
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

    const [[{ totalStudents }]] = await db.query(
      `SELECT COUNT(*) AS totalStudents FROM users WHERE role='learner'`
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

/* ================= TOTAL INSTRUCTORS ================= */
export const totalInstructors = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const [[{ totalInstructors }]] = await db.query(
      `SELECT COUNT(*) AS totalInstructors FROM users WHERE role='instructor'`
    );

    return res.status(200).json({
      success: true,
      totalInstructors,
    });
  } catch (error) {
    console.error("Total instructors error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get Total Instructors",
    });
  }
};

export const totalUsers = async (req, res) => {
  try {
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const [users] = await db.query(`
      SELECT user_id, name, email, role, status, created_at
      FROM users
      WHERE role != 'admin'
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Total users error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get users",
    });
  }
};

/* ================= BLOCK USER ================= */

export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    // get current status
    const [rows] = await db.query(
      "SELECT status FROM users WHERE user_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newStatus =
      rows[0].status === "blocked" ? "active" : "blocked";

    await db.query(
      "UPDATE users SET status = ? WHERE user_id = ?",
      [newStatus, id]
    );

    return res.status(200).json({
      success: true,
      message:
        newStatus === "blocked"
          ? "User blocked successfully"
          : "User unblocked successfully",
      status: newStatus,
    });
  } catch (error) {
    console.error("TOGGLE USER STATUS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};


export const getAllCourses = async (req, res) => {
  try {
    // ✅ Check if user is authorized
    if (!req.user?.user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // ✅ Fetch courses from DB
    const [courses] = await db.query("SELECT * FROM courses ORDER BY created_at DESC");

    if (!courses || courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No courses found",
        courses: [],
      });
    }

    // ✅ Return courses
    return res.status(200).json({
      success: true,
      message: "Courses found successfully",
      courses, // sending actual course data
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get courses",
    });
  }
};



// export const updateCourseStatus = async (req, res) => {
//   const { courseId } = req.params;
//   const { status } = req.body;

//   try {
//     await db.query(
//       "UPDATE courses SET approval_status = ? WHERE course_id = ?",
//       [status, courseId]
//     );

//     res.json({
//       success: true,
//       message: `Course marked as ${status}`
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// };


export const updateCourseStatus = async (req, res) => {
  const { course_id } = req.params;
  const { status } = req.body; // APPROVED / REJECTED / PENDING

  try {
    // 1️⃣ Update course status in DB
    const [result] = await db.query(
      "UPDATE courses SET approval_status = ? WHERE course_id = ?",
      [status, course_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 2️⃣ Fetch course and instructor email
    const [rows] = await db.query(
      `SELECT c.title, u.email, u.name
       FROM courses c
       JOIN users u ON c.instructor_id = u.user_id
       WHERE c.course_id = ?`,
      [course_id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course or instructor not found",
      });
    }

    const course = rows[0];

    // 3️⃣ Send email only for APPROVED / REJECTED
    if ((status === "APPROVED" || status === "REJECTED") && course.email) {
      const subject =
        status === "APPROVED"
          ? "🎉 Your course has been approved!"
          : "❌ Your course has been rejected";

      const html =
        status === "APPROVED"
          ? `<h2>Congratulations ${course.name} 🎉</h2>
             <p>Your course <b>${course.title}</b> has been approved.</p>
             <p>It is now visible to learners on SkillForge.</p>
             <br/><p>– SkillForge Team</p>`
          : `<h2>Hello ${course.name}</h2>
             <p>Your course <b>${course.title}</b> has been reviewed and rejected.</p>
             <p>You may update and resubmit it for approval.</p>
             <br/><p>– SkillForge Team</p>`;

      // 🔹 Wrap email in try/catch so it doesn't break status update
      try {
        await sendMail({ to: course.email, subject, html });
      } catch (mailErr) {
        console.error("Email failed:", mailErr);
      }
    }

    // 4️⃣ Always return success if DB update worked
    return res.json({
      success: true,
      message: `Course marked as ${status}`,
      status, // send updated status back to frontend
    });
  } catch (err) {
    console.error("Update course status error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update course status",
    });
  }
};



