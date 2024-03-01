import React from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/teacher.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  signInWithPopup,
  getAuth,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

function Teacher() {
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


  const goScheteacher = () => {
    navigate("/scheteacher");
  };
  const goTable = () => {
    navigate("/tableteacher");
  };

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

  useEffect(() => {
    compareUserInfo();
  }, [info]);

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
          <div className="signT">sign in</div>
          <div className="sign-iN">หน้าหลัก</div>
        </div>
      </div>
      <div>
        <div className="box1t" onClick={goTable}>
          ตรวจสอบความถูกต้อง
        </div>
        <div className="box2t">จัดตาราง</div>
        <div className="box3t">
          <text>ชื่อ : {profile.user_name}</text>
        </div>
        <div className="box4t">
          <text>สาขา : {profile.user_department}</text>
        </div>
        <div className="box5t">
          <text>คณะ : {profile.user_faculty}</text>
        </div>
        <div className="box6t">
          <text>เมล : {profile.user_email}</text>
        </div>
        <div className="box8t">
          <text>โทร : {profile.user_phone}</text>
        </div>
        <div className="box9t" onClick={handleLogout}>
          SIGN OUT
        </div>

        <img className="circleT" src={`${profile.user_image}`} alt="profile" />

      </div>
      <div className="whitebox"></div>
      <div className="icon-noti">
        <IoNotificationsOutline size={50} />
      </div>
    </div>
  );
}

export default Teacher;
