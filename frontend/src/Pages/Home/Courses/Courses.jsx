import React, { useState } from 'react'
import '../Landing/Landing.css'
import Footer from '../../Footer/Footer'
import Header from '../Header/Header'

function Courses() {
  const [facList, setFacList] = useState([]);
  const [loading, setLoading] = useState(true);

  const teachersList = async(sub)=>{
    setLoading(true);

    const response = await fetch(`/api/course/${sub}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    setFacList(data.data);
    console.log(data.data);
    setLoading(false);
  }

  return (
    <>
    <Header/>
    <div className="courses" style={{backgroundColor:"#0E3A59"}}>
      <h1>Courses</h1>
      <hr className="underLine"/>

      </div>
    </>
  )
}

export default Courses