import React, { useState, useRef, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/ScheTeacher.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../searchbar/SearchBar";
import { SearchResultsList } from "../searchbar/SearchResultsList";

function ScheTeacher() {
  const [results,setResults] = useState([]);
  const [subject,setSubject] = useState([]);
  const [list,setList] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [note, setNote] = useState("Note..."); // เก็บข้อความของโน้ต
  const noteRef = useRef(null); // สร้าง ref สำหรับ element ที่มี contentEditable="true"

  useEffect(() => {
    Axios.get(`http://localhost:5000/subjectid`).then((response) => {
      setSubject(response.data);
      console.log(list);
    });
  }, []);
  console.log(list,'liststart');
  const handleSelect = (selected) => {
    setSelectedSubjects(selected);
    console.log(subject,'subject');
    console.log(selected,'selected');
    console.log(list,'list');
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < subject.length; j++) {
        if(selected[i] === subject[j]['subject_id']){
          const isSelected = list.some(item => selected.includes(item.subject_id));
          console.log(isSelected);
          if(!isSelected){
            setList(temp => ([...temp, {
              subject_id: subject[j]['subject_id'],
              subject_year: subject[j]['subject_year'],
              subject_name: subject[j]['subject_name'],
              subject_major_id: subject[j]['subject_major_id'],
              subject_credit: subject[j]['subject_credit']
            }]))
          }
        }
      }
    }
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
    if (note.trim() !== "" ) {
      console.log("ส่งข้อความ:", note);
      setNote(""); // ล้างค่าข้อความเมื่อกดยืนยัน
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
    const button = document.querySelector('.bxx16');
    const dropdownIcon = document.querySelector('.emojione-v1--red-triangle-pointed-down');
  
    button.addEventListener('click', function () {
      button.classList.toggle('active');
    });
  });
  
  

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
        <span className="mdi--filter"></span>
        <div className="cir1"></div>
        <div className="bxx1">*ควรจัดวิชาแกนและวิชาบังคับก่อน*
        
        </div>
        <div className="search-bar-container">
            <SearchBar setResults={setResults} />
            {results && results.length > 0 && <SearchResultsList results={results} onSelect={handleSelect} />}
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
        {list.map((subjectId, index) => (
          <div className="chose" key={index} >{subjectId.subject_id}</div>
        ))}
        </div>
      
      
        <div
          className="note"
          ref={noteRef}
          contentEditable="true"
          onBlur={() => {
            if (!note.trim()) setNote("Note...");
          }}
          onInput={handleNoteChange}
          onClick={handleNoteClick}
        >
          {note}
        </div>
        <div className="submit" onClick={handleConfirm}>ยืนยัน</div>
        <div className="whitebox"></div>
      </div>
    </div>
  );
}

export default ScheTeacher;