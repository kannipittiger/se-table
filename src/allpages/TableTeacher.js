import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/TableTeacher.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // เปลี่ยนจาก { writeFile as XLSXWriteFile } เป็น * as XLSX

function TableTeacher() {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState(null);
  const [data, setData] = useState([""]);
  const location = useLocation();
  const { profile } = location.state;

  const goHome = () => {
    navigate("/");
  };

  const goTeacher = () => {
    navigate("/teacher");
  };
  console.log(profile.user_name);
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

  const exportTeachers = () => {
    if (!timetableData) {
      console.error("Timetable data is not available.");
      return;
    }

    const filteredData = timetableData.filter((entry) =>
      entry.subjects.some((subject) => subject.instructor === profile.user_name)
    );
    console.log(filteredData, "55555");

    if (filteredData.length === 0) {
      console.error("No data found for the current user.");
      return;
    }

  const excelData = [];
  filteredData.forEach(entry => {
    entry.subjects.forEach(subject => {
      if (subject.instructor === profile.user_name) {
        excelData.push({
          วัน: entry.subject_day,
          เวลาที่เริ่มสอน: subject.startTime,
          เวลาที่สิ้นสุด: subject.endTime,
          อาจารย์ผู้สอน: subject.instructor,
          รหัสวิชา: subject.subject_id,
          หมูเรียน: subject.subject_sec,
          ชื่อวิชา: subject.subject_name,
          หลักสูตร: subject.subject_year,
          ชั้นปี: subject.subject_major,
          ห้องสอน: subject.room
        });
      }
    });
  });
  console.log(excelData,"execldata")
  
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Teacher Schedule");
  XLSX.writeFile(workbook, "teacher_schedule.xlsx");
  excelData.splice(0, excelData.length);
};
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(".").map(Number);
    return hours * 60 + minutes;
  };

  const calculateDurationInSlots = (startTime, finishTime, timeslots) => {
    const startMinutes = timeToMinutes(startTime);
    const finishMinutes = timeToMinutes(finishTime);
    const durationInMinutes = finishMinutes - startMinutes;

    const maxDurationInMinutes = timeslots.length * 30;
    const maxSlots = timeslots.length;
    let slotsNeeded = Math.ceil(durationInMinutes / 30) + 1;

    if (slotsNeeded > maxSlots) {
      slotsNeeded = maxSlots;
    }

    return slotsNeeded;
  };

  const renderTimeslots = () => {
    const timeslots = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 22 && minute === 30) {
          break;
        }
        let formattedHour = hour < 10 ? `0${hour}` : hour;
        let formattedMinute = minute === 0 ? "00" : minute;
        timeslots.push(`${formattedHour}.${formattedMinute}`);
      }
    }
    return timeslots.map((timeslot, index) => <th key={index}>{timeslot}</th>);
  };

  const renderSchedule = (loggedInUsername) => {
    if (!timetableData) {
      return null;
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days.map((day, dayIndex) => {
      const className = `${day.toLowerCase()} day-row`; // เพิ่มคลาสสีให้กับแถว
      const timeslots = [];
      for (let hour = 8; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          if (hour === 22 && minute === 30) {
            break;
          }
          let formattedHour = hour < 10 ? `0${hour}` : hour;
          let formattedMinute = minute === 0 ? "00" : minute;
          timeslots.push(`${formattedHour}.${formattedMinute}`);
        }
      }

      return (
        <tr key={dayIndex} className={className}>
          <td>{day}</td>
          {timeslots.map((timeslot, timeslotIndex) => {
            const classInfo = timetableData.find(
              (data) => data.subject_day === day
            );
            if (classInfo) {
              const subject = classInfo.subjects.find(
                (subject) =>
                  timeslot >= subject.startTime &&
                  timeslot < subject.endTime &&
                  subject.instructor === profile.user_name
              );
              console.log(subject);
              if (subject) {
                const startTimeIndex = timeslots.indexOf(subject.startTime);
                console.log(startTimeIndex);
                const endTimeIndex = timeslots.indexOf(subject.endTime);
                if (timeslotIndex === startTimeIndex) {
                  const colSpan = calculateDurationInSlots(
                    subject.startTime,
                    subject.endTime,
                    timeslots
                  );

                  if (colSpan > 1) {
                    timeslots.splice(timeslotIndex + 1, colSpan - 1);
                  }

                  return (
                    <td
                      key={timeslotIndex}
                      className="class-info"
                      colSpan={colSpan}
                    >
                      <div>Instructor: {subject.instructor}</div>
                      <div>
                        Subject ID: {subject.subject_id}-{subject.subject_year}
                      </div>
                      <div>
                        Subject Name: {subject.subject_name} (
                        {subject.subject_sec})
                      </div>
                      <div>Room: {subject.room}</div>
                      <div>
                        Time:{subject.startTime}-{subject.endTime}
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

  // const exportToExcel = () => {
  //   const wb = XLSXUtils.table_to_book(document.querySelector(".schedule-table"), { sheet: "Sheet JS" });
  //   XLSXWriteFile(wb, "schedule.xlsx");
  // };

  return (
    <div className="allbox">
      <div className="header">
        <img src={logo} className="imglogo" alt="logo"></img>
        <div className="kubar">
          <div className="thai_ku">มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา </div>
          <div className="english_ku">Kasetsart university sriracha campus</div>
        </div>
        <div className="menu_bar">
          <div className="profileL" onClick={goTeacher}>
            Profile
          </div>
          <div className="homeL" onClick={goHome}>
            หน้าหลัก
          </div>
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
        <div className="BottonEX"> export</div>
      </div>
      <div className="BottonEX" onClick={exportTeachers}>
        Export
      </div>
    </div>
  );
}

export default TableTeacher;
