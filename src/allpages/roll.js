import React from "react";
import logo from "../allstyles/englogo.png";
//import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "../allstyles/roll.css";

function Roll() {
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
        <div>
          {/* <CiSearch size={30} /> */}
          <input className="Searchbar" placeholder="Search"></input>
        </div>
        <div>
          <label className="textName1">ชื่อ - นามสกุล</label>
          <label className="textName2">บทบาท </label>
          <label id="boxroll1">Prawit ChumChu</label>
          <select id="box-2">
            <option> </option>
            <option>อาจารย์</option>
            <option>ฝ่ายการศึกษา</option>
            <option>ผู้ดูแลระบบ</option>
          </select>
          <label id="box-3">Prawit ChumChu</label>
          <select id="box-4">
            <option> </option>
            <option>อาจารย์</option>
            <option>ฝ่ายการศึกษา</option>
            <option>ผู้ดูแลระบบ</option>
          </select>
          <label id="box-5">Prawit ChumChu</label>
          <select id="box-6">
            <option> </option>
            <option>อาจารย์</option>
            <option>ฝ่ายการศึกษา</option>
            <option>ผู้ดูแลระบบ</option>
          </select>
          <label id="box-7">Prawit ChumChu</label>
          <select id="box-8">
            <option> </option>
            <option>อาจารย์</option>
            <option>ฝ่ายการศึกษา</option>
            <option>ผู้ดูแลระบบ</option>
          </select>
          <label id="box-9">Prawit ChumChu</label>
          <select id="box-10">
            <option> </option>
            <option>อาจารย์</option>
            <option>ฝ่ายการศึกษา</option>
            <option>ผู้ดูแลระบบ</option>
          </select>
          <label id="box-11">Prawit ChumChu</label>
          <select id="box-12">
            <option> </option>
            <option>อาจารย์</option>
            <option>ฝ่ายการศึกษา</option>
            <option>ผู้ดูแลระบบ</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default Roll;
