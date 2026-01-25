import { useState } from "react";
import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import CourseDialog from "./CourseDialog";

const AdminCourseCard = ({ course, onStatusChange }) => {
  const [open, setOpen] = useState(false);

const updateStatus = async (status) => {
  try {
    const res = await axios.put(`/admin/course-status/${course.course_id}`, { status });

    if (res.data.success) {
      toast.success(`Course marked as ${status}`);
      // use backend returned status, not local variable
      onStatusChange(course.course_id, res.data.status);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update status");
  }
};




  return (
    <>
      <div className="bg-[#111] w-80 rounded-xl border border-gray-800 p-4">
        <img
          src={course.thumbnail_url}
          className="h-48 w-full object-cover rounded"
        />

        <h2 className="text-white mt-3 font-semibold">
          {course.title}
        </h2>

        {/* STATUS BADGE */}
        <span
          className={`inline-block mt-2 px-3 py-1 text-xs rounded ${
            course.approval_status === "APPROVED"
              ? "bg-green-700"
              : course.approval_status === "REJECTED"
              ? "bg-red-700"
              : "bg-yellow-600"
          }`}
        >
          {course.approval_status}
        </span>

        {/* VIEW DETAILS */}
        <button
          onClick={() => setOpen(true)}
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          View Details
        </button>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-4">
          {course.approval_status === "PENDING" && (
            <>
              <button
                onClick={() => updateStatus("APPROVED")}
                className="flex-1 bg-green-600 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus("REJECTED")}
                className="flex-1 bg-red-600 py-2 rounded"
              >
                Reject
              </button>
            </>
          )}

          {(course.approval_status === "APPROVED" ||
            course.approval_status === "REJECTED") && (
            <button
              onClick={() => updateStatus("PENDING")}
              className="flex-1 bg-yellow-600 py-2 rounded"
            >
              Mark Pending
            </button>
          )}
        </div>
      </div>

      {/* COURSE DETAILS DIALOG */}
      <CourseDialog
        open={open}
        onClose={() => setOpen(false)}
        course={course}
      />
    </>
  );
};

export default AdminCourseCard;
