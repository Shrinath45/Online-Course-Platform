import React, { useEffect, useState } from "react";
import axios from "axios";
import CardContent from "./CardContent";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [courses, setCourses] = useState([]); // MUST be array
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

        // ✅ FIX IS HERE
        setCourses(res.data.courses);
      } catch (error) {
        console.error("Fetch courses error:", error);
        setCourses([]); // safety
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div>
      <div className="flex flex-wrap justify-between p-5">
        <button className="w-fit text-lg bg-blue-600 text-white px-3 py-2">Filter</button>
        <button className="w-fit text-lg bg-blue-600 text-white px-3 py-2" onClick={()=>{
          navigate('/add-course');
        }}>Add Course</button>
      </div>
      <div className="cards-grid flex justify-between gap-5 p-10 flex-wrap">

        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map(course => (
            <CardContent key={course.course_id} course={course} />
          ))
        ) : (
          <p>No courses found</p>
        )}



      </div>
    </div>
  );
};

export default Cards;
