import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import axios from "../../api/axiosInstance";
import ViewCourse from "./ViewCourse";
import toast from "react-hot-toast";

const CourseDialog = ({ open, onClose, course }) => {

  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // ✅ JWT token

  // ✅ Check enrollment when dialog opens
  useEffect(() => {
    if (course) {
      checkEnrollment();
    }
  }, [course]);

  const checkEnrollment = async () => {
    try {
      const res = await axios.post(
        "/learner/check-access",
        { courseId: course.course_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEnrolled(res.data.enrolled);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Enroll Course
  const handleEnroll = async () => {
    if (!course || enrolled) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "/learner/enroll",
        { courseId: course.course_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setEnrolled(true);

        if (res.data.paymentStatus === "PAID") {
          toast.success("✅ Course Enrolled Successfully");
        } else {
          toast("💳 Payment Required");
        }
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Enroll failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

      <DialogTitle>Course Details</DialogTitle>

      <DialogContent dividers>
        {!course ? (
          <p>Loading course...</p>
        ) : (
          <ViewCourse course={course} />
        )}
      </DialogContent>

      <DialogActions className="flex justify-between px-6">

        <div className="flex gap-3">

          {/* ✅ ENROLL BUTTON */}
          <Button
            variant="contained"
            color={enrolled ? "success" : "primary"}
            onClick={handleEnroll}
            disabled={loading || enrolled}
          >
            {enrolled ? "Enrolled ✅" : loading ? "Enrolling..." : "Enroll"}
          </Button>

          <Button variant="contained" color="primary">
            Save
          </Button>

        </div>

        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default CourseDialog;
