import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/chatedu.css";
import axios from "axios";
import Swal from 'sweetalert2';

function Chatedu() {

  const [notes, setNotes] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [emailed, setEmail] = useState([]);


  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getnote");
      setNotes(response.data); // ตั้งค่าข้อมูลที่ดึงมาให้กับ state
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotes();
    }, 1000); // รีเฟรชข้อมูลทุก 1 นาที

    return () => clearInterval(interval);
  }, []);

  const showFullNote = (note) => {
    Swal.fire({
      title: 'รายละเอียด',
      html: note.note,
      confirmButtonText: 'OK',
    });
  };

  const handleToggle = (note) => {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[note.note_id] = !newCheckedItems[note.note_id];
    setCheckedItems(newCheckedItems);
    console.log(newCheckedItems);


    const newEmail = { ...emailed };
    newEmail[note.user_email] = true;
    setEmail(newEmail);
    console.log(newEmail);

  };

  const handleUnsuccess = async (checkedItems, emailed) => {
    try {
      // ดึงไอดีของรายการที่มีสถานะ toggle เป็น true
      const idsToDelete = Object.keys(checkedItems).filter(id => checkedItems[id]);
      const postEmail = Object.keys(emailed).filter(name => emailed[name]);
      const idsToDeleteInt = idsToDelete.map(id => parseInt(id));
      console.log(idsToDeleteInt);
      // ส่ง request ไปที่ endpoint สำหรับลบโน้ตที่ถูกเลือก
      await Promise.all(idsToDeleteInt.map(async (id) => {
        console.log(id);
        const response = await axios.delete(`http://localhost:5000/deletenote/${id}`);
        if (response.status !== 200) {
          throw new Error(`Error deleting note: ${response.statusText}`);
        }
        await Promise.all(postEmail.map(async (name) => {
          console.log(name);
          const notied = 'คำร้องไม่สำเร็จ'
          await axios.post(`http://localhost:5000/sendnoti`, {
            user_email: name, // นี่คือส่วนที่ส่ง email ไปยังเซิร์ฟเวอร์
            noti: notied
          })
        }
        ));
      }
      ));

      // หลังจากที่ลบสำเร็จ ให้รีเฟรชรายการโน้ต
      fetchNotes();

      // ล้างสถานะการเลือกทั้งหมดหลังจากที่ลบแล้ว
      setCheckedItems({});
    } catch (error) {
      console.error("Error deleting notes:", error);
    }


  };

  const handleSuccess = async (checkedItems, emailed) => {
    try {
      // ดึงไอดีของรายการที่มีสถานะ toggle เป็น true
      const idsToDelete = Object.keys(checkedItems).filter(id => checkedItems[id]);
      const postEmail = Object.keys(emailed).filter(name => emailed[name]);


      const idsToDeleteInt = idsToDelete.map(id => parseInt(id));
      console.log(idsToDeleteInt);
      // ส่ง request ไปที่ endpoint สำหรับลบโน้ตที่ถูกเลือก
      await Promise.all(idsToDeleteInt.map(async (id) => {
        console.log(id);
        const response = await axios.delete(`http://localhost:5000/deletenote/${id}`);
        if (response.status !== 200) {
          throw new Error(`Error deleting note: ${response.statusText}`);
        }
        await Promise.all(postEmail.map(async (name) => {
          console.log(name);
          const notied = 'คำร้องสำเร็จ'
          await axios.post(`http://localhost:5000/sendnoti`, {
            user_email: name, // นี่คือส่วนที่ส่ง email ไปยังเซิร์ฟเวอร์
            noti: notied
          })
        }
        ));
      }

      ));

      // หลังจากที่ลบสำเร็จ ให้รีเฟรชรายการโน้ต
      fetchNotes();

      // ล้างสถานะการเลือกทั้งหมดหลังจากที่ลบแล้ว
      setCheckedItems({});
    } catch (error) {
      console.error("Error deleting notes:", error);
    }


  };

  const handleConfirm = async (checkedItems, emailed, note) => {

    try {
      const idsToDelete = Object.keys(checkedItems).filter(id => checkedItems[id]);
      const idsToDeleteInt = idsToDelete.map(id => parseInt(id));
      console.log(idsToDeleteInt);
      // ดึงไอดีของรายการที่มีสถานะ toggle เป็น true
      await Promise.all(idsToDeleteInt.map(async (id) => {
        const postEmail = Object.keys(emailed).filter(name => emailed[name]);
        await Promise.all(postEmail.map(async (name) => {
          console.log(name);
          const notied = 'ยื่นยันคำขอ'
          await axios.post(`http://localhost:5000/sendnoti`, {
            user_email: name, // นี่คือส่วนที่ส่ง email ไปยังเซิร์ฟเวอร์
            noti: notied
          });
        }));
      }));

      // หลังจากที่ลบสำเร็จ ให้รีเฟรชรายการโน้ต
      fetchNotes();

      // ล้างสถานะการเลือกทั้งหมดหลังจากที่ลบแล้ว
      setCheckedItems({});
    } catch (error) {
      console.error("Error deleting notes:", error);
    }
  };

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
          </div>
          <div />
        </div>
        <div className="menu_bar">
          <div className="home_button">sign in</div>
          <div className="sign-in">หน้าหลัก</div>
        </div>
      </div>
      <div className="whitebox">
        {notes.length > 0 && (
          <div className="notesScroll">
            {notes.map((note, index) => (
              <div key={index} className="chatNote">
                <div
                  id="check"
                  onClick={() => handleToggle(note)} // เรียกใช้ฟังก์ชัน handleToggle และส่ง index เข้าไป
                  style={{ backgroundColor: checkedItems[note.note_id] ? "green" : "" }} // ตรวจสอบสถานะของการติ๊กของรายการนี้
                ></div>
                <div id="noted">
                  <div id="noteDate">
                    {note.note_time}
                  </div>
                  <div id="noteUser">
                    {note.user_name}
                  </div>
                  <div id="noteEmail">
                    {note.user_email}
                  </div>

                  <div id="noteNotes" onClick={() => showFullNote(note)} >
                    {note.note}
                  </div>
                </div>
                <div className="chat9" onClick={() => handleUnsuccess(checkedItems, emailed)}>ไม่สำเร็จ</div>
                <div className="chat10" onClick={() => handleSuccess(checkedItems, emailed)}>สำเร็จ</div>
                <div className="chat11" onClick={() => handleConfirm(checkedItems, emailed, note)}>
                  ยื่นยันคำร้อง
                </div>

              </div>

            ))}

          </div>

        )}

        {/* <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        <div className="circle4"></div>
        <div className="circle5"></div>
        <div className="circle6"></div>
        <div className="circle7"></div> */}
        <div className="textยื่นคำร้อง">ระบบยื่นยันคำร้อง</div>
        <div className="textวันเวลา">วันเวลา</div>
        <div className="textชื่ออาจารย์">ชื่ออาจารย์</div>
        <div className="textEmail">Email</div>
        <div className="textรายละเอียด">รายละเอียด</div>
        {/* {data.length > 0 && (
          <div class=" scroll">
            {data.map((row, index) => (
              <div key={index} className="renderchat">
                <div
                  id="ยื่นคำร้อง"
                  // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >
                  {row.id}
                </div>
                <div
                  id="วันเวลา"
                  // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >
                  {row.name}
                </div>
                <div
                  id="ชื่ออาจารย์"
                  // style={{ flex: 6, border: "2px solid black", margin: "2px" }}
                >
                  {row.รายละเอียด}
                </div>
                <div
                  id="boxบังคับ"
                  // style={{ flex: 5, border: "2px solid black", margin: "2px" }}
                >
                  {required(row)}
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Chatedu;
