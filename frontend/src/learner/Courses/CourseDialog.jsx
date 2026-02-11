import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import ViewCourse from "./ViewCourse";

const CourseDialog = ({ open, onClose, course, onApprove, onReject }) => {

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

      <DialogTitle>
        Course Details
      </DialogTitle>

      <DialogContent dividers>
        {!course ? (
          <p className="text-gray-500">Loading course...</p>
        ) : (
          <ViewCourse course={course} />
        )}
      </DialogContent>

      <DialogActions className="flex justify-between px-6">
        {/* APPROVE / REJECT */}
        {course?.approval_status === "PENDING" && (
          <div className="flex gap-3">
            <Button
              variant="contained"
              color="success"
              onClick={onApprove}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={onReject}
            >
              Reject
            </Button>
          </div>
        )}

        {/* CLOSE */}
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default CourseDialog;
