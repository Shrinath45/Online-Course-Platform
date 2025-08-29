import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./Pages/Home/Landing/Landing.jsx";
import Courses from "./Pages/Home/Courses/Courses.jsx";
import Contact from "./Pages/Home/Contact/Contact.jsx";
import About from "./Pages/Home/About/About.jsx"
import Signup from "./Pages/login/signup.jsx";
import Login from "./Pages/login/signin.jsx";
import ForgotPassword from "./Pages/login/forgot.jsx";
import AdminDashboard from "./admin/dashboard.jsx";
import InstructorDashboard from "./instructor/dashboard.jsx";
import LearnerDashboard from "./learner/dashboard.jsx";
import ResetPassword from "./Pages/login/reset.jsx";

// Define router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      {/* Default (index) route for "/" */}
      <Route index element={<Landing />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
      <Route path="/learner-dashboard" element={<LearnerDashboard />} />

      {/* Catch-all route */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
