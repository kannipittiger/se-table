import React, { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../allstyles/englogo.png";
//import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "../allstyles/role.css";
// import { SearchBar } from "../searchbar/SearchBar";
// import { SearchResultsList } from "../searchbar/SearchResultsList";

import { SearchBar } from "../searchRole/SearchBar";
import { SearchResultsList } from "../searchRole/SearchResultsList";


function Role() {
  const navigate = useNavigate();


  const goHome = () => {
    navigate("/");
  };

  const [data, setData] = useState([""]);
  //const [results,setResults] = useState([]);
  const [results, setResults] = useState([]);
  console.log(data)
  

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/role");
      setData(response.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(data, "test");




  const handleConfirm = () => {

    console.log("ส่งข้อความ:");


  };

  return (
    <div className="allbox">
      <div className="header">
        
        <img src={logo} className="imglogo"  alt="logo"></img>
        
        
        <div className="kubar">
          <div className="">
            <div className="thai_ku">
              มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </div>
            <div className="english_ku">
              Kasetsart university sriracha campus
            </div>
          </div >
          <div>
            <label className="textuser">ชื่อ-นามสกุล</label>
            <label className="textrole">Role</label>
            <label className="textsetRole">Change</label>

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
        <div className="searchRole">
          <SearchBar setResults={setResults} />
        </div>
        <div > 
        <SearchResultsList results={results} />
        </div>
        
        

        {/* <div className="role-search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && <SearchResultsList results={results} onSelect={handleSelect} />}
        </div> */}

        {/* {data.length > 0 && (
          <div className="scroll_role">
            {data.map((row, index) => {
              // ตรวจสอบว่ามีการค้นหาหรือไม่
              const hasSearchTerm = value.trim() !== "";

              // ตรวจสอบว่าชื่อผู้ใช้ตรงกับคำค้นหาหรือไม่
              const matchesSearch = row.user_name.toLowerCase().includes(value.toLowerCase());

              // แสดงรายการทั้งหมดหรือเฉพาะรายการที่ตรงกับคำค้นหา
              if (!hasSearchTerm || matchesSearch) {
                return (
                  <div key={index} className="renderimport">
                    <div id="boxname">
                      {row.user_name}
                    </div>
                    <div id="boxshowrole">
                      {row.user_role}
                    </div>
                    <div>
                      <select id="boxrole">
                        <option>Select</option>
                        <option>Teacher</option>
                        <option>Education</option>
                        <option>Admin</option>
                      </select>
                    </div>
                  </div>
                );
              }
              // ถ้าไม่ตรงกับคำค้นหา ให้ return null เพื่อไม่แสดงรายการนั้น
              return null;
            })}
          </div>
        )} */}

        {/* {data.length > 0 && (
          <div className=" scroll_role">
            {data.map((row, index) => (
              <div key={index} className="renderimport">

                <div
                  id="boxname"

                // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >

                  {row.user_name}


                </div>
                <div
                  id="boxshowrole"

                // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >

                  {row.user_role}


                </div>


                <div>
                  <select id="boxrole">
                    <option>Select</option>
                    <option>Teacher</option>
                    <option>Education</option>
                    <option>Admin</option>
                  </select>

                </div>

              </div>

            ))}
          </div>
        )} */}


      </div>
      <div className="submit_button" onClick={handleConfirm}>ยืนยัน</div>
    </div>
  );
}
export default Role;


/*
  <select id="box-2">
            <option> </option>
            <option>อาจารย์</option>
            <option>ฝ่ายการศึกษา</option>
            <option>ผู้ดูแลระบบ</option>
          </select>
          */

