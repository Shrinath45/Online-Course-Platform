import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import db from "../config/db.js";

const router = express.Router();

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const instructorId = req.user.user_id;

    const [[courseCount]] = await db.query(
      "SELECT COUNT(*) AS totalCourses FROM courses WHERE instructor_id = ?",
      [instructorId]
    );

    const [[studentCount]] = await db.query(
      `SELECT COUNT(DISTINCT e.student_id) AS totalStudents 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.course_id 
       WHERE c.instructor_id = ?`,
      [instructorId]
    );

    const [[totalEarnings]] = await db.query(
      `SELECT IFNULL(SUM(p.amount), 0) AS totalEarnings 
       FROM payments p 
       JOIN courses c ON p.course_id = c.course_id 
       WHERE c.instructor_id = ?`,
      [instructorId]
    );

    const [recentCourses] = await db.query(
      `SELECT title, status, (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.course_id) AS students
       FROM courses c
       WHERE instructor_id = ?
       ORDER BY c.created_at DESC
       LIMIT 3`,
      [instructorId]
    );

    const [earningsData] = await db.query(
      `SELECT MONTHNAME(payment_date) AS month, SUM(amount) AS amount
       FROM payments p
       JOIN courses c ON p.course_id = c.course_id
       WHERE c.instructor_id = ?
       GROUP BY MONTH(payment_date)
       ORDER BY MONTH(payment_date)`,
      [instructorId]
    );

    res.json({
      success: true,
      totalCourses: courseCount.totalCourses,
      totalStudents: studentCount.totalStudents,
      totalEarnings: totalEarnings.totalEarnings,
      pendingTasks: 8,
      recentCourses,
      earningsData,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
