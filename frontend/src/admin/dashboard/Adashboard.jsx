import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Aheader from "../Header/Aheader";
import axios from "../../api/axiosInstance";

const Adashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
  const token = sessionStorage.getItem("token");

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalInstructors: 0,
  });

  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Please login again.");
      return;
    }

    const fetchDashboard = async () => {
      try {
        // ✅ AUTH HEADER
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [coursesRes, studentsRes, instructorsRes] =
          await Promise.all([
            axios.get("/admin/total-Acourses", config),
            axios.get("/admin/total-Astudents", config),
            axios.get("/admin/total-Ainstructors", config),
          ]);

        setStats({
          totalCourses: coursesRes.data.totalCourses,
          totalStudents: studentsRes.data.totalStudents,
          totalInstructors: instructorsRes.data.totalInstructors,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
        toast.error(
          error?.response?.data?.message ||
            "Failed to load dashboard data"
        );
      }
    };

    fetchDashboard();
  }, [token]);

  return (
    <>
      <Aheader />

      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-[#042439] mb-6">
          Welcome to{" "}
          <span>
            Skill<span className="text-[#4E84C1]">Forge</span>
          </span>
          , {user?.name || "Admin"}
        </h1>

        {/* STATS */}
        <div className="flex flex-wrap gap-6 mb-6">
          {[
            { label: "Total Courses", value: stats.totalCourses },
            { label: "Total Students", value: stats.totalStudents },
            { label: "Total Instructors", value: stats.totalInstructors },
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
      </div>
    </>
  );
};

export default Adashboard;
