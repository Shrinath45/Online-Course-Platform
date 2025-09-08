

// import React, { useRef, useState } from "react";
// import Header from "../../learner/lHeader";
// import {
//     Grid,
//     Box,
//     Avatar,
//     Typography,
//     IconButton,
//     Link,
//     Paper,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     TextField
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import axios from "axios";
// import toast from "react-hot-toast";

// function Profile() {
//     const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
//     const [user, setUser] = useState(storedUser);

//     const [profilePic, setProfilePic] = useState(user?.profile_photo || "");
//     const [openEditProfile, setOpenEditProfile] = useState(false);
//     const [openChangePassword, setOpenChangePassword] = useState(false);

//     const [name, setName] = useState(user?.name || "");
//     const [email, setEmail] = useState(user?.email || "");
//     const [phone, setPhone] = useState(user?.phone || "");
//     const [city, setCity] = useState(user?.city || "");
//     const [bio, setBio] = useState(user?.bio || "");

//     const [nameError, setNameError] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [phoneError, setPhoneError] = useState("");
//     const [cityError, setCityError] = useState("");

//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [confirmPasswordError, setConfirmPasswordError] = useState("");

//     const fileInputRef = useRef();

//     // ✅ Handle profile photo update
//     const handleEditPhoto = () => {
//         fileInputRef.current.click();
//     };

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append("profilePhoto", file);
//         formData.append("email", user.email);

//         try {
//             const response = await axios.put(
//                 "http://localhost:5000/api/auth/update-profile-pic",
//                 formData,
//                 { headers: { "Content-Type": "multipart/form-data" } }
//             );

//             if (response.data.success) {
//                 const imageUrl = response.data.profile_photo;
//                 setProfilePic(imageUrl);

//                 const updatedUser = { ...user, profile_photo: imageUrl };
//                 sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
//                 setUser(updatedUser);

//                 toast.success("Profile photo updated successfully!");
//             } else {
//                 toast.error(response.data.message || "Failed to update profile photo.");
//             }
//         } catch (error) {
//             console.error("Error updating profile photo:", error);
//             toast.error(error.response?.data?.message || "Failed to update profile photo.");
//         }
//     };

//     // ✅ Validate name, email, phone, city
//     const validateProfile = () => {
//         let valid = true;

