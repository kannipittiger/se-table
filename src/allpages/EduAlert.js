import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/EduAlert.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

function EduAlert() {
  const [temps, setTemp] = useState([]);
  const [subject, setSubject] = useState([]);
  const [data, setData] = useState([]);
  const [dataSubject_table, setDataSubject_table] = useState([]);
  const [dataTime_table, setDataTime_table] = useState([]);
  const navigate = useNavigate();
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toLocaleString();
  const goScheEdu = () => {
    navigate("/ScheEdu");
  };
  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchData();
    fetchTable_subject();
    fetchTime_table();
  }, []); // ทำการโหลดข้อมูลเมื่อคอมโพเนนต์ถูกโหลดครั้งแรกเท่านั้น

  console.log(data);

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/overlap");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTable_subject = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/table_subject_edu");
      setDataSubject_table(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTime_table = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/table_time_edualert");
      setDataTime_table(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const Yuenyan = () => {
    for (let i = 0; i < temps.length; i++) {
      const notied = "วิชา " + temps[i].subject_name + " ถูกลบ";
      console.log(temps[i]);
      const id = temps[i].id;

      const name = temps[i].user_email;
      const response = Axios.delete(`http://localhost:5000/del_alert/${id}`);
      Axios.post(`http://localhost:5000/sendnoti`, {
        user_email: name, // นี่คือส่วนที่ส่ง email ไปยังเซิร์ฟเวอร์
        noti: notied,
        noti_time: currentDateTimeString,
      });
    }
  };


  const Checkfilter = () => {
    if (dataTime_table.length === 0) {
      Post_timetable();
      goScheEdu();
      
    }

    else {
      console.log(dataTime_table)
      console.log(dataSubject_table)

      for (let i = 0; i <= dataTime_table.length - 1; i++) {
        for (let j = 0; j <= dataSubject_table.length - 1; j++) {
          const Time = dataTime_table[i];
          const SubJ = dataSubject_table[j];
          console.log(Time, SubJ)
          if (
            Time.user_id === SubJ.user_id &&
            Time.user_name === SubJ.user_name &&
            Time.user_email === SubJ.user_email &&
            Time.subject_id === SubJ.subject_id &&
            Time.subject_name === SubJ.subject_name &&
            Time.subject_year === SubJ.subject_year &&
            Time.subject_sec === SubJ.subject_sec &&
            Time.subject_major === SubJ.subject_major &&
            Time.subject_credit === SubJ.subject_credit &&
            Time.subject_no === SubJ.subject_no &&
            Time.subject_required === SubJ.subject_required &&
            Time.subject_day === SubJ.subject_day &&
            Time.subject_start === SubJ.subject_start &&
            Time.subject_end === SubJ.subject_end
          ) {
            console.log('ไม่ได้')
            goScheEdu();

          }
          else {
            Axios.post("http://localhost:5000/time_table", {
              user_id: SubJ.user_id,
              user_name: SubJ.user_name,
              user_email: SubJ.user_email,
              subject_id: SubJ.subject_id,
              subject_name: SubJ.subject_name,
              subject_year: SubJ.subject_year,
              subject_sec: SubJ.subject_sec,
              subject_major: SubJ.subject_major,
              subject_credit: SubJ.subject_credit,
              subject_no: SubJ.subject_no,
              subject_day: SubJ.subject_day,
              subject_required: SubJ.subject_required,
              subject_start: SubJ.subject_start,
              subject_end: SubJ.subject_end,
              room: SubJ.room,
            })
              .then((response) => {
                console.log(response.data);
                // สามารถเพิ่มโค้ดที่ต้องการให้ทำหลังจากส่งข้อมูลสำเร็จได้ที่นี่
              })
              .catch((error) => {
                console.error(error);
                // สามารถเพิ่มโค้ดที่ต้องการให้ทำเมื่อเกิดข้อผิดพลาดในการส่งข้อมูลได้ที่นี่
              });
              goScheEdu();
          }
        }
      }
    }
  }
  const Post_timetable = () => {

    for (let i = 0; i < dataSubject_table.length; i++) {
      Axios.post("http://localhost:5000/time_table", {
        user_id: dataSubject_table[i].user_id,
        user_name: dataSubject_table[i].user_name,
        user_email: dataSubject_table[i].user_email,
        subject_id: dataSubject_table[i].subject_id,
        subject_name: dataSubject_table[i].subject_name,
        subject_year: dataSubject_table[i].subject_year,
        subject_sec: dataSubject_table[i].subject_sec,
        subject_major: dataSubject_table[i].subject_major,
        subject_credit: dataSubject_table[i].subject_credit,
        subject_no: dataSubject_table[i].subject_no,
        subject_day: dataSubject_table[i].subject_day,
        subject_required: dataSubject_table[i].subject_required,
        subject_start: dataSubject_table[i].subject_start,
        subject_end: dataSubject_table[i].subject_end,
        room: dataSubject_table[i].room,
      })
        .then((response) => {
          console.log(response.data);
          // สามารถเพิ่มโค้ดที่ต้องการให้ทำหลังจากส่งข้อมูลสำเร็จได้ที่นี่
        })
        .catch((error) => {
          console.error(error);
          // สามารถเพิ่มโค้ดที่ต้องการให้ทำเมื่อเกิดข้อผิดพลาดในการส่งข้อมูลได้ที่นี่
        });
    }

  }

  const LastRana = () => {
    Yuenyan();
    // goScheEdu();
    window.location.reload()
  };


  const handleDelete = (rowIndex, subjectIndex) => {
    // สร้างคัดลอกข้อมูล data
    const updatedData = [...data];
    console.log(updatedData);
    // สร้างคัดลอกข้อมูลแถวที่ต้องการแก้ไข
    const updatedRow = { ...updatedData[rowIndex] };
    console.log(updatedRow);
    // สร้างคัดลอกข้อมูลที่จะถูกลบ
    const deletedSubject = { ...updatedRow.overlap_subjects[subjectIndex] };
    console.log(deletedSubject);
    // ลบข้อมูลใน subjects ที่ตำแหน่ง subjectIndex
    updatedRow.overlap_subjects.splice(subjectIndex, 1);
    console.log(updatedRow);
    // นำข้อมูลที่ถูกลบเก็บไว้ในตัวแปรชั่วคราว
    const temp = { ...deletedSubject };
    console.log(temp);
    // นำข้อมูลแถวที่แก้ไขกลับเข้าไปใน updatedData
    updatedData[rowIndex] = updatedRow;
    console.log(updatedData, "555555555555555555");

    // อัปเดตข้อมูลใหม่
    setData(updatedData);

    // คืนค่าข้อมูลที่ถูกลบ
    setTemp((oldArray) => [...oldArray, temp]);
  };

  console.log(temps);

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
          <div className="scheE" onClick={Checkfilter}>
            จัดห้องเรียน
          </div>
          <div className="homeE" onClick={goHome}>
            หน้าหลัก
          </div>
        </div>
      </div>
      <div className="whiteboxEDU">
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
                    {row.overlap_subjects.map((value, id) => (
                      <div
                        className="renderimport"
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <div className="box_alert_name">
                          {value.subject_name}
                        </div>
                        <div className="box_alert_sec">{value.subject_sec}</div>
                        <div className="box_alert_day">
                          {row.subject_day} {value.subject_start}-
                          {value.subject_end}
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
            {
              data.length === 0 ? (<div className="submitEDUalert" onClick={Checkfilter}>
                ยืนยันไม่มีชน
              </div>) : (<div className="submitEDUalert" onClick={LastRana}>
                ยืนยัน
              </div>)
            }
          </div>
        </div>
        {/* <div className="submitEDUalert">ยืนยัน</div> */}
      </div>
    </div>
  );
}

export default EduAlert;
