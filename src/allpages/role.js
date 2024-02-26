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




  const handleConfirm = async () => {
    try {
      await Axios.post("http://localhost:5000/updateRole", { data });
      console.log("ส่งข้อมูลสำเร็จ");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    }
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
        <SearchResultsList results={results} handleConfirm={handleConfirm} />

        </div>

      </div>
      <div className="submit_button" onClick={handleConfirm}>ยืนยัน</div>
    </div>
  );
}
export default Role;