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
//     if (!token) {
//       toast.error("Session expired. Please login again.");
//       return;
//     }

//     const fetchDashboard = async () => {
//       try {
//         const [coursesRes, studentsRes, earningsRes] = await Promise.all([
//           axios.get("/instructor/total-courses"),
//           axios.get("/instructor/total-students"),
//           axios.get("/instructor/total-earnings"),
//         ]);

//          setStats({
//           totalCourses: coursesRes?.data?.totalCourses || 0,
//           totalStudents: studentsRes?.data?.totalStudents || 0,
//           totalEarnings: earningsRes?.data?.totalEarnings || 0,
//           pendingTasks: 0,
//           recentCourses: coursesRes?.data?.recentCourses || [],
//           earningsData: earningsRes?.data?.earningsData || [],
//         });
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load dashboard data");
//       }
//     };

//       fetchDashboard();
//     }, [token]);


//     return (
//       <>
//         <IHeader />

//         <div className="bg-gray-100 min-h-screen p-6">
//           <h1 className="text-3xl font-bold text-[#042439] mb-6">
//             Welcome to <span>Skill<span className="text-[#4E84C1]">Forge</span></span>,{" "}
//             {user?.name}
//           </h1>

//           {/* STATS */}
//           <div className="flex flex-wrap gap-6 mb-6">
//             {[
//               { label: "Total Courses", value: stats.totalCourses },
//               { label: "Total Students", value: stats.totalStudents },
//               {
//                 label: "Total Earnings",
//                 value: `₹${(stats.totalEarnings || 0).toLocaleString()}`,
//               },
//               { label: "Pending Tasks", value: stats.pendingTasks },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-xl p-5 shadow-md text-center border w-56"
//               >
//                 <p className="text-gray-500">{item.label}</p>
//                 <p className="text-2xl font-semibold mt-1">{item.value}</p>
//               </div>
//             ))}
//           </div>

//           {/* CONTENT */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* RECENT COURSES */}
//             <div className="bg-white p-5 rounded-xl shadow-md border">
//               <h2 className="text-xl font-semibold mb-3 text-[#042439]">
//                 Recent Courses
//               </h2>

//               {stats.recentCourses.length === 0 ? (
//                 <p className="text-gray-500">No courses found</p>
//               ) : (
//                 stats.recentCourses.map((course, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center py-3 border-b"
//                   >
//                     <p>{course.title}</p>
//                     <p>{course.students}</p>
//                     <span
//                       className={`px-2 py-1 text-sm rounded-lg ${course.status === "Active"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-gray-100 text-gray-600"
//                         }`}
//                     >
//                       {course.status}
//                     </span>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* EARNINGS CHART */}
//             <div className="bg-white p-5 rounded-xl shadow-md border">
//               <h2 className="text-xl font-semibold mb-3 text-[#042439]">
//                 Earnings
//               </h2>

//               {stats.earningsData.length > 0 ? (
//                 <ResponsiveContainer width="100%" aspect={3}>
//                   <LineChart data={stats.earningsData}>
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="amount"
//                       stroke="#1976d2"
//                       strokeWidth={2}
//                       dot={{ r: 3 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <p className="text-gray-500 text-center mt-10">
//                   No earnings data available
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   export default IDashboard;


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
        const [coursesRes, studentsRes, earningsRes] = await Promise.all([
          axios.get("/instructor/total-courses"),
          axios.get("/instructor/total-students"),
          axios.get("/instructor/total-earnings"),
        ]);

        setStats({
          totalCourses: coursesRes?.data?.totalCourses || 0,
          totalStudents: studentsRes?.data?.totalStudents || 0,
          totalEarnings: earningsRes?.data?.totalEarnings || 0,
          pendingTasks: 0,
          recentCourses: [], // backend not implemented yet
          earningsData: [], // backend not implemented yet
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

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RECENT COURSES */}
          <div className="bg-white p-5 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-[#042439]">
              Recent Courses
            </h2>

            {stats.recentCourses.length === 0 ? (
              <p className="text-gray-500">No courses found</p>
            ) : (
              stats.recentCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b"
                >
                  <p>{course?.title}</p>
                  <p>{course?.students || 0}</p>
                  <span className="px-2 py-1 text-sm rounded-lg bg-green-100 text-green-600">
                    Active
                  </span>
                </div>
              ))
            )}
          </div>

          {/* EARNINGS CHART */}
          <div className="bg-white p-5 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-[#042439]">
              Earnings
            </h2>

            {stats.earningsData.length > 0 ? (
              <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={stats.earningsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                No earnings data available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IDashboard;
