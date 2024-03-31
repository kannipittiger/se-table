import React, { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../allstyles/englogo.png";
import "../allstyles/course.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";

function Course() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const goHome = () => {
    navigate("/");
  };

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
          <div className="">
            <div className="thai_ku">
              มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </div>
            <div className="english_ku">
              Kasetsart University Sriracha Campus
            </div>
          </div>
          <div />
        </div>
        <div className="menu_bar">
        <div className="sign_inC" onClick={handleSignInWithGoogle}><div>SIGN IN</div>
          </div>
            <div className="homeC" onClick={goHome}>หน้าหลัก</div>
        </div>
      </div>
      <div>
        <div className="bbox1">คณะวิศวกรรมศาสตร์ศรีราชา หลักสูตรปริญญาตรี</div>
        <li className="bbox2">
          <a href="https://www.eng.src.ku.ac.th/th/วิศวกรรมดิจิทัลและอิเล/" target="_blank">
             DSEE สาขา ดิจิทัลและอิเล็กทรอนิกส์อัจฉริยะ
          </a>
        </li>
        <li className="bbox3">
        <a href="https://www.eng.src.ku.ac.th/th/วิศวกรรมยานยนต์-หลักสูต/" target="_blank">
              AE สาขา ยานยนต์
        </a>
        </li>
        <li className="bbox4">
          <a href="https://www.eng.src.ku.ac.th/th/วิศวกรรมระบบการผลิตดิจ/" target="_blank">
              DMSE สาขา ระบบการผลิตดิจิทัล
          </a>
        </li>
        <li className="bbox5">
          <a href="https://www.eng.src.ku.ac.th/th/วิศวกรรมอุตสาหการและระ/" target="_blank">
              IE สาขา อุตสาหการและระบบ
          </a>
        </li>
        <li className="bbox6">
          <a href="https://www.eng.src.ku.ac.th/th/วิศวกรรมไฟฟ้า/" target="_blank">
              EE สาขา ไฟฟ้าและอิเล็กทรอนิกซ์
          </a>
        </li>
        <li className="bbox7">
          <a href="https://www.eng.src.ku.ac.th/th/วิศวกรรมโยธา/" target="_blank">
              CE สาขา โยธา
          </a>
        </li>
        <li className="bbox8">
          <a href="https://www.eng.src.ku.ac.th/th/วิศวกรรมคอมพิวเตอร์และ/" target="_blank">
              CPE สาขา คอมพิวเตอร์และสารสนเทศศาสตร์
          </a>
        </li>
        <li className="bbox9">
          <a href="https://www.eng.src.ku.ac.th/th/วิศวกรรมเครื่องกลและกา/" target="_blank">
              ME สาขา เครื่องกลและการออกแบบ
          </a>
        </li>
        <li className="bbox10">
          <a href="https://www.eng.src.ku.ac.th/th/วิศวกรรมหุ่นยนต์และระบ/" target="_blank">
              RASE สาขา หุ่นยนต์และระบบอัตโนมัติ
          </a>
        </li>


        <div className="whitebox"></div>
      </div>
    </div>
  );
}

export default Course;
