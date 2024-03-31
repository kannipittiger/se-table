import React, { useState, useEffect } from "react";
import "../allstyles/TableEdu.css";
import logo from "../allstyles/englogo.png";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function TableEdu() {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("T12");
  const [selectedRoom, setSelectedRoom] = useState(null); // State เก็บค่าห้องที่เลือก
  const filterOptions = [
    { value: "T12", label: "T12" },
    { value: "1", label: "T12(1)" },
    { value: "2", label: "T12(2)" },
    { value: "3", label: "T12(3)" },
    { value: "4", label: "T12(4)" },
  ];

  const roomOptions = [
    // ตัวเลือกสำหรับ dropdown ของห้อง
    { value: "DAT", label: "DAT" },
    { value: "LABCOM1", label: "LABCOM1" },
    { value: "LABCOM2", label: "LABCOM2" },
    { value: "LABCOM23", label: "LABCOM23" },
    // เพิ่มตัวเลือกของห้องตามความเหมาะสม
  ];

  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption.value);
  };

  const handleFilterRoomChange = (selectedOption) => {
    // ฟังก์ชั่นสำหรับเลือกห้อง
    setSelectedRoom(selectedOption.value);
  };

  useEffect(() => {
    fetchTimetableData();
  }, [selectedRoom]); // เมื่อมีการเลือกห้องใหม่เกิดขึ้น

  const goEdu = () => {
    navigate("/edu");
  };

  const goHome = () => {
    navigate("/");
  };

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

  const renderSchedule = () => {
    if (!timetableData) {
      return null;
    }

    const filteredData =
      selectedFilter === "T12"
        ? timetableData
        : timetableData.filter((data) =>
            data.subjects.some(
              (subject) => subject.subject_major === selectedFilter
            )
          );

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days.map((day, dayIndex) => {
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
        <tr key={dayIndex}>
          <td>{day}</td>
          {timeslots.map((timeslot, timeslotIndex) => {
            const classInfo = filteredData.find(
              (data) => data.subject_day === day
            );
            if (classInfo) {
              const subject = classInfo.subjects.find(
                (subject) =>
                  timeslot >= subject.startTime && timeslot < subject.endTime
              );
              if (
                subject &&
                (selectedFilter === "T12" ||
                  subject.subject_major === selectedFilter) &&
                (selectedRoom === null || subject.room === selectedRoom)
              ) {
                const startTimeIndex = timeslots.indexOf(subject.startTime);
                const colSpan = calculateDurationInSlots(
                  subject.startTime,
                  subject.endTime,
                  timeslots
                );
                if (timeslotIndex === startTimeIndex) {
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
                        Time: {subject.startTime}-{subject.endTime}
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
        <img src={logo} className="imglogo" alt="logo"></img>
        <div className="kubar">
          <div className="thai_ku">มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา </div>
          <div className="english_ku">Kasetsart University Sriracha Campus</div>
        </div>
        <div className="menu_bar">
          <div className="profileK" onClick={goEdu}>
            Profile
          </div>
          <div className="homeK" onClick={goHome}>
            หน้าหลัก
          </div>
        </div>
      </div>
      <div className="whitebox">
        <table className="schedule-tablee">
          <thead>
            <tr>
              <th></th>
              {renderTimeslots()}
            </tr>
          </thead>
          <tbody>{renderSchedule()}</tbody>
        </table>
        <div className="Dropdown_Major">
          <Select
            options={filterOptions}
            value={filterOptions.find(
              (option) => option.value === selectedFilter
            )}
            onChange={handleFilterChange}
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: "20px",
                fontSize: "14px",
              }),
            }}
          />
        </div>
        <div className="Dropdown_Room">
          <Select
            options={roomOptions}
            value={roomOptions.find((option) => option.value === selectedRoom)}
            onChange={handleFilterRoomChange}
            placeholder="Select room..."
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: "20px",
                fontSize: "14px",
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TableEdu;
