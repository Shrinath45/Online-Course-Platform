// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Button,
//   Divider,
//   Chip,
// } from "@mui/material";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import axios from "../api/axiosInstance";
// import IHeader from "./iHeader";
// import toast from "react-hot-toast";

// const IDashboard = () => {
//   const [stats, setStats] = useState({
//     totalCourses: 0,
//     totalStudents: 0,
//     totalEarnings: 0,
//     pendingTasks: 0,
//     recentCourses: [],
//     earningsData: [],
//   });

//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("/instructor/dashboard", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.success) setStats(res.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch dashboard data");
//       }
//     };
//     fetchData();
//   }, [token]);

//   return (
//     <>
//       <IHeader />
//       <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh", p: 4 }}>
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           mb={4}
//           sx={{ color: "#042439" }}
//         >
//           Dashboard
//         </Typography>

//         {/* Top Stats Section */}
//         <Grid container spacing={3} mb={3}>
//           {[
//             { label: "Total Courses", value: stats.totalCourses },
//             { label: "Total Students", value: stats.totalStudents },
//             {
//               label: "Total Earnings",
//               value: `₹${stats.totalEarnings.toLocaleString()}`,
//             },
//             { label: "Pending Tasks", value: stats.pendingTasks },
//           ].map((item, idx) => (
//             <Grid item xs={12} sm={6} md={3} key={idx}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   textAlign: "center",
//                   backgroundColor: "#fff",
//                   boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <Typography variant="body1" color="text.secondary">
//                   {item.label}
//                 </Typography>
//                 <Typography variant="h5" fontWeight="bold" mt={1}>
//                   {item.value}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Middle Section */}
//         <Grid container spacing={3}>
//           {/* Recent Courses */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 backgroundColor: "#fff",
//                 boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <Typography
//                   variant="h6"
//                   fontWeight="bold"
//                   sx={{ color: "#042439" }}
//                 >
//                   Recent Courses
//                 </Typography>
//                 <Button
//                   size="small"
//                   sx={{
//                     color: "#1976d2",
//                     textTransform: "none",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   View All
//                 </Button>
//               </Box>

//               <Divider sx={{ my: 2 }} />

//               {stats.recentCourses.length === 0 ? (
//                 <Typography color="text.secondary">No courses found.</Typography>
//               ) : (
//                 stats.recentCourses.map((course, index) => (
//                   <Box
//                     key={index}
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     py={1}
//                     borderBottom="1px solid #eee"
//                   >
//                     <Typography>{course.title}</Typography>
//                     <Typography>{course.students}</Typography>
//                     <Chip
//                       label={course.status}
//                       size="small"
//                       sx={{
//                         bgcolor:
//                           course.status === "Active"
//                             ? "rgba(76,175,80,0.1)"
//                             : "rgba(0,0,0,0.05)",
//                         color:
//                           course.status === "Active"
//                             ? "#4caf50"
//                             : "text.secondary",
//                       }}
//                     />
//                   </Box>
//                 ))
//               )}
//             </Paper>
//           </Grid>

//           {/* Earnings Graph */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 backgroundColor: "#fff",
//                 boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 fontWeight="bold"
//                 mb={2}
//                 sx={{ color: "#042439" }}
//               >
//                 Earnings
//               </Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={stats.earningsData}>
//                   <XAxis dataKey="month" stroke="#555" />
//                   <YAxis stroke="#555" />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#ffffff",
//                       border: "1px solid #ddd",
//                       color: "#000",
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="amount"
//                     stroke="#1976d2"
//                     strokeWidth={2}
//                     dot={{ r: 3, fill: "#1976d2" }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default IDashboard;

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "../api/axiosInstance";
import IHeader from "./iHeader";
import toast from "react-hot-toast";

const IDashboard = () => {

  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEarnings: 0,
    pendingTasks: 0,
    recentCourses: [],
    earningsData: [],
  });

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/instructor/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setStats(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch dashboard data");
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <IHeader />

      <div className="bg-gray-100 min-h-screen p-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-[#042439] mb-6">Welcome to <span>Skill<span style={{color:'#4E84C1'}}>Forge</span></span> {user.name}! </h1>

        {/* Top Stats Cards */}
        <div className="flex flex-wrap gap-10 mb-6">
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
              className="bg-white rounded-xl p-5 shadow-md text-center border"
            >
              <p className="text-gray-500">{item.label}</p>
              <p className="text-2xl font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Courses */}
          <div className="bg-white p-5 rounded-xl shadow-md border">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-[#042439]">
                Recent Courses
              </h2>

              <button className="text-blue-600 font-semibold ">
                View All
              </button>
            </div>

            <hr className="my-2" />

            {stats.recentCourses.length === 0 ? (
              <p className="text-gray-500">No courses found.</p>
            ) : (
              stats.recentCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b"
                >
                  <p>{course.title}</p>
                  <p>{course.students}</p>

                  <span
                    className={`px-2 py-1 text-sm rounded-lg ${
                      course.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Earnings Chart */}
          <div className="bg-white p-5 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold text-[#042439] mb-3">
              Earnings
            </h2>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.earningsData}>
                  <XAxis dataKey="month" stroke="#555" />
                  <YAxis stroke="#555" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#1976d2"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#1976d2" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IDashboard;
