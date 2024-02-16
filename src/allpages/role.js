import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
//import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../allstyles/role.css";

function Role() {
  const navigate = useNavigate();
  const [data,setData] = useState('');
  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/role`).then((response) => {
      setData(response.data);
      console.log(response.data);
      console.log(data);
    });
  }, []);

  console.log(data,'new');

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
              Kasetsart university sriracha campus
            </div>
          </div>
          <div />
        </div>
        <div className="menu_bar">
          <div
            className="home_button"
            onClick={() => {
              navigate(-1);
            }}
          >
            sign in
          </div>
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
export default Role;
