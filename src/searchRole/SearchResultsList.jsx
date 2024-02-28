import "./SearchRoleResultsList.css";
import "../allstyles/role.css";
//import { SearchResult } from "./SearchResult";
import axios from "axios";
import React from 'react';


export const SearchResultsList = ({ results, handleConfirm,setUpdateRole }) => {
  
  const Swal = require("sweetalert2");
  const handleChange = (username1, event) => {
    axios.post("http://localhost:5000/updateRole", { username: username1, role: event.target.value }) //อันนี้ส่งข้อมูลไปโดยส่งชื่อกับ role ไปนะอิอิ แค่บรรทัดนี้บรรทัดเดียว
      .then(response => {
        // แสดง SweetAlert อันนี้ปุ่ม แค่โชว์ว่าใครเปลี่ยน
        Swal.fire({
          icon: 'success',
          title: 'Role Updated!',
          text: `Role for ${username1} has been changed to ${event.target.value}`,
          confirmButtonText: 'รับทราบ'
        }).then(() => {
          window.location.reload(); // รีเฟรชหน้า
        });
        
        
      })
      
  };
  

  return (

    
    <div className="resultslist">
      {results.map((row, index) => (
        <div key={index} className="renderimport">
          <div id="boxname">{row.user_name}</div>
          <div id="boxshowrole">{row.user_role}</div>
          <div>
            <select id="boxrole"  onChange={(event) => handleChange( row.user_name,event)}>
              <option value="">Select</option>
              <option value="Teacher">Teacher</option>
              <option value="Education">Education</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
        </div>
      ))}
      
    </div>
  );
};