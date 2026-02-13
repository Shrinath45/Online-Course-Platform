import React, { useState } from "react";
import axios from "../../api/axiosInstance"; // ✅ correct
import toast from "react-hot-toast";

const ViewCourse = ({ course }) => {
  const [playVideo, setPlayVideo] = useState(false);

  const checkAccess = async () => {
    try {
      const res = await axios.post("/learner/check-access", {
        courseId: course.course_id, // ✅ only courseId
      });

      if (res.data.enrolled) { // ✅ correct key
        setPlayVideo(true);
      } else {
        toast.error("❌ Please enroll or purchase this course!");
      }

    } catch (err) {
      console.log(err);
      toast.error("Error checking access");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <div className="mb-10 w-full h-64 rounded-lg overflow-hidden relative">

        {!playVideo ? (
          <>
            <img
              src={course.thumbnail_url}
              alt="Course Thumbnail"
              className="w-full h-full object-cover"
            />

            {course.video_url && (
              <button
                onClick={checkAccess}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-8 h-8 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </>
        ) : (
          <video controls autoPlay className="w-full h-full">
            <source src={course.video_url} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};

export default ViewCourse;
