import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import LHeader from "../Header/Lheader";
import LearnerCourseCard from "./LcourseCard";

const LearnerCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/learner/learner-courses");
      setCourses(res.data.courses || []);
    };
    fetchCourses();
  }, []);

 

  return (
    <>
      <LHeader />
      
      <div className="flex flex-wrap gap-8 p-10">
        {courses.map(course => (
          <LearnerCourseCard
            key={course.course_id}
            course={course}
          />
        ))}
      </div>
    </>
  );
};

export default LearnerCourses;
