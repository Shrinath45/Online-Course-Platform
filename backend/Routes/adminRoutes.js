import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  totalStudents,
  totalCourses,
  totalInstructors,
  totalUsers,
  toggleUserStatus,
  getAllCourses,
  updateCourseStatus
} from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.get("/total-Acourses", verifyToken, totalCourses);
adminRoutes.get("/total-Astudents", verifyToken, totalStudents);
adminRoutes.get("/total-Ainstructors", verifyToken, totalInstructors);
adminRoutes.get("/total-Ausers", verifyToken, totalUsers);
adminRoutes.put("/toggle-user-status/:id", verifyToken ,toggleUserStatus);
adminRoutes.get("/Acourses", verifyToken, getAllCourses);
adminRoutes.put("/course-status/:course_id", verifyToken,updateCourseStatus);

export default adminRoutes;
