import React, { useState } from 'react'
import CourseDialog from './CourseDialog';
import axios from 'axios';
import toast from 'react-hot-toast';

const CardContent = ({ course, onDelete }) => {

   const token = sessionStorage.getItem("token");


    const [open, setOpen] = useState(false);

    const deleteClick = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  try {
    const res = await axios.delete(
      `http://localhost:5000/api/instructor/delete-course/${course.course_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      toast.success("Course Deleted Successfully");
      // 🔥 Let parent remove course from state
      onDelete(course.course_id);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete course!");
  }
};




    return (
        <>
            <div className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-gray-800 max-w-sm w-80">

                {/* Thumbnail */}
                <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-56 object-cover"
                />

                <div className="p-5">

                    {/* Title */}
                    <h2 className="text-white text-xl font-semibold mb-2">
                        {course.title}
                    </h2>

                    {/* Language Tag */}
                    <span className="px-3 py-1 bg-gray-700 text-xs text-gray-200 rounded-lg">
                        {course.language}
                    </span>

                    {/* Live / Batch Tag */}
                    {/* <span className="ml-2 px-3 py-1 bg-red-700 text-xs text-white rounded-lg">
                    {course.live_status}
                </span> */}

                    {/* Description */}
                    {/* <p className="text-gray-400 mt-3 text-sm line-clamp-2">
                    {course.description}
                </p> */}

                    {/* Price Section */}
                    <div className="mt-4">
                        <p className="text-green-400 text-xl font-bold">₹ {course.price}</p>

                        {/* {course.old_price && (
                        <p className="text-gray-500 line-through text-sm">₹ {course.old_price}</p>
                    )} */}
                    </div>

                    {/* View Details Button */}
                    <button onClick={() => {
                        setOpen(true);
                    }} className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-black font-medium py-2 rounded-lg">
                        View Details
                    </button>
                    <button onClick={deleteClick} className="w-full mt-4 bg-red-900 hover:bg-red-800 text-black font-medium py-2 rounded-lg">
                        Delete Course
                    </button>
                </div>

            </div>
            <CourseDialog open={open} onClose={() => {
                setOpen(false);
            }} course={course} />
        </>
    )
}

export default CardContent
