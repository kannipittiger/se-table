import React, { useState, useEffect } from "react";
import "../allstyles/TableForScheEdu.css";
import logo from "../allstyles/englogo.png";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
function TableForScheEdu() {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("T12");
  const filterOptions = [
    { value: "T12", label: "T12" },
    { value: "1", label: "T12(1)" },
    { value: "2", label: "T12(2)" },
    { value: "3", label: "T12(3)" },
    { value: "4", label: "T12(4)" },
  ];

  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption.value);
  };

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const goEdu = () => {
    navigate("/edu");
  };

  const goHome = () => {
    navigate("/");
  };

  const fetchTimetableData = async () => {
    try {
      const response = await fetch("http://localhost:5000/timetableEdu");
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
    let slotsNeeded = Math.ceil(durationInMinutes / 30) + 1; // ไม่ต้องเพิ่ม +1 ที่นี่

    // ตรวจสอบว่า slotsNeeded เกิน maxSlots หรือไม่
    if (slotsNeeded > maxSlots) {
      slotsNeeded = maxSlots; // ถ้าเกินให้ใช้ maxSlots แทน
    }

    return slotsNeeded; // คืนค่าระยะเวลาที่ถูกต้องโดยไม่เกินขอบเขตช่องเวลาที่กำหนด
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

  const renderSchedule = (loggedInUsername) => {
    if (!timetableData) {
      return null; // ถ้ายังไม่ได้รับข้อมูลตารางเวลา
    }

    // Adjusted logic to not filter when "T12" is selected
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
      const className = `${day.toLowerCase()} day-row`; // เพิ่มคลาสสีให้กับแถว
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
        <tr key={dayIndex} className={className}>
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
              console.log(subject);
              if (
                subject &&
                (selectedFilter === "T12" ||
                  subject.subject_major === selectedFilter)
              ) {
                const startTimeIndex = timeslots.indexOf(subject.startTime);
                console.log(startTimeIndex);
                const endTimeIndex = timeslots.indexOf(subject.endTime);
                if (timeslotIndex === startTimeIndex) {
                  const colSpan = calculateDurationInSlots(
                    subject.startTime,
                    subject.endTime,
                    timeslots
                  );
                  // ตรวจสอบว่าเซลล์ปัจจุบันมีการ merge หรือไม่
                  if (colSpan > 1) {
                    // ลบช่องที่ไม่ใช้งานออกจากตาราง
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
        <div className="dropdown-containerr">
          <Select
            options={filterOptions}
            value={filterOptions.find(
              (option) => option.value === selectedFilter
            )}
            isSearchable={false}
            onChange={handleFilterChange}
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: "20px", // Adjust the height as needed
                fontSize: "14px", // Adjust the font size as needed
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TableForScheEdu;
