import React, { useEffect, useState } from "react";
import axios from "axios";
import CardContent from "./CardContent";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/instructor/get-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(res.data.courses || []);
      } catch (error) {
        console.error("Fetch courses error:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 🔥 DELETE HANDLER (IMPORTANT)
  const handleDeleteCourse = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.filter(course => course.course_id !== courseId)
    );
  };

  if (loading) return <p className="p-5">Loading courses...</p>;

  return (
    <div className="flex flex-col">


      <div className="flex justify-end p-5">
        <button
          className="text-lg bg-blue-600 text-white px-4 py-2 w-fit rounded hover:bg-blue-700"
          onClick={() => navigate("/add-course")}
        >
          Add Course
        </button>
      </div>

      {/* Course Cards */}
      <div className="cards-grid flex gap-10 p-10 flex-wrap">
        {courses.length > 0 ? (
          courses.map(course => (
            <CardContent
              key={course.course_id}
              course={course}
              onDelete={handleDeleteCourse} // 🔥 PASS HANDLER
            />
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
