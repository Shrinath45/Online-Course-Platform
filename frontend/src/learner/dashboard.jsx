
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
// import {
//   School as SchoolIcon,
//   WorkspacePremium as WorkspacePremiumIcon,
//   PlayCircleFilled as PlayCircleFilledIcon,
//   NotificationsActive as NotificationsActiveIcon,
//   Recommend as RecommendIcon,
//   BarChart as BarChartIcon,
// } from "@mui/icons-material";
// import {
//   Timeline,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineConnector,
//   TimelineContent,
//   TimelineDot,
// } from "@mui/lab";
// import LHeader from "./lHeader";

// function LearnerDashboard() {
//   // Mock Data
//   const enrolledCourses = [
//     { id: 1, title: "React for Beginners", instructor: "John Doe", progress: 65 },
//     { id: 2, title: "Mastering SQL", instructor: "Jane Smith", progress: 40 },
//   ];

//   const certificates = [
//     { id: 1, title: "JavaScript Fundamentals", issuedOn: new Date("2025-08-10") },
//     { id: 2, title: "Database Basics", issuedOn: new Date("2025-09-01") },
//   ];

//   const activities = [
//     { id: 1, activity: "Completed Lesson 3 in React for Beginners", date: "Sep 5, 2025" },
//     { id: 2, activity: "Attempted SQL Quiz", date: "Sep 4, 2025" },
//     { id: 3, activity: "Earned Certificate in JavaScript Fundamentals", date: "Aug 10, 2025" },
//   ];

//   const recommendations = [
//     { id: 1, title: "Node.js Essentials" },
//     { id: 2, title: "Advanced MongoDB" },
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

//         {/* Stats Overview */}
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={3}>
//             <Card sx={{ p: 2, textAlign: "center", borderRadius: 3 }}>
//               <BarChartIcon color="primary" sx={{ fontSize: 40 }} />
//               <Typography variant="h6">2 Courses</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Enrolled
//               </Typography>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <Card sx={{ p: 2, textAlign: "center", borderRadius: 3 }}>
//               <WorkspacePremiumIcon color="warning" sx={{ fontSize: 40 }} />
//               <Typography variant="h6">2 Certificates</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Earned
//               </Typography>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <Card sx={{ p: 2, textAlign: "center", borderRadius: 3 }}>
//               <SchoolIcon color="success" sx={{ fontSize: 40 }} />
//               <Typography variant="h6">15 Hours</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Learned
//               </Typography>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Enrolled Courses */}
//         <Typography variant="h5" fontWeight="bold" sx={{ mt: 5, mb: 2 }}>
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

//         {/* Certificates */}
//         <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
//           <WorkspacePremiumIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//           Certificates
//         </Typography>
//         <Grid container spacing={3} sx={{ mb: 5 }}>
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
//                     Issued on:{" "}
//                     {cert.issuedOn.toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </Typography>
//                 </CardContent>
//                 <CardActions sx={{ justifyContent: "center" }}>
//                   <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>
//                     Download
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Recent Activity Timeline */}
//         <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
//           <NotificationsActiveIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//           Recent Activity
//         </Typography>
//         <Timeline position="alternate" sx={{ mb: 5 }}>
//           {activities.map((act, index) => (
//             <TimelineItem key={act.id}>
//               <TimelineSeparator>
//                 <TimelineDot color="primary" />
//                 {index < activities.length - 1 && <TimelineConnector />}
//               </TimelineSeparator>
//               <TimelineContent>
//                 <Card sx={{ borderRadius: 3, p: 2, width: "100%" }}>
//                   <Typography variant="body1">{act.activity}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {act.date}
//                   </Typography>
//                 </Card>
//               </TimelineContent>
//             </TimelineItem>
//           ))}
//         </Timeline>

//         {/* Recommendations */}
//         <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
//           <RecommendIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//           Recommended for You
//         </Typography>
//         <Grid container spacing={3}>
//           {recommendations.map((rec) => (
//             <Grid item xs={12} sm={6} md={4} key={rec.id}>
//               <Card sx={{ borderRadius: 3, p: 2 }}>
//                 <Typography variant="h6" fontWeight="bold">
//                   {rec.title}
//                 </Typography>
//                 <Button variant="contained" size="small" sx={{ mt: 2 }}>
//                   Explore
//                 </Button>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </>
//   );
// }

// export default LearnerDashboard;

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  School as SchoolIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  BarChart as BarChartIcon,
  NotificationsActive as NotificationsActiveIcon,
  Recommend as RecommendIcon,
} from "@mui/icons-material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import axios from "axios";
import LHeader from "./lHeader";

const LearnerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState({
    user: {},
    stats: {},
    activities: [],
    recommendations: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/learner/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setDashboard(res.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const { user, stats, activities, recommendations } = dashboard;

  return (
    <>
      <LHeader />
      <Box sx={{ p: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        {/* Welcome Section */}
        <Paper
          elevation={4}
          sx={{
            p: 6,
            mb: 5,
            borderRadius: 4,
            background: "linear-gradient(135deg, #1e3c72, #2a5298)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Welcome Back, {user.name || "Learner"} 👋
            </Typography>
            <Typography variant="h6">
              Keep up the great work — your progress is inspiring! 🚀
            </Typography>
          </Box>
          <Avatar
            src={user.profile_pic || "/default-avatar.png"}
            sx={{
              width: 120,
              height: 120,
              border: "3px solid white",
              boxShadow: 3,
            }}
          />
        </Paper>

        {/* Stats Overview */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, textAlign: "center", borderRadius: 4, boxShadow: 4 }}>
              <BarChartIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
              <Typography variant="h5">{stats.enrolled || 0} Courses</Typography>
              <Typography variant="body1" color="text.secondary">
                Enrolled
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, textAlign: "center", borderRadius: 4, boxShadow: 4 }}>
              <WorkspacePremiumIcon color="warning" sx={{ fontSize: 50, mb: 1 }} />
              <Typography variant="h5">{stats.certificates || 0} Certificates</Typography>
              <Typography variant="body1" color="text.secondary">
                Earned
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, textAlign: "center", borderRadius: 4, boxShadow: 4 }}>
              <SchoolIcon color="success" sx={{ fontSize: 50, mb: 1 }} />
              <Typography variant="h5">{stats.hours || 0} Hours</Typography>
              <Typography variant="body1" color="text.secondary">
                Spent Learning
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          <NotificationsActiveIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Recent Activity
        </Typography>
        {activities.length === 0 ? (
          <Typography color="text.secondary">No recent activities.</Typography>
        ) : (
          <Timeline position="alternate" sx={{ mb: 6 }}>
            {activities.map((act, i) => (
              <TimelineItem key={act.id}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {i < activities.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Card sx={{ p: 2, borderRadius: 3 }}>
                    <Typography variant="body1">{act.activity}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {act.date}
                    </Typography>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}

        {/* Recommendations */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          <RecommendIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Recommended for You
        </Typography>
        <Grid container spacing={3}>
          {recommendations.length === 0 ? (
            <Typography color="text.secondary">No recommendations found.</Typography>
          ) : (
            recommendations.map((rec) => (
              <Grid item xs={12} sm={6} md={4} key={rec.id}>
                <Card sx={{ borderRadius: 3, p: 3, boxShadow: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {rec.title}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                      "&:hover": { background: "#1e3c72" },
                    }}
                  >
                    Explore
                  </Button>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default LearnerDashboard;
