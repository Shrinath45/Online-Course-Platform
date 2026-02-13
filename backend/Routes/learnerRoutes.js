import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkAccess, enrollCourse, getAllCourses, myLearning } from "../controllers/learnerController.js";

const LearnerRoutes = express.Router();

// ✅ Learner Dashboard

LearnerRoutes.get("/learner-courses", verifyToken, getAllCourses);
LearnerRoutes.post("/enroll", verifyToken, enrollCourse);
LearnerRoutes.post("/check-access", verifyToken, checkAccess);
LearnerRoutes.get("/mylearning", verifyToken, myLearning)


export default LearnerRoutes;
