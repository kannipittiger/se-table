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
  const [day, setDay] = useState("");
  const [times, setTimes] = useState([]);

  const handleDayChange = async () => {
    const { value: selectedDay } = await Swal.fire({
      title: "เปลี่ยนแปลงวัน",
      input: "select",
      inputOptions: {
        จันทร์: "จันทร์",
        อังคาร: "อังคาร",
        พุธ: "พุธ",
        พฤหัสบดี: "พฤหัสบดี",
        ศุกร์: "ศุกร์",
        เสาร์: "เสาร์",
        อาทิตย์: "อาทิตย์",
      },
      inputPlaceholder: "เลือกวันที่จะสอน",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== "") {
            setDay(value);
            resolve();
          } else {
            resolve("Please select a day.");
          }
        });
      },
    });

    if (selectedDay) {
      setDay(selectedDay);
      const { value: selectedTimes } = await Swal.fire({
        title: "เลือกช่วงเวลา",
        html:
          '<select id="times" class="swal2-select" multiple>' +
          '<option value="08.00-08.30">08.00-08.30</option>' +
          '<option value="08.30-09.00">08.30-09.00</option>' +
          '<option value="09.00-09.30">09.00-09.30</option>' +
          '<option value="09.30-10.00">09.30-10.00</option>' +
          '<option value="10.30-11.00">10.30-11.00</option>' +
          '<option value="11.00-11.30">11.00-11.30</option>' +
          '<option value="11.30-12.00">11.30-12.00</option>' +
          '<option value="12.00-12.30">12.00-12.30</option>' +
          '<option value="12.30-13.00">12.30-13.00</option>' +
          '<option value="13.00-13.30">13.00-13.30</option>' +
          '<option value="13.30-14.00">13.30-14.00</option>' +
          '<option value="14.00-14.30">14.00-14.30</option>' +
          '<option value="14.30-15.00">14.30-15.00</option>' +
          '<option value="15.00-15.30">15.00-15.30</option>' +
          '<option value="15.30-16.00">15.30-16.00</option>' +
          '<option value="16.00-16.30">16.00-16.30</option>' +
          '<option value="16.30-17.00">16.30-17.00</option>' +
          '<option value="17.00-17.30">17.00-17.30</option>' +
          '<option value="17.30-18.00">17.30-18.00</option>' +
          '<option value="18.00-18.30">18.00-18.30</option>' +
          '<option value="18.30-19.00">18.30-19.00</option>' +
          '<option value="19.00-19.30">19.00-19.30</option>' +
          '<option value="19.30-20.00">19.30-20.00</option>' +
          '<option value="20.00-20.30">20.00-20.30</option>' +
          '<option value="20.30-21.00">20.30-21.00</option>' +
          '<option value="21.00-21.30">21.00-21.30</option>' +
          '<option value="21.30-22.00">21.30-22.00</option>' +
          // เพิ่มตัวเลือกเวลาต่อไปตามต้องการ
          "</select>",
        focusConfirm: false,
        preConfirm: () => {
          const selectedTimes = Array.from(
            document.getElementById("times").selectedOptions,
            (option) => option.value
          );
          setTimes(selectedTimes);
          return selectedTimes;
        },
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value.length > 0) {
              resolve();
            } else {
              resolve("Please select at least one time slot.");
            }
          });
        },
      });

      if (selectedTimes) {
        setTimes(selectedTimes);
        Swal.fire("เวลาที่เลือก", selectedTimes.join(", "), "success");
      }
    }
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
        <span className="mdi--filter" onClick={handleDayChange}>
          {/* <div onClick={handleDayChange}>SweetAlert2</div> */}
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
          //contentEditable="true" // errorตรงนี้
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
