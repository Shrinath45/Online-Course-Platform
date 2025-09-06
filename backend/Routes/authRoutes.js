import express from "express";
import multer from "multer";
import { signup, login, forgotPassword, resetPassword, updateProfile, changePassword } from "../controllers/authController.js";
import { updateProfilePic } from "../controllers/authController.js";
import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// ✅ Configure multer for memory storage (required for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Apply multer to signup route
router.post("/signup", upload.single("profilePhoto"), signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/update-profile", updateProfile);
router.put("/change-password", changePassword);
router.put("/update-profile-pic", upload.single("profilePhoto"), async (req, res) => {
    try {
        const { email } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // ✅ Upload to Cloudinary using Promise wrapper
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "profile_photos" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });
        };

        const result = await uploadToCloudinary();
        const profile_photo = result.secure_url;

        // ✅ Update DB
        const [dbResult] = await db.query(
            `UPDATE users SET profile_photo = ? WHERE email = ?`,
            [profile_photo, email]
        );

        if (dbResult.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({
            success: true,
            message: "Profile photo updated successfully",
            profile_photo,
        });
    } catch (error) {
        console.error("Error updating profile photo:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});






export default router;
