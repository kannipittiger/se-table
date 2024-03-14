import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../allstyles/datetime.css";

const Datetime = () => {
  // สร้าง state เพื่อเก็บค่าชั้นปีที่เลือก
  const [selectedYears, setSelectedYears] = useState([]);

  // รายการชั้นปีที่เลือกไว้
  const options = [
    { value: "first_year", label: "ปี 1" },
    { value: "second_year", label: "ปี 2" },
    { value: "third_year", label: "ปี 3" },
    { value: "fourth_year", label: "ปี 4" },
  ];

  // เมื่อมีการเปลี่ยนแปลงในการเลือก
  const handleYearChange = (selectedOption) => {
    setSelectedYears(selectedOption);
  };

  return (
    <div>
      <Select
        value={selectedYears}
        onChange={handleYearChange}
        options={options}
        isMulti
      />
    </div>
  );
};

export default Datetime;
