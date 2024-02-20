import React from "react";
import "../allstyles/TableTeacher.css";

function TableTeacher() {
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
        <table className="schedule-table">
          <thead>
            <tr>
              <th></th>
              {timeslots.map((timeslot, index) => (<th key={index}>{timeslot}</th>))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => (<tr key={index}><td>{day}</td>
                {/* สร้างเซลล์ว่าง สำหรับแต่ละวัน */}
                {timeslots.map((timeslot, index) => (
                  <td key={index}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableTeacher;