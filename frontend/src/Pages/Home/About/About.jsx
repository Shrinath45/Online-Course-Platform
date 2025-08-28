import React from 'react'
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg";
import '../Landing/Landing.css'
import Footer from "../../Footer/Footer.jsx"
import Header from '../Header/Header.jsx';

function About({backgroundC}) {
  return (
    <>
    <Header/>
    <div className="about" style={{backgroundColor:"#0E3A59"}}>
        <h1>About Us</h1>
        <hr className="underLine"/>
        <div className="content">
          <div className="left-svg">
            <img src={Plant2} className="w-[22rem]" alt="" />
          </div>
          <p>
            At SkillForge, we believe in the power of education to transform lives. Our platform is designed to be a gateway to knowledge, offering a diverse range of courses and learning experiences for students.
            <h2 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Our Story</h2>
            SkillForge was born out of a passion for learning and a desire to make quality education accessible to everyone. We understand the challenges faced by modern learners and strive to provide a solution that is both convenient and effective.
            <h2 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Our Mission</h2>
            Our mission is simple yet profound: to empower individuals through education. We aim to create a global learning community where students can discover new passions, enhance their skills, and achieve their academic and professional goals. By leveraging technology and innovative teaching methods, we strive to make learning engaging, interactive, and enjoyable.
          </p>
          <div className="right-svg">
            <img src={Plant} className="w-[30rem]" alt="" />
          </div>
        </div>
    </div>
    </>
  )
}

export default About