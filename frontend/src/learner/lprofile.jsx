import React, { useRef, useState } from "react";
import Header from "./lHeader";
import {
    Grid,
    Box,
    Avatar,
    Typography,
    IconButton,
    Link,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
    const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const [user, setUser] = useState(storedUser);

    const [profilePic, setProfilePic] = useState(user?.profile_photo || "");
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    const [user_id, setUserId] = useState(user?.user_id || "");
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fileInputRef = useRef();

    // ✅ Handle profile photo update
    const handleEditPhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePhoto", file);
        formData.append("email", user.email);

        try {
            const response = await axios.put(
                "http://localhost:5000/api/auth/update-profile-pic",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.data.success) {
                const imageUrl = response.data.profile_photo;

                setProfilePic(imageUrl);

                const updatedUser = { ...user, profile_photo: imageUrl };
                sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
                setUser(updatedUser);

                toast.success("Profile photo updated successfully!");
            } else {
                toast.error(response.data.message || "Failed to update profile photo.");
            }
        } catch (error) {
            console.error("Error updating profile photo:", error);
            toast.error(error.response?.data?.message || "Failed to update profile photo.");
        }
    };

    const handleProfileUpdate = async () => {
        if (!name.trim() || !email.trim()) {
            toast.error("Name and Email are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
            return;
        }

        try {
            const response = await axios.put(
                "http://localhost:5000/api/auth/update-profile",
                { name, email },
                { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
            );


            if (response.data.success) {
                const updatedUser = { ...user, name, email };
                sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
                setUser(updatedUser);

                setOpenEditProfile(false);
                toast.success("Profile updated successfully!");
            } else {
                toast.error(response.data.message || "Failed to update profile.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        }
    };


    // ✅ Handle password change
    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {

            const response = await axios.put("http://localhost:5000/api/auth/change-password", {
                email: user.email,
                newPassword
            });


            if (response.data.success) {
                setOpenChangePassword(false);
                setNewPassword("");
                setConfirmPassword("");
                toast.success("Password changed successfully!");
            } else {
                toast.error(response.data.message || "Failed to change password.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password.");
        }
    };


    return (
        <>
            <Header />
            <Box sx={{ p: 4 }}>
                <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
                    <Grid container spacing={4} alignItems="center">
                        {/* LEFT SIDE - Profile Picture */}
                        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
                            <Avatar
                                alt="Profile"
                                src={profilePic || '/default-avatar.png'}
                                sx={{ width: 280, height: 280 }}
                            />

                            <IconButton
                                color="primary"
                                onClick={handleEditPhoto}
                                sx={{
                                    position: "absolute",
                                    bottom: 10,
                                    right: "calc(50% - 90px)",
                                    backgroundColor: "white",
                                    boxShadow: 2,
                                    "&:hover": { backgroundColor: "#f0f0f0" },
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </Grid>

                        {/* RIGHT SIDE - User Details */}
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h5" fontWeight="bold">
                                {name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {email}
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Link underline="hover" variant="body1" onClick={() => setOpenEditProfile(true)}>
                                    Edit Profile
                                </Link>
                                <Link underline="hover" variant="body1" onClick={() => setOpenChangePassword(true)}>
                                    Change Password
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            {/* Edit Profile Dialog */}
            <Dialog open={openEditProfile} onClose={() => setOpenEditProfile(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditProfile(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleProfileUpdate}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Change Password Dialog */}
            <Dialog open={openChangePassword} onClose={() => setOpenChangePassword(false)}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenChangePassword(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handlePasswordChange}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Profile;
