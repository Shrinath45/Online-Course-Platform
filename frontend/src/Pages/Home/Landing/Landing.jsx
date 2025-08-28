import React, { useState } from "react";
import "./Landing.css";
import Classroom from "../../Images/Classroom.svg";
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg"
import Footer from "../../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import { CgProfile } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Mail from "../../Images/Meet-the-team.svg";

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
      <div className="top" style={{ backgroundColor: "#0E3A59" }}>
        <div className="left">
          <h1>
            Empowering Minds, Inspiring Futures: <br />Your Gateway to Online Learning with <span className="font-semibold text-amber-400 font-serif text-5xl">SkillForge</span>
          </h1>
          {/*  Search  */}


          <div className="search mb-10">
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5" width={30} alt="" />
            <input type="text" placeholder='Ex: HTML ...' value={subject} onChange={(e) => setSubject(e.target.value)} />
            <button className='w-32' onClick={handleSearch}>Find Course</button>
          </div>



        </div>
        <div className="right">
          <img src={Classroom} width={500} alt="" />
        </div>
      </div>


      {/* Courses */}
      <div className="courses" style={{ backgroundColor: "#0E3A59" }}>
        <h1>Courses</h1>
        <hr className="underLine" />
        <div className="subjects">
          <div className="subject" onClick={() => teachersList("physics")}>
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" alt="Physics" />
            <p>Physics</p>
          </div>
          <div className="subject" onClick={() => teachersList("chemistry")}>
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" alt="Chemistry" />
            <p>Chemistry</p>
          </div>
          <div className="subject" onClick={() => teachersList("biology")}>
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" alt="Zoology" />
            <p>Biology</p>
          </div>
          <div className="subject" onClick={() => teachersList("math")}>
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" alt="Math" />
            <p>Math</p>
          </div>
          <div className="subject" onClick={() => teachersList("computer")}>
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" alt="Computer" />
            <p>Computer</p>
          </div>

        </div>


      </div>

      {/* About Us */}
      <div className="about" style={{ backgroundColor: "#042439" }}>
        <h1>About Us</h1>
        <hr className="underLine" />
        <div className="content">
          <div className="left-svg">
            <img src={Plant2}  alt="" />
          </div>
          <div>
            <p>
              At Shiksharthee, we believe in the power of education to transform lives.
              Our platform is designed to be a gateway to knowledge, offering a diverse
              range of courses and learning experiences for students.
            </p>

            <h2 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Our Story</h2>
            <p>
              Shiksharthee was born out of a passion for learning and a desire to make
              quality education accessible to everyone. We understand the challenges
              faced by modern learners and strive to provide a solution that is both
              convenient and effective.
            </p>

            <h2 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Our Mission</h2>
            <p>
              Our mission is simple yet profound: to empower individuals through education.
              We aim to create a global learning community where students can discover new
              passions, enhance their skills, and achieve their academic and professional
              goals. By leveraging technology and innovative teaching methods, we strive to
              make learning engaging, interactive, and enjoyable.
            </p>
          </div>

          <div className="right-svg">
            <img src={Plant}  alt="" />
          </div>
        </div>
      </div>

      {/* Contact Us */}
      <div className="contact" style={{ backgroundColor: "#0E3A59" }}>
        <h1>Contact Us</h1>
        <hr className="underLine" />
        <div className="content">
          <img src={Mail} width={700} alt="" />
          <form className="form-submit">
            <h4>Send Message</h4>
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


// import React, { useState } from "react";
// import "./Landing.css";
// import Classroom from "../../Images/Classroom.svg";
// import Plant from "../../Images/Plant.svg";
// import Plant2 from "../../Images/Plant2.svg";
// import Footer from "../../Footer/Footer.jsx";
// import Header from "../Header/Header.jsx";
// import { CgProfile } from "react-icons/cg";
// import { IoSchoolSharp } from "react-icons/io5";
// import { FaSchool } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// import Mail from "../../Images/Meet-the-team.svg";

// function Landing() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [msg, setMsg] = useState("");

//   const handlemsg = async (e) => {
//     e.preventDefault();
//     if (name === "" || email === "" || msg === "") {
//       alert("All fields are required!");
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       alert("Enter a valid email!");
//     } else {
//       const data = await fetch("/api/admin/contact-us", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, message: msg }),
//       });

//       const response = await data.json();
//       alert(response.message);
//       setName("");
//       setEmail("");
//       setMsg("");
//     }
//   };

//   const [subject, setSubject] = useState("");
//   const [facList, setFacList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate(`/Search/${subject}`);
//   };

