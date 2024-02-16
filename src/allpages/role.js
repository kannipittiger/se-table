import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import Axios from "axios";
>>>>>>> f6408b68b54f053e7a1cfb2385194be0825e0728
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

<<<<<<< HEAD
  useEffect(() => {
    Axios.get(`http://localhost:5000/role`).then((response) => {
      setData(response.data);
      console.log(response.data);
      console.log(data);
    });
  }, []);

  console.log(data,'new');
=======
  const [data, setData] = useState([""]);

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

  console.log(data, "test");




>>>>>>> f6408b68b54f053e7a1cfb2385194be0825e0728

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
          </div >
          <div>
          <label className="textuser">ชื่อ-นามสกุล</label>
          <label className="textrole">Role</label>

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
        {data.length > 0 && (
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
                  
                  // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >
                <select id="boxrole">
                <option>{row.user_role}</option>
                <option>อาจารย์</option>
                <option>ฝ่ายการศึกษา</option>
                <option>ผู้ดูแลระบบ</option>
                </select>
               
                </div>

              </div>

            ))}
          </div>
        )}


      </div>
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

