import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });

      setMessage(res.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f4f4f4"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        width="400px"
        p={4}
        bgcolor="white"
        boxShadow={3}
        borderRadius={2}
        textAlign="center"
      >
        <Typography variant="h4" mb={2}>
          Forgot Password
        </Typography>

        <Typography variant="body2" mb={2} color="textSecondary">
          Enter your email to reset your password.
        </Typography>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Reset Password"}
        </Button>

        <Box mt={2}>
          <Link href="/login" underline="hover">
            Back to Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
