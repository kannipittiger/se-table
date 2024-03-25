import React, { useState, useEffect } from "react";
import "../allstyles/TableTeacher.css";

function TableTeacher() {
  const [timetableData, setTimetableData] = useState(null);

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = async () => {
    try {
      const response = await fetch("http://localhost:5000/timetable");
      const data = await response.json();
      setTimetableData(data);
    } catch (error) {
      console.error("Error fetching timetable data:", error);
    }
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(".").map(Number);
    return hours * 60 + minutes;
  };

  const calculateDurationInSlots = (startTime, finishTime, timeslots) => {
    const startMinutes = timeToMinutes(startTime);
    const finishMinutes = timeToMinutes(finishTime);
    const durationInMinutes = finishMinutes - startMinutes;

    const maxDurationInMinutes = timeslots.length * 30; // คำนวณระยะเวลาสูงสุดที่สามารถแสดงในตารางได้
    const maxSlots = timeslots.length; // จำนวนช่องเวลาสูงสุดที่สามารถใช้ได้
    const slotsNeeded = Math.ceil(durationInMinutes / 30);

    return Math.min(slotsNeeded, maxSlots); // คืนค่าระยะเวลาที่ถูกต้องโดยไม่เกินขอบเขตช่องเวลาที่กำหนด
  };

  const renderTimeslots = () => {
    const timeslots = [];
    for (let hour = 8; hour < 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        let formattedHour = hour < 10 ? `0${hour}` : hour;
        let formattedMinute = minute === 0 ? "00" : minute;
        timeslots.push(`${formattedHour}.${formattedMinute}`);
      }
    }
    return timeslots.map((timeslot, index) => <th key={index}>{timeslot}</th>);
  };

  const renderSchedule = () => {
    if (!timetableData) {
      return null;
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const timeslots = [];
    for (let hour = 8; hour < 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        let formattedHour = hour < 10 ? `0${hour}` : hour;
        let formattedMinute = minute === 0 ? "00" : minute;
        timeslots.push(`${formattedHour}.${formattedMinute}`);
      }
    }

    return days.map((day, dayIndex) => {
      return (
        <tr key={dayIndex}>
          <td>{day}</td>
          {timeslots.map((timeslot, timeslotIndex) => {
            const classInfo = timetableData.find(
              (data) => data.subject_day === day
            );
            if (classInfo) {
              const subject = classInfo.subjects.find(
                (subject) =>
                  timeslot >= subject.startTime && timeslot < subject.endTime
              );
              if (subject) {
                const startTimeIndex = timeslots.indexOf(subject.startTime);
                const endTimeIndex = timeslots.indexOf(subject.endTime);
                if (timeslotIndex === startTimeIndex) {
                  const colSpan = endTimeIndex - startTimeIndex + 1;
                  return (
                    <td
                      key={timeslotIndex}
                      className="class-info"
                      colSpan={colSpan}
                    >
                      <div>{subject.subject_name}</div>
                      <div>{subject.instructor}</div>
                      <div>{subject.room}</div>
                      <div>
                        Time{subject.startTime}-{subject.endTime}
                      </div>
                    </td>
                  );
                } else {
                  return null;
                }
              }
            }
            return <td key={timeslotIndex}></td>;
          })}
        </tr>
      );
    });
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
        <table className="schedule-table">
          <thead>
            <tr>
              <th></th>
              {renderTimeslots()}
            </tr>
          </thead>
          <tbody>{renderSchedule()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default TableTeacher;
