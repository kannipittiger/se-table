import React from "react";
import logo from "../allstyles/englogo.png";
//import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "../allstyles/import.css";

function Import() {
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
          <div className="home-button">sign in</div>
          <div className="sign-in" onClick={goHome}>
            หน้าหลัก
          </div>
        </div>
      </div>
      <div className="whitebox">
        <div id="boxDownload">Download Excel</div>
        <div id="boxImport">Import</div>
        <div class="grid-container">
          <label className="textรหัส">รหัสวิชา</label>
          <label className="textวิชา">ชื่อวิชา</label>
          <label className="textหน่วยกิต">หน่วยกิต</label>
          <label className="textบังคับ">บังคับ/เลือก</label>
        </div>
        <div class="grid-container">
          <label className="circle1"></label>
          <label id="boxรหัส">0360xxxxx</label>
          <label id="boxวิชา">SE</label>
          <label id="boxหน่วยกิต">3</label>
          <label id="boxบังคับ">บังคับ</label>
          <label className="circle2"></label>
          <label id="boxรหัส2">0360xxxxx</label>
          <label id="boxวิชา2">SE</label>
          <label id="boxหน่วยกิต2">3</label>
          <label id="boxบังคับ2">บังคับ</label>
          <label className="circle3"></label>
          <label id="boxรหัส3">0360xxxxx</label>
          <label id="boxวิชา3">SE</label>
          <label id="boxหน่วยกิต3">3</label>
          <label id="boxบังคับ3">บังคับ</label>
        </div>
        <label id="boxclear">เคลียร์</label>
        <label id="boxสำเร็จ">สำเร็จ</label>
      </div>
    </div>
  );
}
export default Import;
