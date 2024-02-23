import React, { useState, useRef, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/ScheTeacher.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../searchbar/SearchBar";
import { SearchResultsList } from "../searchbar/SearchResultsList";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../allstyles/datetime.css";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

function ScheTeacher() {
  const [results, setResults] = useState([]);
  const [subject, setSubject] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [note, setNote] = useState("Note..."); // เก็บข้อความของโน้ต
  const noteRef = useRef(null); // สร้าง ref สำหรับ element ที่มี contentEditable="true"

  const addNote = () => {
    Axios.post("http://localhost:5000/sendnote", {
      note: note,
    })
      .then(() => {
        setNote([]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/subjectid`).then((response) => {
      setSubject(response.data);
    });
  }, []);

  const handleSelect = (selected) => {
    setSelectedSubjects(selected);
  };
  //new ui
  useEffect(() => {
    placeCursorAtEnd();
  }, [note]);

  const handleNoteChange = (e) => {
    setNote(e.target.textContent); // เมื่อมีการเปลี่ยนแปลงในโน้ตเก็บข้อความใหม่
  };

  const handleNoteClick = () => {
    setNote("");
  };

  const handleConfirm = () => {
    if (note.trim() !== "") {
      console.log("ส่งข้อความ:", note);
      setNote(""); // ล้างค่าข้อความเมื่อกดยืนยัน
    }
  };

  const handleBlur = () => {
    const text = noteRef.current.textContent; // ดึงค่าข้อความจาก element
    if (typeof text === "string") {
      const trimmedText = text.trim(); // เรียกใช้ trim() กับข้อความ
      setNote(trimmedText); // ตั้งค่าข้อความใหม่ใน state
    }
  };

  const placeCursorAtEnd = () => {
    const el = noteRef.current;
    if (el) {
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".bxx16");
    const dropdownIcon = document.querySelector(
      ".emojione-v1--red-triangle-pointed-down"
    );

    button.addEventListener("click", function () {
      button.classList.toggle("active");
    });
  });
  //#####=====POOM======================

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  const handleOpenModal = () => {
    Swal.fire({
      html: `
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
        </div>
        <div id="boxsummitdate">submit</div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
    });
  };
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
    <div className="allbox">
      <div className="header">
        <img src={logo} className="imglogo" alt="logo" />
        <div className="kubar">
          <div>
            <div className="thai_ku">
              มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </div>
            <div className="english_ku">
              Kasetsart University Sriracha Campus
            </div>
          </div>
          <div />
        </div>
        <div className="menu_bar">
          <span className="ph--user-bold"></span>
          <div className="profile">Profile</div>
          <div className="sign-In">หน้าหลัก</div>
        </div>
      </div>
      <div>
        <span className="mdi--filter">
          <div onClick={handleOpenModal}>Click me to open SweetAlert2</div>
        </span>
        <div className="cir1"></div>
        <div className="bxx1">*ควรจัดวิชาแกนและวิชาบังคับก่อน*</div>
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} onSelect={handleSelect} />
          )}
        </div>
        <div className="bxx2">รหัสวิชา</div>
        <div className="bxx3">ชื่อวิชา</div>
        <div className="bxx4">หน่วยกิต</div>
        <div className="bxx5">จำนวนหมู่เรียน</div>
        <div className="bxx6">จำนวนที่เปิดรับ</div>
        <div className="bxx7">บังคับ/เลือก</div>
        <div className="bxx8">สาขา</div>
        <div className="bxx9">วันและเวลา</div>

        {/* <div className="bxx10">03603341-60</div>
        <div className="bxx11">Software Engineering</div>
        <div className="bxx12">3</div>
        <div className="bxx13">1</div>
        <div className="bxx14">1100</div>
        <div className="bxx15">บังคับ</div>
        <div className="bxx16">Select</div>
        <div className="bxx17">Select</div> */}

        <div className="scroll-scheteacher">
          {selectedSubjects.map((subjectId, index) => (
            <div className="chose" key={index}>
              {subjectId}
            </div>
          ))}
        </div>

        <div
          className="note"
          ref={noteRef}
          contentEditable="true"
          onInput={handleNoteChange}
          onClick={handleNoteClick}
        >
          {note}
        </div>
        <div className="submit" onClick={handleConfirm}>
          ยืนยัน
        </div>
        <div className="submit" onClick={addNote}>
          ยืนยัน
        </div>
        <div className="whitebox"></div>
      </div>
    </div>
  );
}

export default ScheTeacher;
