import React from "react";
import logo from "../allstyles/englogo.png";
import { useState, useEffect } from "react";
import "../allstyles/admin.css";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../firebase";
import {
  signInWithPopup,
  getAuth,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

function Admin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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

  const goEdu = () => {
    navigate("/edu");
  };
  const goRole = () => {
    navigate("/role");
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
          <div className="home_button">sign in</div>
          <div className="sign-in" onClick={goEdu}>
            Edu
          </div>
        </div>
      </div>
      <div className="whitebox">
        <div>
          <div id="box1บทบาท" onClick={goRole}>
            บทบาท
          </div>
          <div id="box2ตรวจสอบ">ตรวจสอบความถูกต้อง</div>
          <div id="box3">
            <text>ชื่อ :</text>
          </div>
          <div id="box4">
            <text>สาขา : </text>
          </div>
          <div id="box5">
            <text>คณะ : </text>
          </div>
          <div id="box6">
            <text>เมล : </text>
          </div>
          <div id="box8">
            <text>โทร : </text>
          </div>
          <div id="box9ad" onClick={handleLogout}>
            SIGN OUT
          </div>
          <div id="circle">
            <img src={user.photoURl} alt="profile" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admin;
