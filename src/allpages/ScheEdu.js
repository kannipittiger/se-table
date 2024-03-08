import React from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/ScheEdu.css";
import { useNavigate } from "react-router-dom";

function ScheEdu() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
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
        <div className="bxx2sedu">รหัสวิชา</div>
        <div className="bxx3sedu">ชื่อวิชา</div>
        <div className="bxx4sedu">หน่วยกิต</div>
        <div className="bxx5sedu">หมู่เรียน</div>
        <div className="bxx7sedu">บังคับ/เลือก</div>
        <div className="bxx8sedu">สาขา</div>
        <div className="bxx9sedu">วันและเวลา</div>
        <div className="scroll-scheteacher"></div>
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
