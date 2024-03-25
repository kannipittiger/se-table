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

  console.log(data);

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/alert");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (rowIndex, subjectIndex) => {
    // สร้างคัดลอกข้อมูล data
    const updatedData = [...data];

    // สร้างคัดลอกข้อมูลแถวที่ต้องการแก้ไข
    const updatedRow = { ...updatedData[rowIndex] };

    // สร้างคัดลอกข้อมูลที่จะถูกลบ
    const deletedSubject = { ...updatedRow.subjects[subjectIndex] };

    // ลบข้อมูลใน subjects ที่ตำแหน่ง subjectIndex
    updatedRow.subjects.splice(subjectIndex, 1);

    // นำข้อมูลที่ถูกลบเก็บไว้ในตัวแปรชั่วคราว
    const temp = { ...deletedSubject };

    // นำข้อมูลแถวที่แก้ไขกลับเข้าไปใน updatedData
    updatedData[rowIndex] = updatedRow;

    // อัปเดตข้อมูลใหม่
    setData(updatedData);

    // คืนค่าข้อมูลที่ถูกลบ
    return temp;
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
        <div className="BOX_TOTAL">
          <label className="Text_alert">เช็ควิชาชน</label>
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
                  <div className="BOXchon">
                    <marquee
                      style={{
                        position: "sticky",
                        backgroundColor: "gray",
                        color: "white",
                        marginTop: "0", // เพิ่ม margin ด้านบน
                        marginBottom: "10px",
                      }}
                    >
                      <strong>
                        {row.subject_day} {row.subject_start}-{row.subject_end}
                      </strong>
                    </marquee>
                    {row.subjects.map((value, id) => (
                      <div
                        className="renderimport"
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <div className="box_alert_name">
                          {value.subject_name}
                        </div>
                        <div className="box_alert_sec">{value.subject_sec}</div>
                        <div className="box_alert_day">
                          {row.subject_day} {row.subject_start}-
                          {row.subject_end}
                        </div>
                        <div className="box_alert_Email">
                          {value.user_email}
                        </div>
                        <div
                          className="box_delete"
                          onClick={() => handleDelete(index, id)}
                        >
                          <AiOutlineCloseCircle size={50} color="red" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {/* {data.length > 0 && (
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
                          onClick={() => handleDelete(rowIndex, subjectIndex)}
                        >
                          <AiOutlineCloseCircle size={50} color="red" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )} */}
            <div className="submitEDUalert" onClick={goScheEdu}>
              ยืนยัน
            </div>
          </div>
        </div>
        {/* <div className="submitEDUalert">ยืนยัน</div> */}
      </div>
    </div>
  );
}

export default EduAlert;
