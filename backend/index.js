import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import learnerRoutes from "./Routes/learnerRoutes.js";
import instructorRoutes from "./Routes/instructorRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS (allow your Vite dev origin)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Health route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/learner", learnerRoutes);
app.use("/api/instructor", instructorRoutes);

// ✅ Global error handler (helps debug)
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
