import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../allstyles/englogo.png";
import { useNavigate } from "react-router-dom";
import "../allstyles/role.css";
import { SearchBar } from "../searchRole/SearchBar";
import { SearchResultsListRole } from "../searchRole/SearchResultsListRole";
import { RiAddLine } from "react-icons/ri";

function Role() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goAdmin = () => {
    navigate("/admin");
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

  const handleAddUser = () => {
    Swal.fire({
      title: "Add User",
      html: `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <input id="FullName" class="swal2-input1" placeholder="FullName">
          <input id="email" class="swal2-input2" placeholder="Email">
          <select id="role" class="swal2-input3" placeholder="Role">
            <option value="-" selected >Select Role</option>
            <option value="Teacher">Teacher</option>
            <option value="Education">Education</option>
            <option value="Admin">Admin</option>
          </select>
        </div>`,
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const fullname = Swal.getPopup().querySelector("#FullName").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const role = Swal.getPopup().querySelector("#role").value;
        if (!email || !role || !fullname) {
          Swal.showValidationMessage("usernameEmail and role are required");
        }
        return { fullname,email, role };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Email:", result.value.email);
        console.log("Role:", result.value.role);
        axios.post("http://localhost:5000/addUser", {
          username: result.value.fullname,
          email:result.value.email,
          role: result.value.role,
        })
          .then((response) => {
            console.log(response.data);
            // สามารถเพิ่มโค้ดที่ต้องการให้ทำหลังจากส่งข้อมูลสำเร็จได้ที่นี่
          })
          .catch((error) => {
            console.error(error);
            // สามารถเพิ่มโค้ดที่ต้องการให้ทำเมื่อเกิดข้อผิดพลาดในการส่งมู
          });
      }
    });
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
              Kasetsart University Sriracha Campus
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
          <div className="home-buttonR" onClick={goAdmin}>
            Profile
          </div>
          <div className="sign-inR" onClick={goHome}>
            หน้าหลัก
          </div>
        </div>
      </div>

      <div className="whitebox">
        <AddUserBox onClick={handleAddUser} />
        <div className="searchRole">
          <SearchBar setResults={setResults} />
        </div>
        <div>
          <SearchResultsListRole results={results} />
        </div>
      </div>
    </div>
  );
}

function AddUserBox({ onClick }) {
  return (
    <div className="box_adduser" onClick={onClick}>
      <RiAddLine size={24} style={{ marginRight: "10px" }} />
      Add Users
    </div>
  );
}

export default Role;
