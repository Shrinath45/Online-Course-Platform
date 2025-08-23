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

// Define router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      {/* Default (index) route for "/" */}
      <Route index element={<Landing />} />

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
