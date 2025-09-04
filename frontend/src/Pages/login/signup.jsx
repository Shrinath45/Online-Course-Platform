// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   IconButton,
//   InputAdornment,
//   Box,
//   Alert,
//   MenuItem,
// } from "@mui/material";
// import {
//   Visibility,
//   VisibilityOff,
//   Person,
//   Email,
//   Phone,
//   Lock,
//   AssignmentInd,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import axios from "axios";

// const Container = styled(Box)({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100vh",
//   background: "linear-gradient(135deg, #1e3c72, #2a5298)",
//   padding: "20px",
// });

// const StyledPaper = styled(Paper)({
//   padding: "30px",
//   width: "100%",
//   maxWidth: "450px",
//   textAlign: "center",
//   background: "#fff",
//   borderRadius: "10px",
//   boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
// });

// const Signup = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [serverError, setServerError] = useState("");

//   // ✅ Validation Schema
//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .min(3, "Name must be at least 3 characters")
//       .max(20, "Name is too long")
//       .required("Name is required"),
//     email: Yup.string().email("Invalid email address").required("Email is required"),
//     role: Yup.string().required("Role is required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .matches(/[A-Z]/, "Must include at least one uppercase letter")
//       .matches(/\d/, "Must include at least one number")
//       .matches(/[@$!%*?&]/, "Must include at least one special character")
//       .required("Password is required"),
//   });

//   // ✅ Formik Setup
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       role: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       setServerError("");

//       try {
//         // ✅ Send data to backend API
//         const response = await axios.post("http://localhost:5000/api/auth/signup", values, {
//           headers: { "Content-Type": "application/json" }
//         });
//         alert("User Registered Successfully");
//         navigate("/login");
//       } catch (error) {
//         setServerError(error.response?.data?.message || "Something went wrong!");
//       }
//     },
//   });

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return (
//     <Container>
//       <StyledPaper elevation={10}>
//         <Person style={{ fontSize: 50, color: "#1e3c72", marginBottom: 10 }} />
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Create Your Account
//         </Typography>
//         <Typography variant="body2" color="textSecondary" mb={2}>
//           Sign up to get started
//         </Typography>

//         {serverError && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {serverError}
//           </Alert>
//         )}

//         <form onSubmit={formik.handleSubmit}>
//           {/* Full Name */}
//           <TextField
//             fullWidth
//             label="Full Name"
//             variant="outlined"
//             name="name"
//             {...formik.getFieldProps("name")}
//             margin="normal"
//             error={formik.touched.name && Boolean(formik.errors.name)}
//             helperText={formik.touched.name && formik.errors.name}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Person />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Email */}
//           <TextField
//             fullWidth
//             label="Email"
//             variant="outlined"
//             name="email"
//             {...formik.getFieldProps("email")}
//             margin="normal"
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Email />
//                 </InputAdornment>
//               ),
//             }}
//           />


//           {/* Role Selection */}
//           <TextField
//             select
//             fullWidth
//             label="Select Role"
//             variant="outlined"
//             name="role"
//             {...formik.getFieldProps("role")}
//             margin="normal"
//             error={formik.touched.role && Boolean(formik.errors.role)}
//             helperText={formik.touched.role && formik.errors.role}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AssignmentInd />
//                 </InputAdornment>
//               ),
//             }}
//           >
//             <MenuItem value="learner">Learner</MenuItem>
//             <MenuItem value="instructor">Instructor</MenuItem>
//           </TextField>

//           {/* Password */}
//           <TextField
//             fullWidth
//             label="Password"
//             variant="outlined"
//             type={showPassword ? "text" : "password"}
//             name="password"
//             {...formik.getFieldProps("password")}
//             margin="normal"
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Lock />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleTogglePassword} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{
//               mt: 2,
//               py: 1.5,
//               fontWeight: "bold",
//               background: "linear-gradient(135deg, #1e3c72, #2a5298)",
//               "&:hover": { background: "#1e3c72" },
//             }}
//           >
//             SIGN UP
//           </Button>
//         </form>

//         <Typography variant="body2" mt={2}>
//           Already have an account?{" "}
//           <span
//             style={{ color: "#1e3c72", cursor: "pointer" }}
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </Typography>
//       </StyledPaper>
//     </Container>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  Alert,
  MenuItem,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  AssignmentInd,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import API from "../../api"; // ✅ Centralized API with interceptors
import toast from "react-hot-toast";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
  padding: "20px",
});

const StyledPaper = styled(Paper)({
  padding: "30px",
  width: "100%",
  maxWidth: "450px",
  textAlign: "center",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
});

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name is too long")
      .required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must include at least one uppercase letter")
      .matches(/\d/, "Must include at least one number")
      .matches(/[@$!%*?&]/, "Must include at least one special character")
      .required("Password is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setServerError("");
      setLoading(true);

      try {
        const response = await API.post("/auth/signup", values);

        if (response.data?.success) {
          toast.success("Registration successful! Please log in.");
          navigate("/login");
        } else {
          setServerError(response.data?.message || "Something went wrong!");
        }
      } catch (error) {
        setServerError(error.response?.data?.message || "Server error. Try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container>
      <StyledPaper elevation={10}>
        <Person style={{ fontSize: 50, color: "#1e3c72", marginBottom: 10 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Create Your Account
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Sign up to get started
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            name="name"
            {...formik.getFieldProps("name")}
            margin="normal"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            {...formik.getFieldProps("email")}
            margin="normal"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          {/* Role Selection */}
          <TextField
            select
            fullWidth
            label="Select Role"
            variant="outlined"
            name="role"
            {...formik.getFieldProps("role")}
            margin="normal"
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentInd />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="learner">Learner</MenuItem>
            <MenuItem value="instructor">Instructor</MenuItem>
          </TextField>

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            {...formik.getFieldProps("password")}
            margin="normal"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              "&:hover": { background: "#1e3c72" },
            }}
          >
            {loading ? "Signing Up..." : "SIGN UP"}
          </Button>
        </form>

        <Typography variant="body2" mt={2}>
          Already have an account?{" "}
          <span
            style={{ color: "#1e3c72", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default Signup;
