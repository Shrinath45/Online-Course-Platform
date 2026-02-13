import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import LHeader from "../Header/Lheader";
import LearnerCourseCard from "./LcourseCard";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/learner/mylearning/");
      setCourses(res.data.courses || []);
    };
    fetchCourses();
  }, []);

 

  return (
    <>
      <LHeader />
      
      <div className="flex flex-wrap gap-8 p-10">

  {courses.length === 0 ? (
    <p className="text-gray-500 text-lg">
      ❌ No enrolled courses found.
    </p>
  ) : (
    courses.map(course => (
      <LearnerCourseCard
        key={course.course_id}
        course={course}
      />
    ))
  )}

</div>

    </>
  );
};

export default MyLearning;
