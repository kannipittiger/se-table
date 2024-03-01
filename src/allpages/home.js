import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/home.css";
import Axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import ReactBigCalendar from "../calendar/ReactBigCalendar";

// Import the calendar image
import calendarImage from "./ปฏิทิน.png";

const Home = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:5000/role`).then((response) => {
      setRole(response.data);
      console.log(role);
    });
  }, []);

  const handleSignInWithGoogle = async () => {
    
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user.email);
      console.log(role);
      for (let i = 0; i < role.length; i++) {
        if (user.email === role[i]["user_email"]) {
          if (role[i]["user_role"] === "Admin") {
            navigate("admin");
          } else if (role[i]["user_role"] === "Teacher") {
            navigate("teacher");
          } else if (role[i]["user_role"] === "Education") {
            navigate("edu");
          }
        }
      }
      console.log("อดเข้าว้ายยย");

      console.log(result, "ไทเกอร์ชอบลบไฟล์");
    } catch (error) {
      console.error(error);
    }
  };

  const goMajor = () => {
    navigate("major");
  };

  const goEdu = () => {
    navigate("/edu");
  };

  const goImport = () => {
    navigate("/import");
  };

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        window.location.reload();
        console.log("logout");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="allbox">
      <div className="header">
        <img src={logo} className="imglogo" alt="logo"></img>
        <div className="kubar">
          <div className="thai_ku">มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</div>
          <div className="english_ku">Kasetsart University Sriracha Campus</div>
        </div>
        <div className="menu_bar">
          <div className="sign_in" onClick={handleSignInWithGoogle}>
            <div>SIGN IN</div>
            <FcGoogle size={25} />
          </div>
          <div className="home_button" onClick={goImport}>
            หลักสูตร
          </div>
        </div>
      </div>
      <div className="white_box">
        <div className="calendar_image">
          <img src={calendarImage} alt="calendar" />
        </div>
        <div className="bigcalendar">
          <ReactBigCalendar />
        </div>
      </div>
    </div>
  );
};

export default Home;
