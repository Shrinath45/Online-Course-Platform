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
      SELECT user_id, name, email, role, created_at
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