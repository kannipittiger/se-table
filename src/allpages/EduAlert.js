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
  const goScheEdu = () => {
    navigate("/ScheEdu");
  };

  useEffect(() => {
    fetchData();
  }, []); // ทำการโหลดข้อมูลเมื่อคอมโพเนนต์ถูกโหลดครั้งแรกเท่านั้น

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/alert");
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
              {/* วนลูปผ่านข้อมูลใน data */}
              {data.map((row, rowIndex) => {
                // สร้างตัวแปรเพื่อเก็บข้อมูลที่มีเวลาเริ่มต้นและสิ้นสุดเหมือนกัน
                const sameTimeData = {};

                // วนลูปผ่านข้อมูลใน subjects
                row.subjects.map((subject, subjectIndex) => {
                  // สร้างคีย์ที่เก็บเวลาเริ่มต้นและสิ้นสุด
                  const timeKey =
                    row.subject_day +
                    " " +
                    row.subject_start +
                    "-" +
                    row.subject_end;

                  // ตรวจสอบว่ามี key นี้ใน sameTimeData หรือไม่
                  if (!sameTimeData[timeKey]) {
                    // ถ้ายังไม่มี ให้สร้าง key ใหม่
                    sameTimeData[timeKey] = {
                      day: row.subject_day, // เก็บวัน
                      start: row.subject_start, // เก็บเวลาเริ่มต้น
                      end: row.subject_end, // เก็บเวลาสิ้นสุด
                      subjects: [], // เก็บรายวิชาในกลุ่มเวลาเดียวกัน
                    };
                  }

                  // เพิ่มรายวิชาลงในกลุ่มเวลาที่เหมือนกัน
                  sameTimeData[timeKey].subjects.push(subject);
                });

                // แสดงผลลัพธ์
                return (
                  <div key={rowIndex} className="renderimport">
                    {/* วนลูปผ่าน sameTimeData เพื่อแสดงข้อมูลในแต่ละกลุ่มเวลา */}
                    {Object.keys(sameTimeData).map((timeKey, index) => (
                      <div key={index}>
                        {/* แสดงวันและเวลาเริ่มต้น-สิ้นสุด */}
                        <div>
                          {sameTimeData[timeKey].day}{" "}
                          {sameTimeData[timeKey].start}-
                          {sameTimeData[timeKey].end}
                        </div>
                        {/* วนลูปผ่านรายวิชาในกลุ่มเวลานี้และแสดงข้อมูล */}
                        {sameTimeData[timeKey].subjects.map(
                          (subject, subjectIndex) => (
                            <div
                              key={subjectIndex}
                              className="box_alert"
                              style={{
                                margin: "5px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div className="box_alert_name">
                                {subject.subject_name}
                              </div>
                              <div className="box_alert_sec">
                                {subject.subject_sec}
                              </div>
                              <div className="box_alert_day">
                                {row.subject_day} {row.subject_start}-
                                {row.subject_end}
                              </div>
                              <div className="box_alert_Email"></div>
                              <div
                                className="box_delete"
                                onClick={() =>
                                  handleDelete(rowIndex, subjectIndex)
                                }
                              >
                                <AiOutlineCloseCircle size={50} color="red" />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ))}
                    {/* เพิ่มการเว้นระยะห่าง */}
                    <div style={{ margin: "10px 0" }}></div>
                  </div>
                );
              })}
            </div>
          )}

          {data.length > 0 && (
            <div className="scroll-scheEdualert2">
              {data.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="renderimport"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {row.subjects.map((subject, subjectIndex) => (
                    <div
                      key={subjectIndex}
                      className="box_alert"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "5px", // เพิ่มระยะห่างระหว่างกล่องแต่ละอัน
                      }}
                    >
                      <div className="box_alert_name">
                        {subject.subject_name}
                      </div>
                      <div className="box_alert_sec">{subject.subject_sec}</div>
                      <div className="box_alert_day">
                        {row.subject_day} {row.subject_start}-{row.subject_end}
                      </div>
                      <div className="box_alert_Email"></div>
                      <div
                        className="box_delete"
                        onClick={() => handleDelete(rowIndex, subjectIndex)}
                      >
                        <AiOutlineCloseCircle size={50} color="red" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="submitEDUalert" onClick={goScheEdu}>
            ยืนยัน
          </div>
        </div>

        {/* <div className="submitEDUalert">ยืนยัน</div> */}
      </div>
    </div>
  );
}

export default EduAlert;
