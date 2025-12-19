// // import React, { useEffect, useState } from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";
// // import axios from "../../api/axiosInstance";
// // import IHeader from "../iHeader";
// // import toast from "react-hot-toast";

// // const IDashboard = () => {

// //   const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

// //   const [stats, setStats] = useState({
// //     totalCourses: 0,
// //     totalStudents: 0,
// //     totalEarnings: 0,
// //     pendingTasks: 0,
// //     recentCourses: [],
// //     earningsData: [],
// //   });

// //   const token = sessionStorage.getItem("token");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await axios.get("/instructor/dashboard", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         if (res.data.success) setStats(res.data);
// //       } catch (err) {
// //         console.error(err);
// //         toast.error("Failed to fetch dashboard data");
// //       }
// //     };
// //     fetchData();
// //   }, [token]);

// //   return (
// //     <>
// //       <IHeader />

// //       <div className="bg-gray-100 min-h-screen p-6">
// //         {/* Page Title */}
// //         <h1 className="text-3xl font-bold text-[#042439] mb-6">Welcome to <span>Skill<span style={{color:'#4E84C1'}}>Forge</span></span> {user.name}! </h1>

// //         {/* Top Stats Cards */}
// //         <div className="flex flex-wrap gap-10 mb-6">
// //           {[
// //             { label: "Total Courses", value: stats.totalCourses },
// //             { label: "Total Students", value: stats.totalStudents },
// //             {
// //               label: "Total Earnings",
// //               value: `₹${stats.totalEarnings.toLocaleString()}`,
// //             },
// //             { label: "Pending Tasks", value: stats.pendingTasks },
// //           ].map((item, i) => (
// //             <div
// //               key={i}
// //               className="bg-white rounded-xl p-5 shadow-md text-center border"
// //             >
// //               <p className="text-gray-500">{item.label}</p>
// //               <p className="text-2xl font-semibold mt-1">{item.value}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Middle Section */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* Recent Courses */}
// //           <div className="bg-white p-5 rounded-xl shadow-md border">
// //             <div className="flex justify-between items-center mb-3">
// //               <h2 className="text-xl font-semibold text-[#042439]">
// //                 Recent Courses
// //               </h2>

// //               <button className="text-blue-600 font-semibold ">
// //                 View All
// //               </button>
// //             </div>

// //             <hr className="my-2" />

// //             {stats.recentCourses.length === 0 ? (
// //               <p className="text-gray-500">No courses found.</p>
// //             ) : (
// //               stats.recentCourses.map((course, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex justify-between items-center py-3 border-b"
// //                 >
// //                   <p>{course.title}</p>
// //                   <p>{course.students}</p>

// //                   <span
// //                     className={`px-2 py-1 text-sm rounded-lg ${
// //                       course.status === "Active"
// //                         ? "bg-green-100 text-green-600"
// //                         : "bg-gray-100 text-gray-600"
// //                     }`}
// //                   >
// //                     {course.status}
// //                   </span>
// //                 </div>
// //               ))
// //             )}
// //           </div>

// //           {/* Earnings Chart */}
// //           <div className="bg-white p-5 rounded-xl shadow-md border">
// //             <h2 className="text-xl font-semibold text-[#042439] mb-3">
// //               Earnings
// //             </h2>

// //             <div className="w-full h-64">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart data={stats.earningsData}>
// //                   <XAxis dataKey="month" stroke="#555" />
// //                   <YAxis stroke="#555" />
// //                   <Tooltip />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="amount"
// //                     stroke="#1976d2"
// //                     strokeWidth={2}
// //                     dot={{ r: 3, fill: "#1976d2" }}
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default IDashboard;

// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import axios from "../../api/axiosInstance";
// import IHeader from "../Header/iHeader";
// import toast from "react-hot-toast";

// const IDashboard = () => {
//   const user = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
//   const token = sessionStorage.getItem("token");

