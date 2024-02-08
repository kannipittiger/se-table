import React from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/edu.css";
import { useNavigate } from "react-router-dom";
function Edu() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="allbox">
      <div className="header">
        <img src={logo} className="imglogo" alt="logo"></img>
        <div className="kubar">
          <div className="">
            <div className="thai-ku">
              มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </div>
            <div className="english-ku">
              Kasetsart university sriracha campus
            </div>
          </div>
          <div />
        </div>
        <div className="menu-bar">
          <span class="ph--user-bold"></span>
          <div className="profile">Profile</div>
          <div className="sign-In">หน้าหลัก</div>
        </div>
      </div>
      <div>
        <div className="bx1">
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
        <div className="bx7">
          <text>เพิ่มรายวิชา</text>
        </div>
        <div className="bx8">
          <text>โทร:</text>
        </div>
        <div className="bx9">
          <text>Sign out</text>
        </div>
        <div className="circle0"></div>
        <div className="whitebox"></div>
      </div>
    </div>
  );
}

export default Edu;
