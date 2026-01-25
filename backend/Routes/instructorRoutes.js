import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";

import {
  addCourse,
  getInstructorCourses,
  totalCourses,
  totalEarnings,
  totalStudents,
  deleteCourse,
  pendingCoursesCount,
} from "../controllers/instructorController.js";

const instructorRoutes = express.Router();

/* -------- DASHBOARD STATS -------- */
instructorRoutes.get("/total-courses", verifyToken, totalCourses);
instructorRoutes.get("/total-students", verifyToken, totalStudents);
instructorRoutes.get("/total-earnings", verifyToken, totalEarnings);
instructorRoutes.get("/total-pending", verifyToken, pendingCoursesCount);

/* -------- ADD COURSE -------- */
instructorRoutes.post(
  "/add-course",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addCourse
);

instructorRoutes.get("/get-courses", verifyToken, getInstructorCourses);
instructorRoutes.delete("/delete-course/:course_id", verifyToken ,deleteCourse);


export default instructorRoutes;
