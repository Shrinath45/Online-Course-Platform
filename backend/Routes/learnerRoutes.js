import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Learner Dashboard
router.get("/learner-dashboard", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Learner Dashboard",
    user: req.user,
  });
});

// ✅ Learner Courses
router.get("/learner-courses", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Here are your courses",
    user: req.user,
  });
});

// ✅ My Learning Page
router.get("/my-learning", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Your learning progress",
    user: req.user,
  });
});

export default router;
