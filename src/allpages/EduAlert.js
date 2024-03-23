import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/EduAlert.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

function EduAlert() {
  const [subject, setSubject] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []); // ทำการโหลดข้อมูลเมื่อคอมโพเนนต์ถูกโหลดครั้งแรกเท่านั้น

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/subject_edu");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (index) => {
    const updatedSubject = [...subject];
    updatedSubject.splice(index, 1);
    setSubject(updatedSubject);
  };

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
        <div className="scroll-VIEW1">
          {/* <div className="box1alert">ชื่ออาจารย์</div> */}
          {/* <div className="box2alert">รหัสวิชา</div> */}
          <div className="box3alert">ชื่อวิชา</div>
          {/* <div className="box4alert">หน่วยกิต</div> */}
          <div className="box5alert">หมู่เรียน</div>
          {/* <div className="box10alert">ห้อง</div> */}
          {/* <div className="box6alert">บังคับ/เลือก</div> */}
          {/* <div className="box7alert">สาขา</div> */}
          <div className="box8alert">วันและเวลา</div>
          <div className="box11alert">Email</div>
          {/* <div className="scroll-VIEW1"> */}
          {data.length > 0 && (
            <div className="scroll-scheEdualert">
              {data.map((row, index) => (
                <div key={index} className="renderimport">
                  <div className="box_alert_name">{row.subject_name}</div>
                  <div className="box_alert_None2"></div>
                  <div className="box_alert_sec">{row.subject_sec}</div>
                  <div className="box_alert_None1"></div>
                  <div className="box_alert_day">
                    {row.subject_day} {row.subject_start}-{row.subject_end}
                  </div>
                  <div className="box_alert_Email"></div>
                  <div className="box_delete" onClick={handleDelete}>
                    <AiOutlineCloseCircle size={50} color="red" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.length > 0 && (
            <div className="scroll-scheEdualert2">
              {data.map((row, index) => (
                <div key={index} className="renderimport">
                  <div className="box_alert_name">{row.subject_name}</div>
                  <div className="box_alert_None2"></div>
                  <div className="box_alert_sec">{row.subject_sec}</div>
                  <div className="box_alert_None1"></div>
                  <div className="box_alert_day">
                    {row.subject_day} {row.subject_start}-{row.subject_end}
                  </div>
                  <div className="box_alert_Email"></div>
                  <div className="box_delete" onClick={handleDelete}>
                    <AiOutlineCloseCircle size={50} color="red" />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="submitEDUalert">ยืนยัน</div>
        </div>

        {/* <div className="submitEDUalert">ยืนยัน</div> */}
      </div>
    </div>
  );
}

export default EduAlert;
