import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../allstyles/datetime.css";

function Datetime() {
  const [data, setData] = useState([]);
  const animatedComponents = makeAnimated();

  const handleFileSelect = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.target.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove("drag-over");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log(files);
    event.target.classList.remove("drag-over");
  };

  const options = [
    { value: "08.00-08.30", label: "08.00-08.30" },
    { value: "08.30-09.00", label: "08.30-09.00" },
    { value: "09.00-09.30", label: "09.00-09.30" },
    { value: "09.30-10.00", label: "09.30-10.00" },
    { value: "10.00-10.30", label: "10.00-10.30" },
    { value: "10.30-11.00", label: "10.30-11.00" },
    { value: "11.00-11.30", label: "11.00-11.30" },
    { value: "11.30-12.00", label: "11.30-12.00" },
    { value: "12.00-12.30", label: "12.00-12.30" },
    { value: "12.30-13.00", label: "12.30-13.00" },
    { value: "13.00-13.30", label: "13.00-13.30" },
    { value: "13.30-14.00", label: "13.30-14.00" },
    { value: "14.00-14.30", label: "14.00-14.30" },
    { value: "14.30-15.00", label: "14.30-15.00" },
    { value: "15.00-15.30", label: "15.00-15.30" },
    { value: "15.30-16.00", label: "15.30-16.00" },
    { value: "16.00-16.30", label: "16.00-16.30" },
    { value: "16.30-17.00", label: "16.30-17.00" },
    { value: "17.00-17.30", label: "17.00-17.30" },
    { value: "17.30-18.00", label: "17.30-18.00" },
    { value: "18.00-18.30", label: "18.00-18.30" },
    { value: "18.30-19.00", label: "18.30-19.00" },
    { value: "19.00-19.30", label: "19.00-19.30" },
    { value: "19.30-20.00", label: "19.30-20.00" },
    { value: "20.00-20.30", label: "20.00-20.30" },
    { value: "20.30-21.00", label: "20.30-21.00" },
    { value: "21.00-21.30", label: "21.00-21.30" },
    { value: "21.30-22.00", label: "21.30-22.00" },
  ];

  const date = [
    { value: "วันจันทร์", label: "วันจันทร์" },
    { value: "วันอังคาร", label: "วันอังคาร" },
    { value: "วันพุธ", label: "วันพุธ" },
    { value: "วันพฤหัสบดี", label: "วันพฤหัสบดี" },
    { value: "วันศุกร์", label: "วันศุกร์" },
    { value: "วันเสาร์", label: "วันเสาร์" },
    { value: "วันอาทิตย์", label: "วันอาทิตย์" },
  ];
  const customStylesdate = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white", // กำหนดสีพื้นหลัง
      width: "70%", // กำหนดความกว้าง
      height: "20%", // กำหนดความสูง
      left: "60%", // กำหนดตำแหน่งซ้าย 50%
      top: "35px", // กำหนดตำแหน่งบน 90%
      textAlign: "center", // จัดให้อักษรอยู่ตรงกลาง
      alignItems: "center",
      justifyContent: "center",
      fontFamily: '"Itim", cursive', // กำหนดแบบอักษร
      border: state.isFocused ? "2px solid green" : "2px solid black", // กำหนดขอบเส้น
      "&:hover": {
        border: state.isFocused ? "2px solid blue" : "2px solid red", // ขอบเส้นเมื่อโฮเวอร์
      },
      transform: "translate(-50%, -50%)", // เลื่อนตำแหน่งให้อยู่กลางแนวนอนและแนวตั้ง
      zIndex: 0,
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: "green", // สีพื้นหลังของ multi value
      color: "black", // สีข้อความของ multi value
      justifyContent: "center",
      textAlign: "center",
    }),
    // ตัวอื่น ๆ สามารถกำหนดตามความต้องการ
  };

  const customStylestime = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white", // กำหนดสีพื้นหลัง
      width: "70%", // กำหนดความกว้าง
      height: "20%", // กำหนดความสูง
      left: "60%", // กำหนดตำแหน่งซ้าย 50%
      top: "85px", // กำหนดตำแหน่งบน 90%

      fontFamily: '"Itim", cursive', // กำหนดแบบอักษร
      border: state.isFocused ? "2px solid green" : "2px solid black", // กำหนดขอบเส้น
      "&:hover": {
        border: state.isFocused ? "2px solid blue" : "2px solid red", // ขอบเส้นเมื่อโฮเวอร์
      },
      transform: "translate(-50%, -50%)", // เลื่อนตำแหน่งให้อยู่กลางแนวนอนและแนวตั้ง
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: "green", // สีพื้นหลังของ multi value
      color: "black", // สีข้อความของ multi value
    }),
    valueContainer: (provided, state) => ({
      ...provided,

      maxHeight: "100px",
      overflowY: "scroll",
    }),
    // ตัวอื่น ๆ สามารถกำหนดตามความต้องการ
  };

  return (
    <div className="boxsum">
      <label id="Textdate">Date :</label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={date}
        styles={customStylesdate} // สไตล์ที่กำหนดเอง
      ></Select>
      <label id="Texttime">Time :</label>
      <div>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={options}
          styles={customStylestime} // สไตล์ที่กำหนดเอง
        ></Select>
      </div>

      <div id="boxsummitdate">submit</div>
    </div>
  );
}

export default Datetime;
