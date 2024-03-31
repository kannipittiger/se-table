import React from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/edu.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../firebase";
import {
  signInWithPopup,
  getAuth,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

function Edu() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [info, setInfo] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:5000/user`).then((response) => {
      setInfo(response.data);
      console.log(info);
    });
  }, []);

  const compareUserInfo = () => {
    // เปรียบเทียบข้อมูล user กับ info หรือทำอย่างอื่นตามต้องการ
    if (info.length > 0) {
      for (let i = 0; i < info.length; i++) {
        if (user.email === info[i]["user_email"]) {
          console.log(user);
          setProfile(info[i]);
          console.log(profile);
        }
      }
    }
  };

  const goHome = () => {
    navigate("/");
    handleLogout();
  };

  const goImport = () => {
    navigate("/import");
  };
  const goTable = () => {
    navigate("/tableedu");
  };
  const goEduAlert = () => {
    navigate("/edualert");
  };
  const goScheEdu = () => {
    navigate("/scheedu");
  };

  useEffect(() => {
    compareUserInfo();
  }, [info]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
      console.log("logout");
    } catch (error) {
      console.error(error);
    }
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
          <div className="profileD">Profile</div>
          <div className="homeD" onClick={goHome}>
            หน้าหลัก
          </div>
        </div>
      </div>
      <div>
        <div className="bx1" onClick={goTable}>
          <text>ตรวจสอบความถูกต้อง</text>
        </div>
        <div className="bx1_n" onClick={goEduAlert}>
          <text>ตรวจสอบวิชาที่มีการชน</text>
        </div>
        <div className="bx2" onClick={goScheEdu}>
          <text>จัดตาราง</text>
        </div>
        <div className="bx3">
          <text>ชื่อ: {profile.user_name}</text>
        </div>
        <div className="bx4">
          <text>สาขา: {profile.user_department}</text>
        </div>
        <div className="bx5">
          <text>คณะ: {profile.user_faculty}</text>
        </div>
        <div className="bx6">
          <text>เมล: {profile.user_email}</text>
        </div>
        <div className="bx7" onClick={goImport}>
          <text>เพิ่มรายวิชา</text>
        </div>
        <div className="bx8">
          <text>โทร: {profile.user_phone}</text>
        </div>
        <div className="bx9" onClick={handleLogout}>
          SIGN OUT
        </div>
        <img className="circleE" src={`${profile.user_image}`} alt="profile" />
      </div>
    </div>
  );
}

export default Edu;