//   const [stats, setStats] = useState({
//     totalCourses: 0,
//     totalStudents: 0,
//     totalEarnings: 0,
//     pendingTasks: 0,
//     recentCourses: [],
//     earningsData: [],
//   });

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await axios.get("/instructor/totalCourses", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           setStats({
//             ...res.data.data,
//             pendingTasks: 0,
//             earningsData: [],
//           });

//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load dashboard");
//       }
//     };

//     fetchDashboard();
//   }, [token]);

//   return (
//     <>
//       <IHeader />

//       <div className="bg-gray-100 min-h-screen p-6">
//         <h1 className="text-3xl font-bold text-[#042439] mb-6">
//           Welcome to <span>Skill<span className="text-[#4E84C1]">Forge</span></span>,{" "}
//           {user?.name}
//         </h1>

//         {/* STATS */}
//         <div className="flex flex-wrap gap-6 mb-6">
//           {[
//             { label: "Total Courses", value: stats.totalCourses },
//             { label: "Total Students", value: stats.totalStudents },
//             {
//               label: "Total Earnings",
//               value: `₹${stats.totalEarnings.toLocaleString()}`,
//             },
//             { label: "Pending Tasks", value: stats.pendingTasks },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl p-5 shadow-md text-center border w-56"
//             >
//               <p className="text-gray-500">{item.label}</p>
//               <p className="text-2xl font-semibold mt-1">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* CONTENT */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* RECENT COURSES */}
//           <div className="bg-white p-5 rounded-xl shadow-md border">
//             <h2 className="text-xl font-semibold mb-3 text-[#042439]">
//               Recent Courses
//             </h2>

//             {stats.recentCourses.length === 0 ? (
//               <p className="text-gray-500">No courses found</p>
//             ) : (
//               stats.recentCourses.map((course) => (
//                 <div
//                   key={course.course_id}
//                   className="flex justify-between items-center py-3 border-b"
//                 >
//                   <p>{course.title}</p>
//                   <p>{course.students}</p>
//                   <span
//                     className={`px-2 py-1 text-sm rounded-lg ${course.status === "Active"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-gray-100 text-gray-600"
//                       }`}
//                   >
//                     {course.status}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* EARNINGS CHART */}
//           <div className="bg-white p-5 rounded-xl shadow-md border">
//             <h2 className="text-xl font-semibold mb-3 text-[#042439]">
//               Earnings
//             </h2>

//             <div className="w-full h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={stats.earningsData}>
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="amount"
//                     stroke="#1976d2"
//                     strokeWidth={2}
//                     dot={{ r: 3 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default IDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InstructorDashboard = () => {
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEarnings: 0,
    pendingTasks: 0,
    recentCourses: [],
    earningsData: [],
  });

  const fetchDashboardData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        coursesRes,
        studentsRes,
        earningsRes,
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/instructor/totalCourses", { headers }),
        axios.get("http://localhost:5000/api/instructor/totalStudents", { headers }),
        axios.get("http://localhost:5000/api/instructor/totalEarnings", { headers }),
      ]);

      setStats((prev) => ({
        ...prev,
        totalCourses: coursesRes.data.totalCourses || 0,
        totalStudents: studentsRes.data.totalStudents || 0,
        totalEarnings: earningsRes.data.totalEarnings || 0,
      }));
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  return (
    <div className="instructor-dashboard">
      <h2 className="dashboard-title">Instructor Dashboard</h2>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h4>Total Courses</h4>
          <p>{stats.totalCourses}</p>
        </div>

        <div className="stat-card">
          <h4>Total Students</h4>
          <p>{stats.totalStudents}</p>
        </div>

        <div className="stat-card">
          <h4>Total Earnings</h4>
          <p>₹ {stats.totalEarnings}</p>
        </div>

        <div className="stat-card">
          <h4>Pending Tasks</h4>
          <p>{stats.pendingTasks}</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="chart-container">
        <h3>Earnings Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Courses */}
      <div className="recent-courses">
        <h3>Recent Courses</h3>

        {stats.recentCourses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Students</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentCourses.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.title}</td>
                  <td>{course.students}</td>
                  <td>₹ {course.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
