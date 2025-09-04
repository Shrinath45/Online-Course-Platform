import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "ZWeiOttNz3PU9WAgu5wEXIdoGl+YyuvhyEtM1SZOb1hp5RPDwf8+Z03OBeEmqqxAdPYPHm0UL3iCuczFyVQ1GQ==";

// ✅ SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Name, email, and password are required" });
    }

    const [existing] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, role || "learner"]
    );

    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    console.log("👉 Incoming login body:", req.body); // debug

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const [rows] = await db.query(`SELECT name, email, role, password FROM users WHERE email = ?`, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = rows[0];

    // Optional debug: is hash stored?
    if (typeof user.password === "string" && !user.password.startsWith("$2")) {
      console.warn("⚠️ The stored password does not look like a bcrypt hash. Did you seed plaintext?");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//     if (users.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const user = users[0];

//     // generate reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

//     await db.query(
//       "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE user_id = ?",
//       [resetToken, resetTokenExpires, user.id]
//     );

//     // Send email with reset link
//     const resetLink = `http://localhost:5173/reset/${resetToken}`;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset",
//       text: `You requested a password reset. Click here: ${resetLink}`,
//       html: `<p>You requested a password reset</p><a href="${resetLink}">Reset Password</a>`,
//     });

//     res.json({ message: "Password reset email sent" });
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Reset Password
// export const resetPassword = async (req, res) => {
//   try {
//     const { token, password } = req.body;
//     if (!token || !password) {
//       return res.status(400).json({ message: "Token and new password are required" });
//     }

//     const [users] = await db.query(
//       "SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()",
//       [token]
//     );

//     if (users.length === 0) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     const user = users[0];
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.query(
//       "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE user_id = ?",
//       [hashedPassword, user.id]
//     );

//     res.json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Reset password error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    // Generate reset token and hash it
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    await db.query(
      "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE user_id = ?",
      [hashedToken, resetTokenExpires, user.user_id]
    );

    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>You requested a password reset</p><a href="${resetLink}">Reset Password</a>`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // Hash token for comparison
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const [users] = await db.query(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()",
      [hashedToken]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = users[0];
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE user_id = ?",
      [hashedPassword, user.user_id]
    );

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

