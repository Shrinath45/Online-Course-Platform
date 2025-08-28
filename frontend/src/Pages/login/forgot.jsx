import React from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";

const ForgotPassword = () => {
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

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Reset Password
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
