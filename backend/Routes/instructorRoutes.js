import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";
import {
  addCourse,
  totalCourses,
  totalEarnings,
  totalStudents,
} from "../Controllers/instructorController.js";

const instructorRoutes = express.Router();

instructorRoutes.get(
  "/totalCourses",
  verifyToken,
  totalCourses
);
instructorRoutes.get(
  "/totalStudents",
  verifyToken,
  totalStudents
);
instructorRoutes.get(
  "/totalEarnings",
  verifyToken,
  totalEarnings
);

/* ---------------- ADD COURSE ---------------- */
instructorRoutes.post(
  "/add-course",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addCourse
);


export default instructorRoutes;
