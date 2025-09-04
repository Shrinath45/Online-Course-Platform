import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and user info
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedInUser");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.name || "User"} 👋</h1>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{ marginTop: "20px", fontWeight: "bold" }}
      >
        Logout
      </Button>
    </div>
  );
}

export default AdminDashboard;
