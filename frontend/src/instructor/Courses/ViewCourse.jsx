// const ViewCourse = ({ course }) => {

//     if (!course) {
//         return <p>Loading...</p>;
//     }

//     console.log("VIDEO URL:", course.video_url);

//     return (
//         <div className="p-10">
//             <div className="mb-10">
//                 {course.video_url ? (
//                     <video
//                         controls
//                         className="w-full h-64 rounded-lg"
//                         preload="metadata"
//                     >
//                         <source src={course.video_url} type="video/mp4" />
//                     </video>
//                 ) : (
//                     <p className="text-gray-500 text-sm">
//                         No preview video available
//                     </p>
//                 )}
//             </div>

//             <div className="flex flex-col">
//                 <h1><b>Title:</b> {course.title}</h1>
//                 <h5><b>Description:</b> {course.description}</h5>
//                 <h5><b>Course Language:</b> {course.language}</h5>
//                 <h5><b>Course Type:</b> {course.course_type}</h5>
//             </div>
//         </div>
//     );
// };

// export default ViewCourse;

import React, { useState } from "react";

const ViewCourse = ({ course }) => {
  const [playVideo, setPlayVideo] = useState(false);

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10">

      {/* VIDEO / THUMBNAIL SECTION */}
      <div className="mb-10 w-full h-64 rounded-lg overflow-hidden relative">

        {!playVideo ? (
          <>
            {/* THUMBNAIL */}
            <img
              src={course.thumbnail_url}
              alt="Course Thumbnail"
              className="w-full h-full object-cover"
            />

            {/* PLAY BUTTON (CENTERED LIKE YOUTUBE) */}
            {course.video_url && (
              <button
                onClick={() => setPlayVideo(true)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    className="w-8 h-8 ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </>
        ) : (
          <video
            controls
            autoPlay
            className="w-full h-full"
            preload="metadata"
          >
            <source src={course.video_url} type="video/mp4" />
          </video>
        )}
      </div>

      {/* COURSE DETAILS */}
      <div className="flex flex-col gap-5">
        <h1><b>Title:</b> {course.title}</h1>
        <h5><b>Description:</b> {course.description}</h5>
        <h5><b>Course Language:</b> {course.language}</h5>
        <h5><b>Course Type:</b> {course.course_type}</h5>
      </div>
    </div>
  );
};

export default ViewCourse;
