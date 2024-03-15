import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/ScheEdu.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import axios from "axios";

function ScheEdu() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const [data, setData] = useState([""]);


  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/subject_edu");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Swal = require("sweetalert2");
  //const [results,setResults] = useState([]);
  // const handleChange = (subject_name, event) => {
  //   console.log(data);
//     axios.post("http://localhost:5000/updateRoom", { username: subject_name, room: event.target.value })


//  //อันนี้ส่งข้อมูลไปโดยส่งชื่อกับ role ไปนะอิอิ แค่บรรทัดนี้บรรทัดเดียว
//       .then(response => {
//         // แสดง SweetAlert อันนี้ปุ่ม แค่โชว์ว่าใครเปลี่ยน
//         Swal.fire({
//           icon: 'success',
//           title: 'Room Updated!',
//           text: `Room for ${subject_name} has been set to ${event.target.value}`,
//           confirmButtonText: 'รับทราบ'
//         })
        
        
//       })
      
  // };
  function handleChange(index, subject_name, event) {
    const selectedRoom = event.target.value; // รับค่าห้องเรียนที่ถูกเลือก
    console.log(data);
    // ทำการอัปเดตค่า .room ของแถวที่เกี่ยวข้องในข้อมูล
    const updatedData = data.map((rowData, i) => {
      // ถ้า index ของแถวนี้ตรงกับ index ที่เราส่งเข้ามา
      if (i === index) {
        // คืนค่าแถวที่ถูกอัปเดต .room ใหม่
        return { ...rowData, room: selectedRoom };
      }
      // ไม่เป็นกรณีที่เกี่ยวข้อง คืนค่าแถวเดิม
      return rowData;
    });
  
    // อัปเดตข้อมูลที่ถูกอัปเดตในสถานะหรือทำการ render ใหม่
    // เช่น setState(updatedData) หรือ render(updatedData)
    // ขึ้นอยู่กับโครงสร้างและวิธีการทำงานของแอปพลิเคชันของคุณ
    setData(updatedData);
  }
  
 


  return (
    
    <div className="allbox">
      <div className="header">
        <img src={logo} className="imglogo" alt="logo" />
        <div className="kubar">
          <div className="thai_ku">มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</div>
          <div className="english_ku">Kasetsart University Sriracha Campus</div>
          <div />
        </div>
        <div className="menu_bar">
          <div className="profile">Profile</div>
          <div className="sign-In">หน้าหลัก</div>
        </div>
      </div>
      <div className="whitebox">
        <div className="bxx1sedu">ชื่ออาจารย์</div>
        <div className="bxx2sedu">รหัสวิชา</div>
        <div className="bxx3sedu">ชื่อวิชา</div>
        <div className="bxx4sedu">หน่วยกิต</div>
        <div className="bxx5sedu">หมู่เรียน</div>
        <div className="bxx10sedu">ห้อง</div>
        <div className="bxx6sedu">บังคับ/เลือก</div>
        <div className="bxx7sedu">สาขา</div>
        <div className="bxx8sedu">วันและเวลา</div>
        {data.length > 0 && (

        <div className="scroll-scheEdu">
          {data.map((row, index) => (
            <div key={index} className="renderimport">

              <div className="box_Se_teacher">{row.user_name}</div>
              <div className="box_Se_id">{row.subject_id}</div>
              <div className="box_Se_name">{row.subject_name}</div>
              <div className="box_Se_credit">{row.subject_credit}</div>
              <div className="box_Se_sec">{row.subject_sec}</div>
              <div>
                <select className="box_Se_room" onChange={(event) => handleChange(index, row.room, event)}>
                  <option value="">select</option>
                  <option value="DAT">DAT</option>
                  <option value="labcom1">labcom1</option>
                  <option value="labcom2">labcom2</option>
                  <option value="labcom23">labcom23</option>
                </select>
              </div>
              <div className="box_Se_force_or_not">{row.subject_required}</div>
              <div className="box_Se_major">{row.subject_major}</div>
              <div className="box_Se_day">{row.subject_day}{row.subject_start}{row.subject_end}</div>

            </div>

          ))}
        </div>
      )}
        
        {/* <div className="scroll-scheteacher">
          {selectedSubjects.map((subjectId, index) => (
            <div className="chose" key={index}>
              <div className="box_Se_id">{subjectId}</div>
              <div className="box_Se_name">{subjectId}</div>
              <div className="box_Se_credit">{subjectId}</div>
              <div className="box_Se_sec">{subjectId}</div>
              <div className="box_Se_no">{subjectId}</div>
              <div className="box_Se_force_or_not">{subjectId}</div>
              <div className="box_Se_major">{subjectId}</div>
              <div className="box_Se_day">{subjectId}</div>
            </div>
          ))}
        </div> */}
        <div className="submitEDU">ยืนยัน</div>
        <div className="exportEDU">export</div>
      </div>
    </div>
  );
}
export default ScheEdu;
