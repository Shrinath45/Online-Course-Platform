import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import ViewCourse from "./ViewCourse";


const CourseDialog = ({ open, onClose, course }) => {

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
        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default CourseDialog;
