import React, { useState, useEffect } from "react";
import "../allstyles/TableEdu.css";
import logo from "../allstyles/englogo.png";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // เปลี่ยนจาก { writeFile as XLSXWriteFile } เป็น * as XLSX
import Swal from "sweetalert2";


function TableEdu() {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("T12");
  const [selectedRoom, setSelectedRoom] = useState("DAT");
  const filterOptions = [
    { value: "T12", label: "T12" },
    { value: "1", label: "T12(1)" },
    { value: "2", label: "T12(2)" },
    { value: "3", label: "T12(3)" },
    { value: "4", label: "T12(4)" },
  ];

  const roomOptions = [
    { value: "DAT", label: "DAT" },
    { value: "LABCOM1", label: "LABCOM1" },
    { value: "LABCOM2", label: "LABCOM2" },
    { value: "LABCOM23", label: "LABCOM23" },
  ];

  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption.value);
  };

  const handleFilterRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption.value);
  };

  useEffect(() => {
    fetchTimetableData();
  }, [selectedRoom]);

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

  const exportEdu = () => {
    if (!timetableData) {
      console.error("Timetable data is not available.");
      Swal.fire({
        title: "<b>Error</b>",
        html: "<b>Data is not available</b>",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (timetableData.length === 0) {
      console.error("No data found for the current user.");
      Swal.fire({
        title: "<b>No Data!</b>",
        html: "<b>ไม่มีข้อมูลตาราง</b>",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const excelData = [];
    timetableData.forEach((entry) => {
      entry.subjects.forEach((subject) => {
          excelData.push({
            วัน: entry.subject_day,
            เวลาที่เริ่มสอน: subject.startTime,
            เวลาที่สิ้นสุด: subject.endTime,
            อาจารย์ผู้สอน: subject.instructor,
            รหัสวิชา: subject.subject_id,
            หน่วยกิต: subject.subject_credit,
            หมูเรียน: subject.subject_sec,
            ชื่อวิชา: subject.subject_name,
            หลักสูตร: subject.subject_year,
            ชั้นปี: subject.subject_major,
            ห้องสอน: subject.room,
            จำนวนที่เปิดรับ:  subject.subject_no        
          });
      });
    });

    console.log(excelData, "execldata");

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Education Schedule");
    XLSX.writeFile(workbook, "education_schedule.xlsx");
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

  const renderSchedule = () => {
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
              (data) =>
                data.subject_day === day &&
                data.subjects.some(
                  (subject) =>
                    timeslot >= subject.startTime &&
                    timeslot < subject.endTime &&
                    (selectedFilter === "T12" ||
                      subject.subject_major === selectedFilter) &&
                    (selectedRoom === null || subject.room === selectedRoom)
                )
            );

            if (classInfo) {
              const subject = classInfo.subjects.find(
                (subject) =>
                  timeslot >= subject.startTime &&
                  timeslot < subject.endTime &&
                  (selectedFilter === "T12" ||
                    subject.subject_major === selectedFilter) &&
                  (selectedRoom === null || subject.room === selectedRoom)
              );

              if (subject) {
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
            isSearchable={false}
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
            isSearchable={false}
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
      <div className="exportEDU" onClick={exportEdu}>
          {" "}
          export
        </div>
    </div>
  );
}

export default TableEdu;
