import React from "react";
import "../allstyles/TableAdmin.css";

function TableAdmin() {
  // สร้างรายการเวลาเรียน
  const timeslots = [];
  for (let hour = 8; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 22 && minute === 30) {
        break; // หยุดการวนลูปเมื่อเจอเวลา 22:30
      }
      let formattedHour = hour < 10 ? `0${hour}` : hour;
      let formattedMinute = minute === 0 ? '00' : minute;
      timeslots.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  // สร้างวันในสัปดาห์
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // ตารางเวลาเรียน
  const schedule = {
    SUN: [
      {
        subject: "03603341-60 Software Enginering ตารางAdmin",
        instructor: "ผู้สอน : กาญจนา เอี่ยมสอาด",
        room: "ห้อง Lab Com 23",
        startTime: "09:00",
        endTime: "12:30"
      },
    ],
    MON: [
      {
        subject: "03603341-60 Software Enginering",
        instructor: "ผู้สอน : กาญจนา เอี่ยมสอาด",
        room: "ห้อง Lab Com 23",
        startTime: "09:00",
        endTime: "12:30"
      },
    ],
    TUE: [
      {
        subject: "03603423-60 Network Programming",
        instructor: "ผู้สอน : นันทา จันทร์พิทักษ์",
        room: "ห้อง Lab Com 23",
        startTime: "09:00",
        endTime: "12:30"
      },
      {
        subject: "03603332-64 Operating Systems",
        instructor: "ผู้สอน : ประสิทธิซัย ณรงค์เลิศฤทธิ์",
        room: "ห้อง DAT",
        startTime: "13:00",
        endTime: "16:30"
      }
    ],
    WED: [
      {
        subject: "Computer Security",
        instructor: "ผู้สอน : นันทา จันทร์พิทักษ์",
        room: "ห้อง Lab Com 23",
        startTime: "13:00",
        endTime: "16:30"
      },
    ],
    THU: [
      {
        subject: "03603323-64 Introduction to Embedded Systems",
        instructor: "ผู้สอน : จิรวัฒน์ จิตประสูตวิทย์",
        room: "ห้อง DAT",
        startTime: "09:00",
        endTime: "12:30"
      },
    ],
    FRI: [
      {
        subject: "03603428-60 Internet of Things",
        instructor: "ผู้สอน : ประวิทย์ ชุมซู",
        room: "ห้อง DAT",
        startTime: "09:00",
        endTime: "12:30"
      },
    ],
    SAT: [
      {
        subject: "03603341-60 Software Enginering",
        instructor: "ผู้สอน : กาญจนา เอี่ยมสอาด",
        room: "ห้อง Lab Com 23",
        startTime: "09:00",
        endTime: "12:30"
      },
    ],
  };
  
  return (
    <div className="allbox">
      <div className="header">
        <div className="kubar">
          <div className="thai_ku">มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา </div>
          <div className="english_ku">Kasetsart university sriracha campus</div>
        </div>
        <div className="menu_bar">
          <div className="profile">Profile</div>
          <div className="sign-In">หน้าหลัก</div>
        </div>
      </div>

      <div className="whitebox">
        <table className="schedule-tableee">
          <thead>
            <tr>
              <th></th>
              {timeslots.map((timeslot, index) => (
                <th key={index}>{timeslot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIndex) => (
              <tr key={dayIndex}>
                <td>{day}</td>
                {timeslots.map((timeslot, timeslotIndex) => {
                  const classInfo = schedule[day]?.find(
                    (slot) => timeslot >= slot.startTime && timeslot < slot.endTime
                  );
                  if (classInfo) {
                    const startTimeIndex = timeslots.indexOf(classInfo.startTime);
                    const endTimeIndex = timeslots.indexOf(classInfo.endTime);
                    if (timeslotIndex === startTimeIndex) {
                      return (
                        <td
                          key={timeslotIndex}
                          className="class-info"
                          colSpan={(endTimeIndex - startTimeIndex)}
                        >
                          <div>{classInfo.subject}</div>
                          <div>{classInfo.instructor}</div>
                          <div>{classInfo.room}</div>
                        </td>
                      );
                    } else {
                      return null;
                    }
                  } else {
                    return <td key={timeslotIndex}></td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableAdmin;
