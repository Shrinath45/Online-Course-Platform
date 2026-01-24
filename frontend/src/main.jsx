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
import InstructorDashboard from "./instructor/dashboard/dashboard.jsx";
import LearnerDashboard from "./learner/dashboard.jsx";
import ResetPassword from "./Pages/login/reset.jsx";
import LearnerCourses from "./learner/courses.jsx";
import MyLearning from "./learner/mylearning.jsx";
import ProtectedRoute from "./ProtecteedRoutes.jsx";
import Profile from "./Pages/profile/profile.jsx";
import ICourses from "./instructor/Courses/myCourses.jsx";
import IProfile from "./instructor/profile/iProfile.jsx";
import IEarning from "./instructor/profile/iEarning.jsx";
import AddCourse from "./instructor/Courses/AddCourse.jsx";
import Adashboard from "./admin/dashboard/Adashboard.jsx";
import Aheader from "./admin/Header/Aheader.jsx";
import Aprofile from "./admin/profile/Aprofile.jsx";
import Users from "./admin/Users/Users.jsx";
import Acourses from "./admin/Courses/Acourses.jsx";


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
      <Route path="/admin-dashboard" element={<ProtectedRoute><Adashboard /></ProtectedRoute>} />
      <Route path="/admin-header" element={<ProtectedRoute><Aheader /></ProtectedRoute>} />
      <Route path="/admin-profile" element={<ProtectedRoute><Aprofile /></ProtectedRoute>} />
      <Route path="/admin-users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/admin-courses" element={<ProtectedRoute><Acourses /></ProtectedRoute>} />
      <Route path="/instructor-dashboard" element={<ProtectedRoute><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/instructor-courses" element={<ProtectedRoute><ICourses /></ProtectedRoute>} />
      <Route path="/instructor-profile" element={<ProtectedRoute><IProfile /></ProtectedRoute>} />
      <Route path="/learner-dashboard" element={<ProtectedRoute><LearnerDashboard /></ProtectedRoute>} />
      <Route path="/learner-courses" element={<ProtectedRoute><LearnerCourses /></ProtectedRoute>} />
      <Route path="/instructor-earning" element={<ProtectedRoute><IEarning /></ProtectedRoute>} />
      <Route path="/my-learning" element={<ProtectedRoute><MyLearning /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/add-course" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />

      {/* Catch-all route */}''
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
