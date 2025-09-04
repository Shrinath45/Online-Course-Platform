import React from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token"); // Use sessionStorage for per-tab login

  if (!token) {
    // If no token, redirect to login
    toast.error("You have to Login first..");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
