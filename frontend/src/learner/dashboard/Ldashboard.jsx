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
import LHeader from "../Header/Lheader";

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
        const user = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");
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

  const { user, stats, activities } = dashboard;

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
              Welcome Back, {user?.name || "Learner"} 👋
            </Typography>
            <Typography variant="h6">
              Keep up the great work — your progress is inspiring! 🚀
            </Typography>
          </Box>
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

      </Box>
    </>
  );
};

export default LearnerDashboard;
