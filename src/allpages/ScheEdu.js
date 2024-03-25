import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/ScheEdu.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
import TableEdu from "./TableEdu";
import exportToExcel from "./exportToExcel";


function ScheEdu() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const [data, setData] = useState([""]);


  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/table_subject_edu");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
  function handleChange(index, subject_id, event) {
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

  const postEdu = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].room !== "-") {
        console.log(data, "5555555555555555555")
        console.log(data[i].subject_sec, data[i].room)
        Axios.post("http://localhost:5000/updateRoom", {
          subject_id: data[i].subject_id,
          room: data[i].room,
          subject_year: data[i].subject_year,
          subject_sec: data[i].subject_sec,
          subject_day: data[i].subject_day,
          subject_start: data[i].subject_start,
          subject_end: data[i].subject_end,
        })
          .then((response) => {
            console.log(response.data);
            // สามารถเพิ่มโค้ดที่ต้องการให้ทำหลังจากส่งข้อมูลสำเร็จได้ที่นี่
          })
          .catch((error) => {
            console.error(error);
            // สามารถเพิ่มโค้ดที่ต้องการให้ทำเมื่อเกิดข้อผิดพลาดในการส่งข้อมูลได้ที่นี่
          });


          //เพิ่มเข้าไปที่ DB ใหม่ time_table
          Axios.post("http://localhost:5000/time_table", {
            user_id: data[i].user_id,
            user_name: data[i].user_name,
            user_email: data[i].user_email,
            subject_id: data[i].subject_id,
            subject_name: data[i].subject_name,
            subject_year: data[i].subject_year,
            subject_id: data[i].subject_id,
            subject_sec: data[i].subject_sec,
            subject_major: data[i].subject_major,
            subject_credit: data[i].subject_credit,
            subject_no: data[i].subject_no,
            subject_day:data[i].subject_day,
            subject_required: data[i].subject_required,
            subject_start: data[i].subject_start,
            subject_end: data[i].subject_end,
            room: data[i].room,
          })
          .then((response) => {
            console.log(response.data);
            // สามารถเพิ่มโค้ดที่ต้องการให้ทำหลังจากส่งข้อมูลสำเร็จได้ที่นี่
          })
          .catch((error) => {
            console.error(error);
            // สามารถเพิ่มโค้ดที่ต้องการให้ทำเมื่อเกิดข้อผิดพลาดในการส่งข้อมูลได้ที่นี่
          });


          //ลบข้อมูลตัวที่เพิ่ม room ไป
          console.log(data[i].id);
          const id = data[i].id;
          const response = Axios.delete(`http://localhost:5000/time_table_delete/${id}`);
      }

    }
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



      <div className="boxspace">
        <TableEdu />
      </div>
      <div className="jamesHandsome">

        <div className="jamesSoHandsome">
          <div className="bxx1sedu">ชื่ออาจารย์</div>
          <div className="bxx2sedu">รหัสวิชา</div>
          <div className="bxx3sedu">ชื่อวิชา</div>
          <div className="bxx4sedu">หน่วยกิต</div>
          <div className="bxx5sedu">หมู่เรียน</div>
          <div className="bxx10sedu">ห้อง</div>
          <div className="bxx6sedu">บังคับ/เลือก</div>
          <div className="bxx7sedu">สาขา</div>
          <div className="bxx8sedu">วันและเวลา</div>
        </div>

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
                    <option value="">{row.room}</option>
                    <option value="DAT">DAT</option>
                    <option value="LABCOM1">LABCOM 1</option>
                    <option value="LABCOM2">LABCOM 2</option>
                    <option value="LABCOM23">LABCOM 23</option>
                  </select>
                </div>
                <div className="box_Se_force_or_not">{row.subject_required === 1 ? "บังคับ" : "เสรี"}</div>

                <div className="box_Se_major">{row.subject_major}</div>
                <div className="box_Se_day">{row.subject_day} {row.subject_start}-{row.subject_end}</div>

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
        <div className="submitEDU" onClick={postEdu}>ยืนยัน</div>
        <div className="exportEDU" onClick={() => exportToExcel(data)}> export</div>
      </div>
    </div>
  );
}
export default ScheEdu;
