// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   LinearProgress,
//   Avatar,
//   Paper,
// } from "@mui/material";
// import SchoolIcon from "@mui/icons-material/School";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import { useNavigate } from "react-router-dom";
// import LHeader from "./lHeader";
// import axios from "axios";

// function LearnerDashboard() {
//   const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
//   const navigate = useNavigate();

//   const [courses, setCourses] = useState([]);
//   const [stats, setStats] = useState({
//     total: 0,
//     inProgress: 0,
//     completed: 0,
//     certificates: 0,
//   });

//   // 🚀 Fetch enrolled courses
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/learner/courses", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) {
//           setCourses(res.data.courses);

//           // ✅ Calculate stats
//           const total = res.data.courses.length;
//           const completed = res.data.courses.filter((c) => c.progress === 100).length;
//           const inProgress = total - completed;
//           const certificates = completed;

//           setStats({ total, inProgress, completed, certificates });
//         }
//       } catch (error) {
//         console.error("Failed to fetch learner courses", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("loggedInUser");
//     navigate("/login");
//   };

//   return (
//     <>
//       <LHeader />
//       <Box sx={{ p: 4 }}>
//         {/* Welcome Section */}
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Welcome back, {user?.name || "Learner"} 👋
//         </Typography>
//         <Typography variant="body1" color="text.secondary" gutterBottom>
//           Here’s your learning progress at a glance
//         </Typography>

//         {/* Stats Section */}
//         <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ bgcolor: "#e3f2fd", borderRadius: 3 }}>
//               <CardContent>
//                 <SchoolIcon fontSize="large" color="primary" />
//                 <Typography variant="h6">Enrolled</Typography>
//                 <Typography variant="h4">{stats.total}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ bgcolor: "#fff3e0", borderRadius: 3 }}>
//               <CardContent>
//                 <PlayCircleOutlineIcon fontSize="large" color="warning" />
//                 <Typography variant="h6">In Progress</Typography>
//                 <Typography variant="h4">{stats.inProgress}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ bgcolor: "#e8f5e9", borderRadius: 3 }}>
//               <CardContent>
//                 <CheckCircleIcon fontSize="large" color="success" />
//                 <Typography variant="h6">Completed</Typography>
//                 <Typography variant="h4">{stats.completed}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ bgcolor: "#f3e5f5", borderRadius: 3 }}>
//               <CardContent>
//                 <AssessmentIcon fontSize="large" color="secondary" />
//                 <Typography variant="h6">Certificates</Typography>
//                 <Typography variant="h4">{stats.certificates}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Enrolled Courses */}
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Your Courses
//         </Typography>
//         {courses.length === 0 ? (
//           <Typography color="text.secondary">No courses enrolled yet.</Typography>
//         ) : (
//           <Grid container spacing={3}>
//             {courses.map((course, index) => (
//               <Grid item xs={12} md={6} key={index}>
//                 <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//                   <CardContent>
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                       <Avatar
//                         variant="rounded"
//                         src={course.thumbnail || "/course-default.png"}
//                         sx={{ width: 64, height: 64, mr: 2 }}
//                       />
//                       <Box>
//                         <Typography variant="h6">{course.title}</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {course.instructor || "Unknown Instructor"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Progress Bar */}
//                     <Box sx={{ mb: 1 }}>
//                       <LinearProgress
//                         variant="determinate"
//                         value={course.progress}
//                         sx={{ height: 10, borderRadius: 5 }}
//                       />
//                     </Box>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                       {course.progress}% completed
//                     </Typography>

//                     <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       href={`/courses/${course.course_id}`}
//                     >
//                       Continue
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}

//         {/* CTA Section */}
//         <Paper
//           elevation={3}
//           sx={{
//             mt: 5,
//             p: 4,
//             borderRadius: 3,
//             textAlign: "center",
//             background: "linear-gradient(135deg, #1976d2, #64b5f6)",
//             color: "white",
//           }}
//         >
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Ready to learn something new?
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             Browse our catalog and start your next journey today.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ bgcolor: "white", color: "#1976d2", fontWeight: "bold" }}
//             href="/courses"
//           >
//             Explore Courses
//           </Button>
//         </Paper>

//         {/* Logout Button */}
//         <Box sx={{ textAlign: "center", mt: 4 }}>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default LearnerDashboard;

// import React from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   LinearProgress,
//   Button,
//   CardActions,
//   Avatar,
//   Paper,
// } from "@mui/material";
// import SchoolIcon from "@mui/icons-material/School";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
// import LHeader from "./lHeader";

// function LearnerDashboard() {
//   // Mock Data (replace with API later)
//   const enrolledCourses = [
//     {
//       id: 1,
//       title: "React for Beginners",
//       instructor: "John Doe",
//       progress: 65,
//     },
//     {
//       id: 2,
//       title: "Mastering SQL",
//       instructor: "Jane Smith",
//       progress: 40,
//     },
//   ];

//   const certificates = [
//     {
//       id: 1,
//       title: "JavaScript Fundamentals",
//       issuedOn: "Aug 2025",
//     },
//     {
//       id: 2,
//       title: "Database Basics",
//       issuedOn: "Sep 2025",
//     },
//   ];

//   return (
//     <>
//       <LHeader />
//       <Box sx={{ p: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//         {/* Welcome Section */}
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             mb: 4,
//             borderRadius: 3,
//             background: "linear-gradient(135deg, #1e3c72, #2a5298)",
//             color: "white",
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold">
//             Welcome Back, Learner!
//           </Typography>
//           <Typography variant="body1" sx={{ mt: 1 }}>
//             Continue your learning journey. 🚀
//           </Typography>
//         </Paper>

