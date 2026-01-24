import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  totalStudents,
  totalCourses,
  totalInstructors,
  totalUsers
} from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.get("/total-Acourses", verifyToken, totalCourses);
adminRoutes.get("/total-Astudents", verifyToken, totalStudents);
adminRoutes.get("/total-Ainstructors", verifyToken, totalInstructors);
adminRoutes.get("/total-Ausers", verifyToken, totalUsers);

export default adminRoutes;
