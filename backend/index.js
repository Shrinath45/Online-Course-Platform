import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import learnerRoutes from "./routes/learnerRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Request logger (DEBUG)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Health route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/learner", learnerRoutes);
app.use("/api/instructor", instructorRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
