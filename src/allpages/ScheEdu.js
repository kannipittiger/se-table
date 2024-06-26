import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/ScheEdu.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
import TableForScheEdu from "./TableForScheEdu";
import TableEdu from "./TableEdu";
import exportToExcel from "./exportToExcel";
import { TiArrowBack } from "react-icons/ti";

function ScheEdu() {
  let selectedDay;
  let selectedTime;
  const [subject, setSubject] = useState([]);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goScheEdu = () => {
    navigate("/edu");
  };
  const goEdualert = () => {
    navigate("/edualert");
  };

  const [data, setData] = useState([""]);

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:5000/table_subject_edu"
      );
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
  const handleChangeRoom = (index, room, event) => {
    // Check if the event object and its target property exist
    if (event && event.target && event.target.value) {
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

      // โพสต์ข้อมูลไปยังฐานข้อมูล
      Axios.post("http://localhost:5000/updateRoom", {
        subject_id: updatedData[index].subject_id,
        room: selectedRoom,
        subject_year: updatedData[index].subject_year,
        subject_sec: updatedData[index].subject_sec,
        subject_day: updatedData[index].subject_day,
        subject_start: updatedData[index].subject_start,
        subject_end: updatedData[index].subject_end,
      })
        .then((response) => {
          window.location.reload();
          console.log(response.data);
          // สามารถเพิ่มโค้ดที่ต้องการให้ทำหลังจากส่งข้อมูลสำเร็จได้ที่นี่
        })
        .catch((error) => {
          console.error(error);
          // สามารถเพิ่มโค้ดที่ต้องการให้ทำเมื่อเกิดข้อผิดพลาดในการส่งข้อมูลได้ที่นี่
        });
    } else {
      console.error(
        "Event object or its target property is undefined or null."
      );
    }
  };

  // const handleChangeTime = (index, event) => {
  //   const selectedValue = event.target.value;
  //   // ตรวจสอบว่าอ็อบเจ็กต์เหตุการณ์และคุณสมบัติเป้าหมายของมันมีอยู่หรือไม่
  //   if (event && event.target && event.target.value) {
  //     const selectedRoom = event.target.value; // รับค่าห้องเรียนที่ถูกเลือก

  //     // ทำการอัปเดตค่า .room ของแถวที่เกี่ยวข้องในข้อมูล
  //     const updatedData = data.map((rowData, i) => {
  //       // ถ้า index ของแถวนี้ตรงกับ index ที่เราส่งเข้ามา
  //       if (i === index) {
  //         // คืนค่าแถวที่ถูกอัปเดต .room ใหม่
  //         return { ...rowData, room: selectedRoom };
  //       }
  //       // ไม่เป็นกรณีที่เกี่ยวข้อง คืนค่าแถวเดิม
  //       return rowData;
  //     });

  //     // อัปเดตข้อมูลที่ถูกอัปเดตในสถานะหรือทำการ render ใหม่
  //     // เช่น setState(updatedData) หรือ render(updatedData)
  //     // ขึ้นอยู่กับโครงสร้างและวิธีการทำงานของแอปพลิเคชันของคุณ
  //     setData(updatedData);

  //     // โพสต์ข้อมูลไปยังฐานข้อมูล
  //     Axios.post("http://localhost:5000/updateTime", {
  //       subject_id: updatedData[index].subject_id,
  //       room: selectedRoom,
  //       subject_year: updatedData[index].subject_year,
  //       subject_sec: updatedData[index].subject_sec,
  //       subject_day: updatedData[index].subject_day,
  //       subject_start: updatedData[index].subject_start,
  //       subject_end: updatedData[index].subject_end,
  //     })
  //       .then((response) => {
  //         console.log(response.data);
  //         // สามารถเพิ่มโค้ดที่ต้องการให้ทำหลังจากส่งข้อมูลสำเร็จได้ที่นี่
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         // สามารถเพิ่มโค้ดที่ต้องการให้ทำเมื่อเกิดข้อผิดพลาดในการส่งข้อมูลได้ที่นี่
  //       });
  //   } else {
  //     console.error("Event object or its target property is undefined or null.");
  //   }
  //};

  const handleChangeTime = (index, selectedTime, selectedDay) => {
    console.log(index);
    console.log(selectedTime, selectedDay, "5555555555555555555");
    console.log(data[index].subject_day, data[index].subject_start);
    Axios.post("http://localhost:5000/updateTime", {
      subject_id: data[index].subject_id,
      room: data[index].room,
      subject_year: data[index].subject_year,
      subject_sec: data[index].subject_sec,
      subject_day: selectedDay,
      subject_start: selectedTime[0],
      subject_end: selectedTime[1],
    })
      .then((response) => {
        window.location.reload();
        console.log(response.data);
        // สามารถเพิ่มโค้ดที่ต้องการให้ทำหลังจากส่งข้อมูลสำเร็จได้ที่นี่
      })
      .catch((error) => {
        console.error(error);
        // สามารถเพิ่มโค้ดที่ต้องการให้ทำเมื่อเกิดข้อผิดพลาดในการส่งข้อมูลได้ที่นี่
      });
  };

  const postEdu = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].room !== "-") {
        console.log(data, "5555555555555555555");
        console.log(data[i].subject_sec, data[i].room);
        Axios.post("http://localhost:5000/updateTime_table", {
          subject_id: data[i].subject_id,
          room: data[i].room,
          subject_year: data[i].subject_year,
          subject_sec: data[i].subject_sec,
          subject_day: data[i].subject_day,
          subject_start: data[i].subject_start,
          subject_end: data[i].subject_end,
        })
          .then((response) => {
            if (response.status === 200) {
              // SweetAlert เมื่อสำเร็จ
              Swal.fire({
                title: "Success!",
                text: "ดำเนินการเสร็จสิ้น",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                // พักเวลา 1 วินาทีแล้วรีโหลดหน้า
                setTimeout(() => {
                  window.location.reload(); // รีโหลดหน้าเพื่อแสดงข้อมูลที่อัปเดตแล้ว
                }, 1500);
              });
            } else {
              // SweetAlert เมื่อเกิดข้อผิดพลาด
              Swal.fire({
                title: "Error!",
                text: "มีข้อผิดพลาดเกิดขึ้น",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };
  //#####=====POOM======================

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  const [day, setDay] = useState("");
  const [times, setTimes] = useState([]);

  const handleDayChange = async (index) => {
    const { value } = await Swal.fire({
      title: "เปลี่ยนแปลงวัน",
      input: "select",
      inputOptions: {
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
        Sun: "Sunday",
      },
      inputPlaceholder: "เลือกวันที่จะสอน",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // สีปุ่ม Confirm
      cancelButtonColor: "#d33", // สีปุ่ม Cancel
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",

      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== "") {
            selectedDay = value; // set selectedDay เป็นค่าที่ถูกเลือก
            resolve();
          } else {
            resolve("Please select a day.");
          }
        });
      },
    });

    if (value) {
      const { value: times } = await Swal.fire({
        title: "เลือกช่วงเวลา",
        html:
          '<label for="start-time">เวลาเริ่มต้น:</label>' +
          '<select id="start-time" class="swal2-select">' +
          '<option value="08.00">08.00</option>' +
          '<option value="08.30">08.30</option>' +
          '<option value="09.00">09.00</option>' +
          '<option value="09.30">09.30</option>' +
          '<option value="10.00">10.00</option>' +
          '<option value="10.30">10.30</option>' +
          '<option value="11.00">11.00</option>' +
          '<option value="11.30">11.30</option>' +
          '<option value="12.00">12.00</option>' +
          '<option value="12.30">12.30</option>' +
          '<option value="13.00">13.00</option>' +
          '<option value="13.30">13.30</option>' +
          '<option value="14.00">14.00</option>' +
          '<option value="14.30">14.30</option>' +
          '<option value="15.00">15.00</option>' +
          '<option value="15.30">15.30</option>' +
          '<option value="16.00">16.00</option>' +
          '<option value="16.30">16.30</option>' +
          '<option value="17.00">17.00</option>' +
          '<option value="17.30">17.30</option>' +
          '<option value="18.00">18.00</option>' +
          '<option value="18.30">18.30</option>' +
          '<option value="19.00">19.00</option>' +
          '<option value="19.30">19.30</option>' +
          '<option value="20.00">20.00</option>' +
          '<option value="20.30">20.30</option>' +
          '<option value="21.00">21.00</option>' +
          '<option value="21.30">21.30</option>' +
          // รายการเวลาอื่น ๆ ที่ต้องการให้ผู้ใช้เลือก
          "</select>" +
          "<br>" +
          '<label for="end-time">เวลาสิ้นสุด:</label>' +
          '<select id="end-time" class="swal2-select">' +
          '<option value="08.00">08.00</option>' +
          '<option value="08.30">08.30</option>' +
          '<option value="09.00">09.00</option>' +
          '<option value="09.30">09.30</option>' +
          '<option value="10.00">10.00</option>' +
          '<option value="10.30">10.30</option>' +
          '<option value="11.00">11.00</option>' +
          '<option value="11.30">11.30</option>' +
          '<option value="12.00">12.00</option>' +
          '<option value="12.30">12.30</option>' +
          '<option value="13.00">13.00</option>' +
          '<option value="13.30">13.30</option>' +
          '<option value="14.00">14.00</option>' +
          '<option value="14.30">14.30</option>' +
          '<option value="15.00">15.00</option>' +
          '<option value="15.30">15.30</option>' +
          '<option value="16.00">16.00</option>' +
          '<option value="16.30">16.30</option>' +
          '<option value="17.00">17.00</option>' +
          '<option value="17.30">17.30</option>' +
          '<option value="18.00">18.00</option>' +
          '<option value="18.30">18.30</option>' +
          '<option value="19.00">19.00</option>' +
          '<option value="19.30">19.30</option>' +
          '<option value="20.00">20.00</option>' +
          '<option value="20.30">20.30</option>' +
          '<option value="21.00">21.00</option>' +
          '<option value="21.30">21.30</option>' +
          // รายการเวลาอื่น ๆ ที่ต้องการให้ผู้ใช้เลือก
          "</select>",
        focusConfirm: false,
        preConfirm: () => {
          const startTime = document.getElementById("start-time").value;
          const endTime = document.getElementById("end-time").value;

          if (startTime >= endTime) {
            Swal.showValidationMessage("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น");
            return false;
          }

          selectedTime = [startTime, endTime]; // set selectedTime เป็นค่าที่ถูกเลือก

          return selectedTime;
        },
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (value) {
            return Promise.resolve();
          } else {
            return Promise.reject("โปรดเลือกเวลาเริ่มต้นและเวลาสิ้นสุด");
          }
        },
      });
      if (selectedDay && selectedTime) {
        const updatedData = data.map((rowData, i) => {
          if (i === index) {
            return {
              ...rowData,
              subject_day: selectedDay, // อัปเดตวันที่ใหม่
              subject_start: selectedTime[0], // อัปเดตเวลาเริ่มต้นใหม่
              subject_end: selectedTime[1], // อัปเดตเวลาสิ้นสุดใหม่
            };
          }

          return rowData;
        });
        handleChangeTime(index, selectedTime, selectedDay);
        setData(updatedData); // อัปเดตค่าของ data ใหม่
      }
    }
  };

  const setTime = () => {};

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
          <div className="profileI" onClick={goScheEdu}>
            Profile
          </div>
          <div className="homeI" onClick={goHome}>
            หน้าหลัก
          </div>
        </div>
      </div>
      <div class="BacktoEdualert" onClick={goEdualert}></div>

      <div className="boxspace">
        <TableForScheEdu />
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
                  <select
                    className="box_Se_room"
                    onChange={(event) =>
                      handleChangeRoom(index, row.room, event)
                    }
                  >
                    <option value="" disabled selected>
                      {row.room}
                    </option>
                    <option value="DAT">DAT</option>
                    <option value="LABCOM1">LABCOM 1</option>
                    <option value="LABCOM2">LABCOM 2</option>
                    <option value="LABCOM23">LABCOM 23</option>
                  </select>
                </div>
                <div className="box_Se_force_or_not">
                  {row.subject_required === 1 ? "บังคับ" : "เสรี"}
                </div>

                <div className="box_Se_major">{row.subject_major}</div>
                <div
                  className="box_Se_day"
                  onClick={() => handleDayChange(index)}
                >
                  {row.subject_day} {row.subject_start} - {row.subject_end}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="submitEDU" onClick={postEdu}>
          ยืนยัน
        </div>
      </div>
    </div>
  );
}
export default ScheEdu;
