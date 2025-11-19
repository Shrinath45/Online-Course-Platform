import db from "../config/db.js";

/**
 * GET /api/instructor/dashboard
 * returns totals: totalCourses, totalStudents, totalEarnings, topCourses (by revenue or enrollments)
 */
export const getDashboardData = async (req, res) => {
  try {
    const instructorId = req.user.user_id;

    // total courses
    const [coursesCountRows] = await db.query(
      `SELECT COUNT(*) AS totalCourses FROM courses WHERE instructor_id = ?`,
      [instructorId]
    );

    // total students (unique)
    const [studentsRows] = await db.query(
      `SELECT COUNT(DISTINCT student_id) AS totalStudents
       FROM enrollments e
       JOIN courses c ON e.course_id = c.course_id
       WHERE c.instructor_id = ?`,
      [instructorId]
    );

    // total earnings
    const [earningsRows] = await db.query(
      `SELECT COALESCE(SUM(amount),0) AS totalEarnings
       FROM transactions
       WHERE instructor_id = ? AND status = 'Completed'`,
      [instructorId]
    );

    // top 5 courses by revenue
    const [topCourses] = await db.query(
      `SELECT c.course_id, c.course_name, c.thumbnail,
              COUNT(e.id) AS students_enrolled,
              COALESCE(SUM(t.amount),0) AS revenue
       FROM courses c
       LEFT JOIN enrollments e ON c.course_id = e.course_id
       LEFT JOIN transactions t ON t.course_id = c.course_id AND t.instructor_id = c.instructor_id AND t.status='Completed'
       WHERE c.instructor_id = ?
       GROUP BY c.course_id
       ORDER BY revenue DESC
       LIMIT 5`,
      [instructorId]
    );

    res.json({
      success: true,
      data: {
        totalCourses: coursesCountRows[0]?.totalCourses || 0,
        totalStudents: studentsRows[0]?.totalStudents || 0,
        totalEarnings: parseFloat(earningsRows[0]?.totalEarnings || 0),
        topCourses,
      },
    });
  } catch (error) {
    console.error("Error fetch dashboard:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * GET /api/instructor/earnings
 * returns transactions list and totalEarning
 */
export const getEarningsTransactions = async (req, res) => {
  try {
    const instructorId = req.user.user_id;

    const [transactions] = await db.query(
      `SELECT t.txn_id, t.course_id, c.course_name, t.student_id, t.amount, t.date, t.status
       FROM transactions t
       LEFT JOIN courses c ON t.course_id = c.course_id
       WHERE t.instructor_id = ?
       ORDER BY t.date DESC
       LIMIT 200`,
      [instructorId]
    );

    const totalEarning = transactions.reduce((acc, tx) => acc + (tx.amount ? Number(tx.amount) : 0), 0);

    res.json({ success: true, transactions, totalEarning });
  } catch (error) {
    console.error("Error fetch earnings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * GET /api/instructor/courses
 */
export const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.user_id;

    const [courses] = await db.query(
      `SELECT c.course_id, c.course_name, c.thumbnail, c.price, c.status,
              (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.course_id) as students_enrolled
       FROM courses c
       WHERE c.instructor_id = ?
       ORDER BY c.created_at DESC`,
      [instructorId]
    );

    res.json({ success: true, courses });
  } catch (error) {
    console.error("Error fetch instructor courses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
