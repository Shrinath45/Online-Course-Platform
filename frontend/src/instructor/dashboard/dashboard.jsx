import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "../../api/axiosInstance";
import IHeader from "../Header/iHeader";
import toast from "react-hot-toast";

const IDashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
  const token = sessionStorage.getItem("token");

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEarnings: 0,
    pendingTasks: 0,
    recentCourses: [],
    earningsData: [],
  });


  useEffect(() => {
  if (!token) {
    toast.error("Session expired. Please login again.");
    return;
  }

  const fetchDashboard = async () => {
    try {
      const [
        coursesRes,
        studentsRes,
        earningsRes,
        instructorCoursesRes
      ] = await Promise.all([
        axios.get("/instructor/total-courses"),
        axios.get("/instructor/total-students"),
        axios.get("/instructor/total-earnings"),
        axios.get("/instructor/get-courses"),
      ]);

      const allCourses = instructorCoursesRes?.data?.courses || [];

      const recentCourses = Array.isArray(allCourses)
        ? allCourses.slice(-4).reverse()
        : [];

      setStats({
        totalCourses: coursesRes?.data?.totalCourses || 0,
        totalStudents: studentsRes?.data?.totalStudents || 0,
        totalEarnings: earningsRes?.data?.totalEarnings || 0,
        pendingTasks: 0,
        recentCourses,
        earningsData: [],
      });

    } catch (error) {
      console.error("Dashboard Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load dashboard data"
      );
    }
  };

  fetchDashboard();
}, [token]);


  return (
    <>
      <IHeader />

      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-[#042439] mb-6">
          Welcome to{" "}
          <span>
            Skill<span className="text-[#4E84C1]">Forge</span>
          </span>
          , {user?.name || "Instructor"}
        </h1>

        {/* STATS */}
        <div className="flex flex-wrap gap-6 mb-6">
          {[
            { label: "Total Courses", value: stats.totalCourses },
            { label: "Total Students", value: stats.totalStudents },
            {
              label: "Total Earnings",
              value: `₹${stats.totalEarnings.toLocaleString()}`,
            },
            { label: "Pending Tasks", value: stats.pendingTasks },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-md text-center border w-56"
            >
              <p className="text-gray-500">{item.label}</p>
              <p className="text-2xl font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold py-4">Recent Courses</h1>
        <div className="flex gap-6 flex-wrap">
          
          {Array.isArray(stats.recentCourses) && stats.recentCourses.length === 0 ? (
            <p className="text-gray-500">No courses found</p>
          ) : (
            Array.isArray(stats.recentCourses) &&
            stats.recentCourses.map((course, index) => (
              <div
                key={course?.course_id || index}
                className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-gray-800 max-w-sm w-80"
              >
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  {/* Title */}
                  <h2 className="text-white text-xl font-semibold mb-2">
                    {course.title}
                  </h2>

                  {/* Language Tag */}
                  <span className="px-3 py-1 bg-gray-700 text-xs text-gray-200 rounded-lg">
                    {course.language}
                  </span>

                  {/* Live / Batch Tag */}
                  {/* <span className="ml-2 px-3 py-1 bg-red-700 text-xs text-white rounded-lg">
                    {course.live_status}
                </span> */}

                  {/* Description */}
                  {/* <p className="text-gray-400 mt-3 text-sm line-clamp-2">
                    {course.description}
                </p> */}

                  {/* Price Section */}
                  <div className="mt-4">
                    <p className="text-green-400 text-xl font-bold">₹ {course.price}</p>

                    {/* {course.old_price && (
                        <p className="text-gray-500 line-through text-sm">₹ {course.old_price}</p>
                    )} */}
                  </div>

                  {/* View Details Button */}
                  <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-black font-medium py-2 rounded-lg">
                    View Details
                  </button>
                </div>

                {/* Right: Status */}

              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default IDashboard;
