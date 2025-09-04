import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./lHeader";

function LearnerDashboard() {
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
    <>
    <Header />
    </>
  );
}

export default LearnerDashboard;
