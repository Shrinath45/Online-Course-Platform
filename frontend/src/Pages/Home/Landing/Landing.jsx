import React, { useState } from "react";
import "./Landing.css";
import Coder from "../../Images/Coder.jpg";
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg"
import Footer from "../../Footer/Footer.jsx";
import learning from "../../Images/learning.jpg";
import instructor from "../../Images/instructor.jpg";
import course from "../../Images/course.jpg";
import Header from "../Header/Header.jsx";
import { CgProfile } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Mail from "../../Images/Meet-the-team.svg";
import Right from "../../Images/right.png";

function Landing() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handlemsg = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || msg === '') {
      alert("All fields are required!")
    } else if ((!/\S+@\S+\.\S+/.test(email))) {
      alert("Enter a valid email!")
    } else {
      const data = await fetch('/api/admin/contact-us', {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message: msg }),
      })

      const response = await data.json();
      alert(response.message);
      setName('');
      setEmail('');
      setMsg('');
    }
  }


  const [LClass, setLClass] = useState(false);
  const [EMentor, setEMentor] = useState(false);
  const [subject, setSubject] = useState('');

  const [facList, setFacList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const handleSearch = () => {
    // console.log('working')
    navigate(`/Search/${subject}`)
  }

  const AA = () => {
    setEMentor(true);
    setLClass(false);
  }

  const BB = () => {
    setEMentor(false);
    setLClass(true);
  }

  const teachersList = async (sub) => {
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
      <Header />
      {/* Top Section */}
      <div className="top flex " style={{ backgroundColor: "#0E3A59" }}>
        <div className="left flex flex-col flex-wrap">
          <h1>
            Empowering Minds, Inspiring Futures: <br />Your Gateway to Online Learning with <span className="font-semibold text-amber-400 font-serif text-5xl">SkillForge</span>
          </h1>
          <div className="search mb-">
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5" width={30} alt="" />
            <input type="text" placeholder='Ex: HTML ...' value={subject} onChange={(e) => setSubject(e.target.value)} />
            <button className='w-32' onClick={handleSearch}>Find Course</button>
          </div>

        </div>
        <div className="right">
          <img src={Right} className="h-fit w-fit" alt="" />
        </div>

      </div>

      <div className="courses" style={{ backgroundColor: "#0E3A59" }}>
        <h1>Courses</h1>
        <hr className="underLine" />



      </div>

      <div className="about" style={{ backgroundColor: "#0E3A59" }}>
        <h1>About Us</h1>
        <hr className="underLine" />
        <section className="w-full py-16 px-6 md:px-20">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-white text-2xl font-semibold mt-5 mb-5">
              SkillForge is a next-generation online learning platform empowering
              learners and instructors with modern tools, structured learning paths,
              and seamless teaching experiences.
            </h2>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-5">
            {/* Card 1 */}
            <div className="bg-[#f7fbff] p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <img src={course} className='rounded-lg h-70 w-full object-cover' alt="" />
              <h3 className="text-3xl font-bold mt-3 text-center text-[#042439] mb-2">
                High-Quality Courses
              </h3>
              <p className="text-gray-600 text-center mt-3">
                Learn from skilled instructors offering well-structured modules,
                quizzes, and real-world projects.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f7fbff] p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <img src={instructor} className='rounded-lg h-70 w-full object-cover' alt="" />
              <h3 className="text-3xl font-bold text-center mt-3 text-[#042439] mb-2">
                Instructor-Friendly Tools
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Upload courses, track student progress, and view your earnings in
                one powerful dashboard.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f7fbff] p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <img src={learning} className='rounded-lg h-70 w-full object-cover' alt="" />
              <h3 className="text-3xl font-bold mt-3 text-[#042439] mb-2 text-center">
                Seamless Learning
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Beautiful UI, mobile-friendly design, and interactive learning
                experience from anywhere.
              </p>
            </div>

          </div>
        </section>
      </div>

      <div className="contact" style={{ backgroundColor: "#0E3A59" }}>
        <h1>Contact Us</h1>
        <hr className="underLine" />
        <div className="content">
          <img src={Mail} width={700} alt="" />
          <form className="form-submit">
            <h4 className="text-3xl text-white">Send Message</h4>
            <input
              type="text"
              placeholder="Name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Message"
              className="textArea"
              name="message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button onClick={handlemsg} className="w-[19rem] bg-light-blue-800">Send A Message</button>
          </form>
        </div>

      </div>
      <Footer />



      {/* Footer */}
    </>
  );
}

export default Landing;