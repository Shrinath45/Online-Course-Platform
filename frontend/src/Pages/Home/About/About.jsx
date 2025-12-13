import React from 'react'
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg";
import course from "../../Images/course.jpg";
import instructor from "../../Images/instructor.jpg";
import learning from "../../Images/learning.jpg";
import '../Landing/Landing.css';
import Footer from "../../Footer/Footer.jsx"
import Header from '../Header/Header.jsx';

function About({ backgroundC }) {
  return (
    <>
      <Header />
      <div className="about min-h-screen" style={{ backgroundColor: "#0E3A59" }}>
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
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto ">
            
            {/* Card 1 */}
            <div className="bg-[#f7fbff] p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <img src={course} className='rounded-lg h-70 w-full object-cover'  alt="" />
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
              <img src={instructor} className='rounded-lg h-70 w-full object-cover'  alt="" />
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
    </>
  )
}

export default About