import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { styled } from "@mui/system";
import axios from "axios";
import toast from "react-hot-toast";

// ✅ Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// ✅ Styled Components
const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
  padding: "10px",
});

const StyledPaper = styled(Paper)({
  padding: "30px",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  axios.defaults.withCredentials = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // ✅ Handle Login API
//   const onSubmit = async (user) => {
//   setErrorMessage("");
//   setLoading(true);

//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/auth/login",
//       user,
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     if (res.data?.success && res.data?.token) {
//       const { token, user: loggedInUser } = res.data;

//       // ✅ Save JWT and user info in sessionStorage
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

//       // ✅ Set default header for future axios requests
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       // ✅ Show personalized toast message with name
//       toast.success(`Welcome back, ${loggedInUser.name}! 👋`);

//       // ✅ Redirect based on role
//       if (loggedInUser.role === "learner") {
//         navigate("/learner-dashboard");
//       } else if (loggedInUser.role === "instructor") {
//         navigate("/instructor-dashboard");
//       } else if (loggedInUser.role === "admin") {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/");
//       }
//     } else {
//       setErrorMessage(res.data?.message || "Invalid email or password");
//     }
//   } catch (error) {
//     setErrorMessage(error?.response?.data?.message || "Server error. Try again.");
//   } finally {
//     setLoading(false);
//   }
// };

const onSubmit = async (user) => {
  setErrorMessage("");
  setLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      user,
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.data?.success && res.data?.token) {
      const { token, user: loggedInUser } = res.data;

      // Save JWT and user info
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Redirect based on role
      if (loggedInUser.role === "learner") {
        navigate("/learner-dashboard");
      } else if (loggedInUser.role === "instructor") {
        navigate("/instructor-dashboard");
      } else if (loggedInUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

      // Optional toast
      toast.success(`Welcome back, ${loggedInUser.name}! 👋`);

    } else {
      setErrorMessage(res.data?.message || "Invalid email or password");
    }

  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    // ✅ Handle Blocked User
    if (status === 403 && message?.includes("blocked")) {
      navigate("/account-blocked"); // redirect to blocked page
    } else {
      setErrorMessage(message || "Server error. Try again.");
    }

  } finally {
    setLoading(false);
  }
};



  return (
    <Container>
      <StyledPaper elevation={10}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Please login to continue
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
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

          {/* Forgot Password */}
          <Typography
            variant="body2"
            align="right"
            sx={{ mt: 1, cursor: "pointer", color: "#1e3c72", fontWeight: "bold" }}
            onClick={() => navigate("/forgot")}
          >
            Forgot Password?
          </Typography>

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              "&:hover": { background: "#1e3c72" },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "LOGIN"}
          </Button>
        </form>

        {/* Signup Link */}
        <Typography variant="body2" mt={2}>
          Don&apos;t have an account?{" "}
          <span
            style={{ color: "#1e3c72", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </Typography>
      </StyledPaper>
    </Container>
  );
};

export default Login;
