import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ Apply middleware in correct order
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ✅ Debug middleware to log incoming requests
app.use((req, res, next) => {
console.log("📦 Incoming request body:", req.body);
next();
});

// ✅ Base route
app.get("/", (req, res) => {
res.send("Server is running...");
});

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Server running on port ${PORT}"));