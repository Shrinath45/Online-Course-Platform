import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    TextField,
    Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import toast from "react-hot-toast";
import IHeader from "../Header/iHeader";

function IProfile() {
    const navigate = useNavigate();
    const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const [user, setUser] = useState(storedUser);

    const [profilePic, setProfilePic] = useState(user?.profile_photo || "");
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [city, setCity] = useState(user?.city || "");
    const [bio, setBio] = useState(user?.bio || "");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const fileInputRef = useRef();

    // ✅ Trigger file input for photo change
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
            toast.error(error.response?.data?.message || "Failed to update profile photo.");
        }
    };

    // ✅ Validate and update profile info
    const handleProfileUpdate = async () => {
    if (!name || !email) {
        toast.error("Name and Email are required");
        return;
    }

    try {
        const response = await axios.put(
            "http://localhost:5000/api/auth/update-profile",
            { name, email, phone, city, bio },
            { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
        );

        if (response.data.success) {
            const updatedUser = response.data.user; // ✅ get updated user from backend

            // ✅ Update local state & sessionStorage
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


    // ✅ Validate and update password
    const handlePasswordChange = async () => {
        if (!newPassword) {
            setPasswordError("Password is required");
            return;
        } else if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        } else {
            setPasswordError("");
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your password");
            return;
        } else if (confirmPassword !== newPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        } else {
            setConfirmPasswordError("");
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
            <IHeader />
            <Box sx={{ p: 4 }}>
                <Paper
                    elevation={4}
                    sx={{
                        p: 4,
                        maxWidth: 1000,
                        mx: "auto",
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
                    }}
                >
                    <Grid container spacing={4} alignItems="center">
                        {/* LEFT SIDE - Profile Picture */}
                        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
                            <Avatar
                                alt="Profile"
                                src={profilePic || "/default-avatar.png"}
                                sx={{ width: 220, height: 220, boxShadow: 3 }}
                            />
                            <IconButton
                                color="primary"
                                onClick={handleEditPhoto}
                                sx={{
                                    position: "absolute",
                                    bottom: 10,
                                    width: "50px",
                                    marginLeft: "80px",
                                    backgroundColor: "white",
                                    boxShadow: 5,
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
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                                {name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {email}
                            </Typography>

                            {/* Contact Info */}
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <PhoneIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="body1">
                                    {phone || "No phone added"}
                                </Typography>
                                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                                <LocationOnIcon color="error" sx={{ mr: 1 }} />
                                <Typography variant="body1">
                                    {city || "No city added"}
                                </Typography>
                            </Box>

                            {/* Bio */}
                            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                                <InfoIcon color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2" fontStyle="italic">
                                    {bio || "No bio added yet"}
                                </Typography>
                            </Box>

                            {/* Links */}
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt: 3 }}>
                                <Link underline="hover" variant="body1" onClick={() => setOpenEditProfile(true)} sx={{ cursor: "pointer" }}>
                                    Edit Profile
                                </Link>
                                <Link underline="hover" variant="body1" onClick={() => setOpenChangePassword(true)} sx={{ cursor: "pointer" }}>
                                    Change Password
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

<Box sx={{ p: 4, pt: 0 }}>
  <Paper
    elevation={4}
    sx={{
      p: 4,
      maxWidth: 1000,
      mx: "auto",
      borderRadius: 3,
      background: "linear-gradient(135deg, #fdfdfd, #f4faff)",
    }}
  >
    <Typography variant="h5" fontWeight="bold" color="#042439" sx={{ mb: 3 }}>
      💰 Instructor Earnings
    </Typography>

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Earnings Info */}
      <Box>
        <Typography variant="body1" color="text.secondary">
          Total Earnings
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="#2e7d32">
          ₹ {user?.total_earning || 0}
        </Typography>
      </Box>

      {/* View Details Button */}
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          backgroundColor: "#042439",
          "&:hover": { backgroundColor: "#063456" },
          mt: { xs: 5, sm: 2 },
        }}
        onClick={() => navigate("/instructor-earning")}
      >
        View Details
      </Button>
    </Box>
  </Paper>
</Box>



            {/* Edit Profile Dialog */}
            <Dialog open={openEditProfile} onClose={() => setOpenEditProfile(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditProfile(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleProfileUpdate}>
                        Save
                    </Button>
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
                        error={!!passwordError}
                        helperText={passwordError}
                        fullWidth
                    />
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenChangePassword(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handlePasswordChange}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


export default IProfile;
