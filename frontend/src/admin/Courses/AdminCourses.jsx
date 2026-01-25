import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import Aheader from "../Header/Aheader";
import AdminCourseCard from "./AdminCourseCard";

const Acourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/admin/Acourses");
      setCourses(res.data.courses || []);
    };
    fetchCourses();
  }, []);

  const updateStatus = (courseId, status) => {
    setCourses(prev =>
      prev.map(c =>
        c.course_id === courseId
          ? { ...c, approval_status: status }
          : c
      )
    );
  };

  return (
    <>
      <Aheader />
      
      <div className="flex flex-wrap gap-8 p-10">
        {courses.map(course => (
          <AdminCourseCard
            key={course.course_id}
            course={course}
            onStatusChange={updateStatus}
          />
        ))}
      </div>
    </>
  );
};

export default Acourses;
