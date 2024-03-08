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
import { useLocation } from "react-router-dom";

function ScheTeacher() {
  const [results, setResults] = useState([]);
  const [subject, setSubject] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([{'id':'0','year':'0'}]);
  const [note, setNote] = useState("Note..."); // เก็บข้อความของโน้ต
  const noteRef = useRef(null); // สร้าง ref สำหรับ element ที่มี contentEditable="true"
  const location = useLocation();
  const { profile } = location.state;

  useEffect(() => {
    const lastSelectedSubject = selectedSubjects[selectedSubjects.length - 1];
    console.log(lastSelectedSubject.id,'1');
    console.log(lastSelectedSubject,'useref');
      Axios.get(`http://localhost:5000/render`, {
          params: {
            id: lastSelectedSubject.id,
            year: lastSelectedSubject.year,
          }
        })
     .then((response) => {
      response.data.forEach(item => {
        const updatedSubject = [...subject, item];
        console.log(item,'db');
        setSubject(updatedSubject);
      });
     })
     .catch((error) => {
       console.error('Error fetching data:', error.message);
       throw error;
     });
     
  }, [selectedSubjects]);

  useEffect(() => {
    console.log(subject, 'subj');
  }, [subject]);

  const handleSelect = (selected) => {
    setSelectedSubjects(selected);
  };


  const renderScheteacher = (value,index) => {
    

    return(
      <div className="chose" key={index}>
        <div className="box_sub_id">{value.subject_id}</div>
        <div className="box_sub_name">{value.subject_name}</div>
        <div className="box_sub_credit">{value.subject_credit}</div>
        <div className="box_sub_sec">{}</div>
        <div className="box_sub_no">{}</div>
        <div className="box_sub_force_or_not">{}</div>
        <div className="box_sub_major">{}</div>
        <div className="box_sub_day">{}</div>
      </div>
    )
  }

  const addNote = () => {
    if (!profile) {
      // Handle the case where profile is null
      console.log("Profile is null");
      return;
    }
    Axios.post("http://localhost:5000/sendnote", {
      user_id: profile.user_id,
      user_name: profile.user_name,
      user_email: profile.user_email,
      note: note,
    })
      .then(() => {
        setNote([]);
      })
      .catch((error) => console.log(error));
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
    addNote();
    if (note.trim() !== "") {
      console.log("ส่งข้อความ:", note);
      console.log(profile.user_email);
      console.log(profile.user_name);
      console.log(profile.user_id);
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
      confirmButtonColor: "#3085d6", // สีปุ่ม Confirm
      cancelButtonColor: "#d33", // สีปุ่ม Cancel
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",

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
          '<label for="start-time">เวลาเริ่มต้น:</label>' +
          '<select id="start-time" class="swal2-select">' +
          '<option value="08.00">08.00</option>' +
          '<option value="08.30">08.30</option>' +
          '<option value="09.00">09.00</option>' +
          '<option value="09.30">09.30</option>' +
          '<option value="10.30">10.30</option>' +
          '<option value="11.00">11.00</option>' +
          '<option value="11.30">11.30</option>' +
          '<option value="12.00">12.00</option>' +
          '<option value="12.30">12.30</option>' +
          '<option value="13.00">13.00</option>' +
          '<option value="13.30">13.30</option>' +
          '<option value="14.00">14.00</option>' +
          '<option value="14.30">14.30</option>' +
          '<option value="15.00">15.00</option>' +
          '<option value="15.30">15.30</option>' +
          '<option value="16.00">16.00</option>' +
          '<option value="16.30">16.30</option>' +
          '<option value="17.00">17.00</option>' +
          '<option value="17.30">17.30</option>' +
          '<option value="18.00">18.00</option>' +
          '<option value="18.30">18.30</option>' +
          '<option value="19.00">19.00</option>' +
          '<option value="19.30">19.30</option>' +
          '<option value="20.00">20.00</option>' +
          '<option value="20.30">20.30</option>' +
          '<option value="21.00">21.00</option>' +
          '<option value="21.30">21.30</option>' +
          // รายการเวลาอื่น ๆ ที่ต้องการให้ผู้ใช้เลือก
          "</select>" +
          "<br>" +
          '<label for="end-time">เวลาสิ้นสุด:</label>' +
          '<select id="end-time" class="swal2-select">' +
          '<option value="08.00">08.00</option>' +
          '<option value="08.30">08.30</option>' +
          '<option value="09.00">09.00</option>' +
          '<option value="09.30">09.30</option>' +
          '<option value="10.30">10.30</option>' +
          '<option value="11.00">11.00</option>' +
          '<option value="11.30">11.30</option>' +
          '<option value="12.00">12.00</option>' +
          '<option value="12.30">12.30</option>' +
          '<option value="13.00">13.00</option>' +
          '<option value="13.30">13.30</option>' +
          '<option value="14.00">14.00</option>' +
          '<option value="14.30">14.30</option>' +
          '<option value="15.00">15.00</option>' +
          '<option value="15.30">15.30</option>' +
          '<option value="16.00">16.00</option>' +
          '<option value="16.30">16.30</option>' +
          '<option value="17.00">17.00</option>' +
          '<option value="17.30">17.30</option>' +
          '<option value="18.00">18.00</option>' +
          '<option value="18.30">18.30</option>' +
          '<option value="19.00">19.00</option>' +
          '<option value="19.30">19.30</option>' +
          '<option value="20.00">20.00</option>' +
          '<option value="20.30">20.30</option>' +
          '<option value="21.00">21.00</option>' +
          '<option value="21.30">21.30</option>' +
          // รายการเวลาอื่น ๆ ที่ต้องการให้ผู้ใช้เลือก
          "</select>",
        focusConfirm: false,
        preConfirm: () => {
          const startTime = document.getElementById("start-time").value;
          const endTime = document.getElementById("end-time").value;

          // ตรวจสอบว่าเวลาสิ้นสุดมากกว่าหรือเท่ากับเวลาเริ่มต้น
          if (startTime >= endTime) {
            Swal.showValidationMessage("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น");
            return false;
          }

          // ส่งเวลาเริ่มต้นและสิ้นสุดกลับ
          return [startTime, endTime];
        },
        showCancelButton: true,
        confirmButtonColor: "#3085d6", // สีปุ่ม Confirm
        cancelButtonColor: "#d33", // สีปุ่ม Cancel
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (value) {
            return Promise.resolve();
          } else {
            return Promise.reject("โปรดเลือกเวลาเริ่มต้นและเวลาสิ้นสุด");
          }
        },
      });

      if (selectedDay && selectedTimes) {
        // ทำอะไรบางอย่างเมื่อผู้ใช้เลือกเวลาเริ่มต้นและสิ้นสุด
        console.log("วัน:", selectedDay);
        console.log("เวลาเริ่มต้น:", selectedTimes[0]);
        console.log("เวลาสิ้นสุด:", selectedTimes[1]);
        Swal.fire(
          "เวลาที่เลือก",
          "วัน: " +
            selectedDay +
            "\n" +
            "เริ่มต้น: " +
            selectedTimes[0] +
            " น." +
            " ,  สิ้นสุด: " +
            selectedTimes[1] +
            " น.",
          "success"
        );
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
          <div className="profile">Profile</div>
          <div className="sign-In">หน้าหลัก</div>
        </div>
      </div>
      <div>
        <span className="mdi--filter" onClick={handleDayChange}>
          {/* <div onClick={handleDayChange}>SweetAlert2</div> */}
        </span>
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
        <div className="bxx5">หมู่เรียน</div>
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
          {subject.map(renderScheteacher)}
        </div>

        <div
          className="note"
          ref={noteRef}
          contentEditable="true" // errorตรงนี้
          onInput={handleNoteChange}
          onClick={handleNoteClick}
          onBlur={handleBlur}
          dangerouslySetInnerHTML={{ __html: note }}
        ></div>
        <div className="submit" onClick={handleConfirm}>
          ยืนยัน
        </div>
        <div className="whitebox"></div>
      </div>
    </div>
  );
}

export default ScheTeacher;
