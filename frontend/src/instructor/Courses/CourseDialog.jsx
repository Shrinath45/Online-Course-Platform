import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { useState } from "react";
import ViewCourse from "./ViewCourse";
import EditCourse from "./EditCourse";

const CourseDialog = ({ open, onClose, course }) => {
  const [editMode, setEditMode] = useState(false);

  const handleClose = () => {
    setEditMode(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">

      <DialogTitle>
        {editMode ? "Edit Course" : "Course Details"}
      </DialogTitle>

      <DialogContent dividers>
        {!course ? (
          <p className="text-gray-500">Loading course...</p>
        ) : !editMode ? (
          <ViewCourse course={course} />
        ) : (
          <EditCourse course={course} onClose={handleClose} />
        )}
      </DialogContent>

      <DialogActions>
        {!editMode && course && (
          <Button
            variant="contained"
            onClick={() => setEditMode(true)}
          >
            Edit Course
          </Button>
        )}
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>

    </Dialog>
  );
};

export default CourseDialog;
