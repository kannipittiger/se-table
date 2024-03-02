import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../allstyles/englogo.png";
import { useNavigate } from "react-router-dom";
import "../allstyles/role.css";
import { SearchBar } from "../searchRole/SearchBar";
import { SearchResultsListRole } from "../searchRole/SearchResultsListRole";

function Role() {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate("/");
  };

  const [results, setResults] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/role");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);

  // const handleChange = (index, event) => {
  //   const { value } = event.target;
  //   const updatedResults = results.map((row, i) =>
  //     i === index ? { ...row, selectedRole: value } : row
  //   );
  //   setResults(updatedResults);
  // };

  const [updateRole,setUpdateRole]=useState({username:"",role:""})

  const handleConfirm = () => {
    console.log(updateRole)
    //อันนี้ไม่ได้ใช้เพราะไม่ได้มีปุ่มกดยืนยัน
    // try {
    //   // กรองข้อมูลที่มีการเปลี่ยนแปลงเท่านั้น
    //   const updatedResults = results.filter(row => row.selectedRole !== undefined);

    //   // ตรวจสอบว่ามีข้อมูลที่ถูกเปลี่ยนแปลงหรือไม่
    //   if (updatedResults.length === 0) {
    //     console.log("ไม่มีการเปลี่ยนแปลง role");
    //     return;
    //   }

    //   await axios.post("http://localhost:5000/updateRole", { results: updatedResults });
    //   console.log("ส่งข้อมูลสำเร็จ");
    //   // ตั้งค่าเริ่มต้นใหม่หลังจากส่งข้อมูล
    //   setResults([]);
    // } catch (error) {
    //   console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
    // }
  };



  return (
    <div className="allbox">
      <div className="header">
        <img src={logo} className="imglogo" alt="logo"></img>
        <div className="kubar">
          <div>
            <div className="thai_ku">
              มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </div>
            <div className="english_ku">
              Kasetsart university sriracha campus
            </div>
          </div>
          <div>
            <label className="textuser">ชื่อ-นามสกุล</label>
            <label className="textrole">Role</label>
            <label className="textsetRole">Change</label>
          </div>
          <div />
        </div>
        <div className="menu_bar">
          <div className="home_button" onClick={() => navigate(-1)}>sign in</div>
          <div className="sign-in" onClick={goHome}>หน้าหลัก</div>
        </div>
      </div>

      <div className="whitebox">
        <div className="searchRole">
          <SearchBar setResults={setResults} />
        </div>
        <div>
          <SearchResultsListRole results={results} setUpdateRole={setUpdateRole} handleConfirm={handleConfirm} />
          
        </div>
      </div>
      {/* <div className="submit_button" onClick={handleConfirm}>ยืนยัน</div> */}
    </div>
  );
}

export default Role;