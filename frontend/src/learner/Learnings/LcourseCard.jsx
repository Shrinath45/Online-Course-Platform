import { useState } from "react";
import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import CourseDialog from "./CourseDialog";

const LearnerCourseCard = ({ course }) => {
  const [open, setOpen] = useState(false);

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
        <div>
            <h3 className="text-white mt-3 font-semibold">Course Type: <span className="text-green-600 font-medium">{course.course_type}</span> </h3>
            <h3 className="text-white mt-3 font-semibold">Language: <span className="text-green-600 font-medium">{course.language}</span> </h3>
        </div>

        {/* VIEW DETAILS */}
        <button
          onClick={() => setOpen(true)}
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          View Details
        </button>

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

export default LearnerCourseCard;
