import React from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/edu.css";
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
  const goHome = () => {
    navigate("/");
  };
  const goImport = () => {
    navigate("/import");
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
          <div className="profileE">Profile</div>
          <div className="signE">หน้าหลัก</div>
        </div>
      </div>
      <div>
        <div className="bx1" onClick={goTable}>
          <text>ตรวจสอบความถูกต้อง</text>
        </div>
        <div className="bx2">
          <text>จัดตาราง</text>
        </div>
        <div className="bx3">
          <text>ชื่อ:</text>
        </div>
        <div className="bx4">
          <text>สาขา:</text>
        </div>
        <div className="bx5">
          <text>คณะ:</text>
        </div>
        <div className="bx6">
          <text>เมล:</text>
        </div>
        <div className="bx7" onClick={goImport}>
          <text>เพิ่มรายวิชา</text>
        </div>
        <div className="bx8">
          <text>โทร:</text>
        </div>
        <div className="bx9" onClick={handleLogout}>
          <text>Sign out</text>
        </div>
        <div className="circle0"></div>
        <div className="whitebox"></div>
      </div>
    </div>
  );
}

export default Edu;