//   const teachersList = async (sub) => {
//     setLoading(true);
//     const response = await fetch(`/api/course/${sub}`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.json();
//     setFacList(data.data);
//     setLoading(false);
//   };

//   return (
//     <>
//       <Header />
//       {/* Top Section */}
//       <div className="top" style={{ backgroundColor: "#0E3A59" }}>
//         <div className="left">
//           <h1>
//             Empowering Minds, Inspiring Futures: <br />
//             Your Gateway to Online Learning with{" "}
//             <span className="font-semibold text-amber-400 font-serif text-5xl">
//               SkillForge
//             </span>
//           </h1>

//           {/* ✅ Updated Search Bar */}
//           <div className="search flex justify-center mt-6">
//             <div className="flex items-center bg-white rounded-md shadow-md overflow-hidden">
//               <div className="flex items-center px-3">
//                 <img
//                   src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5"
//                   alt="Search Icon"
//                   className="w-5 h-5 opacity-70"
//                 />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Ex: Math ..."
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 className="px-3 py-2 text-gray-700 outline-none border-none w-64 placeholder-gray-400"
//               />
//               <button
//                 onClick={handleSearch}
//                 className="bg-blue-600 text-white px-5 py-2 hover:bg-blue-700 transition-all"
//               >
//                 Find Course
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="right">
//           <img src={Classroom} width={500} alt="" />
//         </div>
//       </div>

//       {/* Courses */}
//       <div className="courses" style={{ backgroundColor: "#0E3A59" }}>
//         <h1>Courses</h1>
//         <hr className="underLine" />
//         <div className="subjects">
//           <div className="subject" onClick={() => teachersList("physics")}>
//             <img
//               src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2"
//               alt="Physics"
//             />
//             <p>Physics</p>
//           </div>
//           <div className="subject" onClick={() => teachersList("chemistry")}>
//             <img
//               src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95"
//               alt="Chemistry"
//             />
//             <p>Chemistry</p>
//           </div>
//           <div className="subject" onClick={() => teachersList("biology")}>
//             <img
//               src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555"
//               alt="Zoology"
//             />
//             <p>Biology</p>
//           </div>
//           <div className="subject" onClick={() => teachersList("math")}>
//             <img
//               src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664"
//               alt="Math"
//             />
//             <p>Math</p>
//           </div>
//           <div className="subject" onClick={() => teachersList("computer")}>
//             <img
//               src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272"
//               alt="Computer"
//             />
//             <p>Computer</p>
//           </div>
//         </div>
//       </div>

//       {/* About Us */}
//       <div className="about" style={{ backgroundColor: "#042439" }}>
//         <h1>About Us</h1>
//         <hr className="underLine" />
//         <div className="content">
//           <div className="left-svg">
//             <img src={Plant2} width={300} alt="" />
//           </div>
//           <div>
//             <p>
//               At SkillForge, we believe in the power of education to transform
//               lives. Our platform is designed to be a gateway to knowledge,
//               offering a diverse range of courses and learning experiences for
//               students.
//             </p>

//             <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">
//               Our Story
//             </h1>
//             <p>
//               SKillForge was born out of a passion for learning and a desire
//               to make quality education accessible to everyone. We understand
//               the challenges faced by modern learners and strive to provide a
//               solution that is both convenient and effective.
//             </p>

//             <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">
//               Our Mission
//             </h1>
//             <p>
//               Our mission is simple yet profound: to empower individuals through
//               education. We aim to create a global learning community where
//               students can discover new passions, enhance their skills, and
//               achieve their academic and professional goals. By leveraging
//               technology and innovative teaching methods, we strive to make
//               learning engaging, interactive, and enjoyable.
//             </p>
//           </div>

//           <div className="right-svg">
//             <img src={Plant} width={400} alt="" />
//           </div>
//         </div>
//       </div>

//       {/* Contact Us */}
//       <div className="contact" style={{ backgroundColor: "#0E3A59" }}>
//         <h1>Contact Us</h1>
//         <hr className="underLine" />
//         <div className="content">
//           <img src={Mail} width={700} alt="" />
//           <form className="form-submit">
//             <h4>Send Message</h4>
//             <input
//               type="text"
//               placeholder="Name"
//               className="input"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <textarea
//               placeholder="Message"
//               className="textArea"
//               name="message"
//               value={msg}
//               onChange={(e) => setMsg(e.target.value)}
//             />
//             <button
//               onClick={handlemsg}
//               className="w-[19rem] bg-light-blue-800"
//             >
//               Send A Message
//             </button>
//           </form>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Landing;
