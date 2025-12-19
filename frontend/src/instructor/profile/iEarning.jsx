import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Divider,
} from "@mui/material";
import IHeader from "../Header/iHeader";
import axios from "axios";
import toast from "react-hot-toast";

function IEarning() {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEarning, setTotalEarning] = useState(0);

  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/instructor/earnings/${user.user_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setEarnings(response.data.transactions || []);
          setTotalEarning(response.data.totalEarning || 0);
        } else {
          toast.error(response.data.message || "Failed to fetch earnings");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching earnings");
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [user.user_id]);

  return (
    <>
      <IHeader />
      <Box sx={{ p: 4 }}>
        {/* Total Earnings Section */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            maxWidth: 1000,
            mx: "auto",
            borderRadius: 3,
            background: "linear-gradient(135deg, #fdfdfd, #f4faff)",
            mb: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#042439" sx={{ mb: 2 }}>
            Instructor Earnings Overview
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Total Earnings
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="#2e7d32">
                  ₹ {totalEarning.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>

        {/* Transactions Table */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            maxWidth: 1000,
            mx: "auto",
            borderRadius: 3,
            background: "linear-gradient(135deg, #ffffff, #f9fbff)",
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="#042439" sx={{ mb: 2 }}>
            Transaction History
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {loading ? (
            <Box sx={{ textAlign: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : earnings.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
              No transactions found yet.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#042439" }}>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Course</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Students</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Amount (₹)</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Date</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {earnings.map((txn, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{txn.course_name}</TableCell>
                      <TableCell>{txn.students_enrolled}</TableCell>
                      <TableCell>₹ {txn.amount}</TableCell>
                      <TableCell>
                        {new Date(txn.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: txn.status === "Completed" ? "green" : "orange",
                          fontWeight: "bold",
                        }}
                      >
                        {txn.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </>
  );
}

export default IEarning;