//         {/* Enrolled Courses Section */}
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           <SchoolIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//           Enrolled Courses
//         </Typography>
//         <Grid container spacing={3} sx={{ mb: 5 }}>
//           {enrolledCourses.map((course) => (
//             <Grid item xs={12} sm={6} md={4} key={course.id}>
//               <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold">
//                     {course.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     Instructor: {course.instructor}
//                   </Typography>
//                   <LinearProgress
//                     variant="determinate"
//                     value={course.progress}
//                     sx={{ height: 8, borderRadius: 5, mt: 2 }}
//                   />
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     Progress: {course.progress}%
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     size="small"
//                     variant="contained"
//                     startIcon={<PlayCircleFilledIcon />}
//                     sx={{
//                       background: "linear-gradient(135deg, #1e3c72, #2a5298)",
//                       color: "white",
//                       "&:hover": { background: "#1e3c72" },
//                     }}
//                   >
//                     Resume
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Certificates Section */}
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           <WorkspacePremiumIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//           Certificates
//         </Typography>
//         <Grid container spacing={3}>
//           {certificates.map((cert) => (
//             <Grid item xs={12} sm={6} md={4} key={cert.id}>
//               <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
//                 <CardContent>
//                   <Avatar
//                     sx={{
//                       bgcolor: "gold",
//                       width: 60,
//                       height: 60,
//                       mx: "auto",
//                       mb: 2,
//                     }}
//                   >
//                     <WorkspacePremiumIcon fontSize="large" />
//                   </Avatar>
//                   <Typography variant="h6" fontWeight="bold">
//                     {cert.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Issued on: {cert.issuedOn}
//                   </Typography>
//                 </CardContent>
//                 <CardActions sx={{ justifyContent: "center" }}>
//                   <Button
//                     size="small"
//                     variant="outlined"
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Download
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </>
//   );
// }

// export default LearnerDashboard;

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  CardActions,
  Avatar,
  Paper,
} from "@mui/material";
import {
  School as SchoolIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  PlayCircleFilled as PlayCircleFilledIcon,
  NotificationsActive as NotificationsActiveIcon,
  Recommend as RecommendIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import LHeader from "./lHeader";

function LearnerDashboard() {
  // Mock Data
  const enrolledCourses = [
    { id: 1, title: "React for Beginners", instructor: "John Doe", progress: 65 },
    { id: 2, title: "Mastering SQL", instructor: "Jane Smith", progress: 40 },
  ];

  const certificates = [
    { id: 1, title: "JavaScript Fundamentals", issuedOn: new Date("2025-08-10") },
    { id: 2, title: "Database Basics", issuedOn: new Date("2025-09-01") },
  ];

  const activities = [
    { id: 1, activity: "Completed Lesson 3 in React for Beginners", date: "Sep 5, 2025" },
    { id: 2, activity: "Attempted SQL Quiz", date: "Sep 4, 2025" },
    { id: 3, activity: "Earned Certificate in JavaScript Fundamentals", date: "Aug 10, 2025" },
  ];

  const recommendations = [
    { id: 1, title: "Node.js Essentials" },
    { id: 2, title: "Advanced MongoDB" },
  ];

  return (
    <>
      <LHeader />
      <Box sx={{ p: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        {/* Welcome Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #1e3c72, #2a5298)",
            color: "white",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Welcome Back, Learner!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Continue your learning journey. 🚀
          </Typography>
        </Paper>

        {/* Stats Overview */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, textAlign: "center", borderRadius: 3 }}>
              <BarChartIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6">2 Courses</Typography>
              <Typography variant="body2" color="text.secondary">
                Enrolled
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, textAlign: "center", borderRadius: 3 }}>
              <WorkspacePremiumIcon color="warning" sx={{ fontSize: 40 }} />
              <Typography variant="h6">2 Certificates</Typography>
              <Typography variant="body2" color="text.secondary">
                Earned
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, textAlign: "center", borderRadius: 3 }}>
              <SchoolIcon color="success" sx={{ fontSize: 40 }} />
              <Typography variant="h6">15 Hours</Typography>
              <Typography variant="body2" color="text.secondary">
                Learned
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Enrolled Courses */}
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 5, mb: 2 }}>
          <SchoolIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Enrolled Courses
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {enrolledCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Instructor: {course.instructor}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                    sx={{ height: 8, borderRadius: 5, mt: 2 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Progress: {course.progress}%
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<PlayCircleFilledIcon />}
                    sx={{
                      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                      color: "white",
                      "&:hover": { background: "#1e3c72" },
                    }}
                  >
                    Resume
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Certificates */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          <WorkspacePremiumIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Certificates
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {certificates.map((cert) => (
            <Grid item xs={12} sm={6} md={4} key={cert.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: "gold",
                      width: 60,
                      height: 60,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <WorkspacePremiumIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {cert.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Issued on:{" "}
                    {cert.issuedOn.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity Timeline */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          <NotificationsActiveIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Recent Activity
        </Typography>
        <Timeline position="alternate" sx={{ mb: 5 }}>
          {activities.map((act, index) => (
            <TimelineItem key={act.id}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index < activities.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Card sx={{ borderRadius: 3, p: 2, width: "100%" }}>
                  <Typography variant="body1">{act.activity}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {act.date}
                  </Typography>
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        {/* Recommendations */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          <RecommendIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Recommended for You
        </Typography>
        <Grid container spacing={3}>
          {recommendations.map((rec) => (
            <Grid item xs={12} sm={6} md={4} key={rec.id}>
              <Card sx={{ borderRadius: 3, p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {rec.title}
                </Typography>
                <Button variant="contained" size="small" sx={{ mt: 2 }}>
                  Explore
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default LearnerDashboard;
