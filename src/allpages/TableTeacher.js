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

  const calculateDurationInSlots = (startTime, finishTime) => {
    const startMinutes = timeToMinutes(startTime);
    const finishMinutes = timeToMinutes(finishTime);
    const durationInMinutes = finishMinutes - startMinutes;

    return Math.ceil(durationInMinutes / 30) + 1;
  };

  const renderTimeslots = () => {
    const timeslots = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 22 && minute === 30) {
          break; // หยุดการวนลูปเมื่อเจอเวลา 22:30
        }
        let formattedHour = hour < 10 ? `0${hour}` : hour;
        let formattedMinute = minute === 0 ? "00" : minute;
        timeslots.push(`${formattedHour}.${formattedMinute}`);
      }
    }
    return timeslots.map((timeslot, index) => <th key={index}>{timeslot}</th>);
  };

  const renderSchedule = () => {
    if (!timetableData) {
      return null; // ถ้ายังไม่ได้รับข้อมูลตารางเวลา
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days.map((day, dayIndex) => {
      const timeslots = [];
      for (let hour = 8; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          if (hour === 22 && minute === 30) {
            break; // หยุดการวนลูปเมื่อเจอเวลา 22:30
          }
          let formattedHour = hour < 10 ? `0${hour}` : hour;
          let formattedMinute = minute === 0 ? "00" : minute;
          timeslots.push(`${formattedHour}.${formattedMinute}`);
        }
      }

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
                  timeToMinutes(timeslot) >= timeToMinutes(subject.startTime) &&
                  timeToMinutes(timeslot) < timeToMinutes(subject.endTime)
              );
              console.log(subject);
              if (subject) {
                const startTimeIndex = timeslots.indexOf(subject.startTime);
                console.log(startTimeIndex);
                const endTimeIndex = timeslots.indexOf(subject.endTime);
                if (timeslotIndex === startTimeIndex) {
                  return (
                    <td
                      key={timeslotIndex}
                      className="class-info"
                      colSpan={calculateDurationInSlots(
                        subject.startTime,
                        subject.endTime
                      )}
                    >
                      <div>Instructor: {subject.instructor}</div>
                      <div>Subject ID: {subject.subject_id}-{subject.subject_year}</div>
                      <div>Subject Name: {subject.subject_name} ({subject.subject_sec})</div>
                      <div>Room: {subject.room}</div>
                      <div>
                        Time: {subject.startTime}-{subject.endTime}{" "}
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
