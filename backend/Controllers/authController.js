import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

const JWT_SECRET = process.env.JWT_SECRET;

/* ============================================================
   🟩 SIGNUP
============================================================ */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const [existing] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    let profilePhotoUrl = null;

    if (req.file) {
      if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({
          success: false,
          message: "Profile photo must be an image",
        });
      }

      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "user_profiles",
      });

      profilePhotoUrl = cloudResponse.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (name, email, password, role, profile_photo) VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role || "learner", profilePhotoUrl]
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      profilePhoto: profilePhotoUrl,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

/* ============================================================
   🟩 LOGIN
============================================================ */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ✅ Fetch status also
    const [rows] = await db.query(
      `SELECT user_id, name, email, role, password, status,
              profile_photo, phone, city, bio
       FROM users
       WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = rows[0];

    // 🚫 BLOCKED USER CHECK (MOST IMPORTANT)
    if (user.status === "blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked by admin. Please contact support. 'skillforgeplatform@gmail.com'",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        profile_photo: user.profile_photo || null,
        phone: user.phone || null,
        city: user.city || null,
        bio: user.bio || null,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



/* ============================================================
   🟩 FORGOT PASSWORD
============================================================ */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = users[0];

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000);

    await db.query(
      "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE user_id = ?",
      [hashedToken, resetTokenExpires, user.user_id]
    );

    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"SkillForge Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "SkillForge Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>SkillForge Password Reset</h2>
          <p>Hello ${user.name},</p>
          <p>Click below to reset your password:</p>
          <a href="${resetLink}">${resetLink}</a>
        </div>`,
    });

    res.json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   🟩 RESET PASSWORD
============================================================ */
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password)
      return res.status(400).json({ message: "Token and password are required" });

    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const [users] = await db.query(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()",
      [hashedToken]
    );

    if (users.length === 0)
      return res.status(400).json({ message: "Invalid or expired token" });

    const user = users[0];
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE user_id = ?",
      [hashedPassword, user.user_id]
    );

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   🟩 UPDATE PROFILE PHOTO
============================================================ */
export const updateProfilePic = async (req, res) => {
  try {
    const { email, profile_photo } = req.body;

    if (!email || !profile_photo)
      return res.status(400).json({ success: false, message: "Email and photo URL are required" });

    const [result] = await db.query(
      `UPDATE users SET profile_photo = ? WHERE email = ?`,
      [profile_photo, email]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "User not found" });

    return res.json({
      success: true,
      message: "Profile photo updated successfully",
      profile_photo,
    });
  } catch (error) {
    console.error("Error updating profile photo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ============================================================
   🟩 UPDATE PROFILE INFO
============================================================ */
export const updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user_id = decoded.user_id;

    const { name, email, phone, city, bio } = req.body;

    if (!name || !email)
      return res.status(400).json({ success: false, message: "Name and Email are required" });

    await db.query(
      `UPDATE users SET name = ?, email = ?, phone = ?, city = ?, bio = ? WHERE user_id = ?`,
      [name, email, phone || null, city || null, bio || null, user_id]
    );

    const [updatedUser] = await db.query(`SELECT * FROM users WHERE user_id = ?`, [user_id]);

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser[0],
    });
  } catch (error) {
    console.error("Error updating profile info:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ============================================================
   🟩 CHANGE PASSWORD
============================================================ */
export const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword)
      return res.status(400).json({ success: false, message: "Email and password are required" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(`UPDATE users SET password = ? WHERE email = ?`, [
      hashedPassword,
      email,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