//         if (!name.trim()) {
//             setNameError("Name is required");
//             valid = false;
//         } else {
//             setNameError("");
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email.trim()) {
//             setEmailError("Email is required");
//             valid = false;
//         } else if (!emailRegex.test(email)) {
//             setEmailError("Invalid email format");
//             valid = false;
//         } else {
//             setEmailError("");
//         }

//         const phoneRegex = /^[0-9]{10}$/; // adjust for your country
//         if (phone && !phoneRegex.test(phone)) {
//             setPhoneError("Enter valid 10-digit number");
//             valid = false;
//         } else {
//             setPhoneError("");
//         }

//         if (!city.trim()) {
//             setCityError("City is required");
//             valid = false;
//         } else {
//             setCityError("");
//         }

//         return valid;
//     };

//     const handleProfileUpdate = async () => {
//         if (!validateProfile()) return;

//         try {
//             const response = await axios.put(
//                 "http://localhost:5000/api/auth/update-profile",
//                 { name, email, phone, city, bio },
//                 { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
//             );

//             if (response.data.success) {
//                 const updatedUser = { ...user, name, email, phone, city, bio };
//                 sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
//                 setUser(updatedUser);

//                 setOpenEditProfile(false);
//                 toast.success("Profile updated successfully!");
//             } else {
//                 toast.error(response.data.message || "Failed to update profile.");
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to update profile.");
//         }
//     };

//     // ✅ Validate passwords
//     const validatePassword = () => {
//         let valid = true;

//         if (!newPassword) {
//             setPasswordError("Password is required");
//             valid = false;
//         } else if (newPassword.length < 6) {
//             setPasswordError("Password must be at least 6 characters");
//             valid = false;
//         } else {
//             setPasswordError("");
//         }

//         if (!confirmPassword) {
//             setConfirmPasswordError("Please confirm your password");
//             valid = false;
//         } else if (confirmPassword !== newPassword) {
//             setConfirmPasswordError("Passwords do not match");
//             valid = false;
//         } else {
//             setConfirmPasswordError("");
//         }

//         return valid;
//     };

//     const handlePasswordChange = async () => {
//         if (!validatePassword()) return;

//         try {
//             const response = await axios.put("http://localhost:5000/api/auth/change-password", {
//                 email: user.email,
//                 newPassword
//             });

//             if (response.data.success) {
//                 setOpenChangePassword(false);
//                 setNewPassword("");
//                 setConfirmPassword("");
//                 toast.success("Password changed successfully!");
//             } else {
//                 toast.error(response.data.message || "Failed to change password.");
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to change password.");
//         }
//     };

//     return (
//         <>
//             <Header />
//             <Box sx={{ p: 4 }}>
//                 <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
//                     <Grid container spacing={4} alignItems="center">
//                         {/* LEFT SIDE - Profile Picture */}
//                         <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
//                             <Avatar
//                                 alt="Profile"
//                                 src={profilePic || '/default-avatar.png'}
//                                 sx={{ width: 280, height: 280 }}
//                             />

//                             <IconButton
//                                 color="primary"
//                                 onClick={handleEditPhoto}
//                                 sx={{
//                                     position: "absolute",
//                                     bottom: 10,
//                                     right: "calc(50% - 90px)",
//                                     backgroundColor: "white",
//                                     boxShadow: 2,
//                                     "&:hover": { backgroundColor: "#f0f0f0" },
//                                 }}
//                             >
//                                 <EditIcon />
//                             </IconButton>
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 ref={fileInputRef}
//                                 style={{ display: "none" }}
//                                 onChange={handleFileChange}
//                             />
//                         </Grid>

//                         {/* RIGHT SIDE - User Details */}
//                         <Grid item xs={12} sm={8}>
//                             <Typography variant="h5" fontWeight="bold">
//                                 {name}
//                             </Typography>
//                             <Typography variant="body1" color="text.secondary">
//                                 {email}
//                             </Typography>
//                             <Typography variant="body2" sx={{ mt: 2 }}>
//                                  {phone || "No phone added"}
//                             </Typography>
//                             <Typography variant="body2">
//                                 {city || "No city added"}
//                             </Typography>
//                             <Typography variant="body2" sx={{ mt: 2 }}>
//                                 {bio || "No bio added yet"}
//                             </Typography>

//                             <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
//                                 <Link underline="hover" variant="body1" onClick={() => setOpenEditProfile(true)}>
//                                     Edit Profile
//                                 </Link>
//                                 <Link underline="hover" variant="body1" onClick={() => setOpenChangePassword(true)}>
//                                     Change Password
//                                 </Link>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </Paper>
//             </Box>

//             {/* Edit Profile Dialog */}
//             <Dialog open={openEditProfile} onClose={() => setOpenEditProfile(false)}>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//                     <TextField
//                         label="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         error={!!nameError}
//                         helperText={nameError}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         error={!!emailError}
//                         helperText={emailError}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Phone Number"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         error={!!phoneError}
//                         helperText={phoneError}
//                         fullWidth
//                     />
//                     <TextField
//                         label="City"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         error={!!cityError}
//                         helperText={cityError}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Bio"
//                         multiline
//                         rows={3}
//                         value={bio}
//                         onChange={(e) => setBio(e.target.value)}
//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenEditProfile(false)}>Cancel</Button>
//                     <Button
//                         variant="contained"
//                         onClick={handleProfileUpdate}
//                         disabled={!name || !email || !!nameError || !!emailError}
//                     >
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Change Password Dialog */}
//             <Dialog open={openChangePassword} onClose={() => setOpenChangePassword(false)}>
//                 <DialogTitle>Change Password</DialogTitle>
//                 <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
//                     <TextField
//                         label="New Password"
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         error={!!passwordError}
//                         helperText={passwordError}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Confirm New Password"
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         error={!!confirmPasswordError}
//                         helperText={confirmPasswordError}
//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenChangePassword(false)}>Cancel</Button>
//                     <Button
//                         variant="contained"
//                         onClick={handlePasswordChange}
//                         disabled={!newPassword || !confirmPassword || !!passwordError || !!confirmPasswordError}
//                     >
//                         Update
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// }

// export default Profile;

import React, { useRef, useState } from "react";
import Header from "../../learner/lHeader";
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

function Profile() {
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
                const updatedUser = { ...user, name, email, phone, city, bio };
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
            <Header />
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


export default Profile;
