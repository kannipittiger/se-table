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
import { AiOutlineCloseCircle } from "react-icons/ai";
import Datetime from "./datetime";

function ScheTeacher() {
  const navigate = useNavigate();
  const goTeacher = () => {
    navigate("/teacher");
  };

  const goHome = () => {
    navigate("/");
  };

  let selectedDay;
  let selectedTime;
  const [teacher, setTeacher] = useState([
    {
      id: "0",
      room: "0",
      subject_credit: "0",
      subject_day: "0",
      subject_end: "0",
      subject_id: "0",
      subject_major: "0",
      subject_name: "0",
      subject_no: "0",
      subject_required: "0",
      subject_sec: "0",
      subject_start: "0",
      subject_year: "0",
      user_email: "0",
      user_id: "0",
      user_name: "0",
    },
  ]);
  const [results, setResults] = useState([]);
  const [subject, setSubject] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]); // state เก็บค่า select ตาม index ของ subject

  const [selectedSubjects, setSelectedSubjects] = useState([
    { id: "0", year: "0" },
  ]);
  const [note, setNote] = useState("Note..."); // เก็บข้อความของโน้ต
  const noteRef = useRef(null); // สร้าง ref สำหรับ element ที่มี contentEditable="true"
  const location = useLocation();
  const { profile } = location.state;
  const currentDate = new Date();
  const currentDateTimeString = currentDate.toLocaleString();

  useEffect(() => {
    Axios.get(`http://localhost:5000/teacher_input`, {
      params: {
        name: profile.user_name,
      },
    }).then((response) => {
      setTeacher((oldArray) => [...oldArray, ...response.data]);
      console.log(teacher, "5555");
    });
  }, []);
  //console.log(teacher,'5555');
  useEffect(() => {
    const lastSelectedSubject = selectedSubjects[selectedSubjects.length - 1];
    console.log(lastSelectedSubject.id, "1");
    console.log(lastSelectedSubject, "useref");

    Axios.get(`http://localhost:5000/render`, {
      params: {
        id: lastSelectedSubject.id,
        year: lastSelectedSubject.year,
      },
    })
      .then((response) => {
        response.data.forEach((item) => {
          const updatedSubject = [...subject, item];
          console.log(item, "db");
          setSubject(updatedSubject);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        throw error;
      });
  }, [selectedSubjects]);



  useEffect(() => {
    console.log(selectedYears, "selectedYears ");
  }, [selectedYears]);

  const handleSelect = (selected) => {
    setSelectedSubjects(selected);
  };

  function checkOverlap(
    selectedStart1,
    selectedEnd1,
    selectedStart2,
    selectedEnd2
  ) {
    return selectedStart1 < selectedEnd2 && selectedEnd1 > selectedStart2;
  }

  function checkSubjectOverlap(subjects) {
    for (let i = 0; i < subjects.length - 1; i++) {
      for (let j = i + 1; j < subjects.length; j++) {
        const subject1 = subjects[i];
        const subject2 = subjects[j];

        if (
          subject1.subject_id === subject2.subject_id &&
          subject1.subject_year === subject2.subject_year && // เช็คว่ามี subject_id เดียวกัน
          subject1.subject_sec !== subject2.subject_sec && // เช็คว่าไม่มี subject_sec ที่ซ้ำกัน
          subject1.selectedDay === subject2.selectedDay &&
          checkOverlap(
            subject1.selectedStart,
            subject1.selectedEnd,
            subject2.selectedStart,
            subject2.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          // alert("วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // คนละวิชา คนละปีหลักสูตร คนละเซค วันเดียวกัน
        else if (
          subject1.subject_id !== subject2.subject_id &&
          subject1.subject_year !== subject2.subject_year &&
          subject1.subject_sec !== subject2.subject_sec &&
          subject1.selectedDay === subject2.selectedDay &&
          checkOverlap(
            subject1.selectedStart,
            subject1.selectedEnd,
            subject2.selectedStart,
            subject2.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          // alert("คนละวิชา คนละปีหลักสูตร คนละเซค วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `คนละวิชา คนละปีหลักสูตร คนละเซค วันเดียวกัน`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // คนละวิชา คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน
        else if (
          subject1.subject_id !== subject2.subject_id &&
          subject1.subject_year !== subject2.subject_year &&
          subject1.subject_sec === subject2.subject_sec &&
          subject1.selectedDay === subject2.selectedDay &&
          checkOverlap(
            subject1.selectedStart,
            subject1.selectedEnd,
            subject2.selectedStart,
            subject2.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          // alert("คนละวิชา คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `คนละวิชา คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // คนละวิชา ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน
        else if (
          subject1.subject_id !== subject2.subject_id &&
          subject1.subject_year === subject2.subject_year &&
          subject1.subject_sec !== subject2.subject_sec &&
          subject1.selectedDay === subject2.selectedDay &&
          checkOverlap(
            subject1.selectedStart,
            subject1.selectedEnd,
            subject2.selectedStart,
            subject2.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          // alert("คนละวิชา ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `คนละวิชา ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // คนละวิชา ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกัน
        else if (
          subject1.subject_id !== subject2.subject_id &&
          subject1.subject_year === subject2.subject_year &&
          subject1.subject_sec === subject2.subject_sec &&
          subject1.selectedDay === subject2.selectedDay &&
          checkOverlap(
            subject1.selectedStart,
            subject1.selectedEnd,
            subject2.selectedStart,
            subject2.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          // alert("คนละวิชา ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกัน");
          return true;
        }

        // วิชาเดียวกัน คนละปีหลักสูตร คนละเซค วันเดียวกัน
        else if (
          subject1.subject_id === subject2.subject_id &&
          subject1.subject_year !== subject2.subject_year &&
          subject1.subject_sec !== subject2.subject_sec &&
          subject1.selectedDay === subject2.selectedDay &&
          checkOverlap(
            subject1.selectedStart,
            subject1.selectedEnd,
            subject2.selectedStart,
            subject2.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          // alert("วิชาเดียวกัน คนละปีหลักสูตร คนละเซค วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน คนละปีหลักสูตร คนละเซค วันเดียวกัน`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน
        else if (
          subject1.subject_id === subject2.subject_id &&
          subject1.subject_year === subject2.subject_year &&
          subject1.subject_sec !== subject2.subject_sec &&
          subject1.selectedDay === subject2.selectedDay &&
          checkOverlap(
            subject1.selectedStart,
            subject1.selectedEnd,
            subject2.selectedStart,
            subject2.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          // alert("วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // วิชาเดียวกัน คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน
        else if (
          subject1.subject_id === subject2.subject_id &&
          subject1.subject_year !== subject2.subject_year &&
          subject1.subject_sec === subject2.subject_sec &&
          subject1.selectedDay === subject2.selectedDay &&
          checkOverlap(
            subject1.selectedStart,
            subject1.selectedEnd,
            subject2.selectedStart,
            subject2.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          // alert("วิชาเดียวกัน คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // วิชาเดียวกัน ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกัน
        else if (
          subject1.subject_id === subject2.subject_id &&
          subject1.subject_year === subject2.subject_year &&
          subject1.subject_sec === subject2.subject_sec
        ) {
          // มีวิชาและหมู่เรียนนี้ในรายวิชาที่เลือกไว้แล้ว
          // alert("วิชาเดียวกัน ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกัน 55555");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกัน`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }
        console.log("ไม่เข้าสักอัน ควย11111");

      }

 
    }

    // else if () {

    // }
    // ไม่พบการทับซ้อนกัน
    return false;
  }

  function DBOverlap() {
    console.log("sdfdgf");
    console.log(teacher, "teacher");
    console.log(subject, "subject");
    for (let i = 0; i < teacher.length; i++) {
      for (let j = 0; j < subject.length; j++) {
        const teacher1 = teacher[i];
        const subject1 = subject[j];
        console.log(
          teacher1,
          subject1,
          "ตรงกันไหมละะ อิอิอ"
        );

        if (
          teacher1.subject_id === subject1.subject_id &&
          teacher1.subject_year === subject1.subject_year && // เช็คว่ามี subject_id เดียวกัน
          teacher1.subject_sec !== subject1.subject_sec && // เช็คว่าไม่มี subject_sec ที่ซ้ำกัน
          teacher1.subject_day === subject1.selectedDay &&
          checkOverlap(
            teacher1.subject_start,
            teacher1.subject_end,
            subject1.selectedStart,
            subject1.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          //alert("วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน cvcvcvcv");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกันttt`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })

          return true;
        }

        // คนละวิชา คนละปีหลักสูตร คนละเซค วันเดียวกัน
        else if (
          teacher1.subject_id !== subject1.subject_id &&
          teacher1.subject_year !== subject1.subject_year &&
          teacher1.subject_sec !== subject1.subject_sec &&
          teacher1.subject_day === subject1.selectedDay &&
          checkOverlap(
            teacher1.subject_start,
            teacher1.subject_end,
            subject1.selectedStart,
            subject1.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          //alert("คนละวิชา คนละปีหลักสูตร คนละเซค วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `คนละวิชา คนละปีหลักสูตร คนละเซค วันเดียวกันttt`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // คนละวิชา คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน
        else if (
          teacher1.subject_id !== subject1.subject_id &&
          teacher1.subject_year !== subject1.subject_year &&
          teacher1.subject_sec === subject1.subject_sec &&
          teacher1.subject_day === subject1.selectedDay &&
          checkOverlap(
            teacher1.subject_start,
            teacher1.subject_end,
            subject1.selectedStart,
            subject1.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          //alert("คนละวิชา คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `คนละวิชา คนละปีหลักสูตร เซคเดียวกัน วันเดียวกันttt`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // คนละวิชา ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน
        else if (
          teacher1.subject_id !== subject1.subject_id &&
          teacher1.subject_year === subject1.subject_year &&
          teacher1.subject_sec !== subject1.subject_sec &&
          teacher1.subject_day === subject1.selectedDay &&
          checkOverlap(
            teacher1.subject_start,
            teacher1.subject_end,
            subject1.selectedStart,
            subject1.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          //alert("คนละวิชา ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `คนละวิชา ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกันttt`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // คนละวิชา ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกัน
        else if (
          teacher1.subject_id !== subject1.subject_id &&
          teacher1.subject_year === subject1.subject_year &&
          teacher1.subject_sec === subject1.subject_sec &&
          teacher1.subject_day === subject1.selectedDay &&
          checkOverlap(
            teacher1.subject_start,
            teacher1.subject_end,
            subject1.selectedStart,
            subject1.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          //alert("คนละวิชา ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `คนละวิชา ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกันttt`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // วิชาเดียวกัน คนละปีหลักสูตร คนละเซค วันเดียวกัน
        else if (
          teacher1.subject_id === subject1.subject_id &&
          teacher1.subject_year !== subject1.subject_year &&
          teacher1.subject_sec !== subject1.subject_sec &&
          teacher1.subject_day === subject1.selectedDay &&
          checkOverlap(
            teacher1.subject_start,
            teacher1.subject_end,
            subject1.selectedStart,
            subject1.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          //alert("วิชาเดียวกัน คนละปีหลักสูตร คนละเซค วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน คนละปีหลักสูตร คนละเซค วันเดียวกันttt`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน
        else if (
          teacher1.subject_id === subject1.subject_id &&
          teacher1.subject_year === subject1.subject_year &&
          teacher1.subject_sec !== subject1.subject_sec &&
          teacher1.subject_day === subject1.selectedDay &&
          checkOverlap(
            teacher1.subject_start,
            teacher1.subject_end,
            subject1.selectedStart,
            subject1.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          //alert("วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน ปีหลักสูตรเดียวกัน คนละเซค วันเดียวกันttt`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // วิชาเดียวกัน คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน
        else if (
          teacher1.subject_id === subject1.subject_id &&
          teacher1.subject_year !== subject1.subject_year &&
          teacher1.subject_sec === subject1.subject_sec &&
          teacher1.subject_day === subject1.selectedDay &&
          checkOverlap(
            teacher1.subject_start,
            teacher1.subject_end,
            subject1.selectedStart,
            subject1.selectedEnd
          )
        ) {
          // พบการทับซ้อนกัน
          //alert("วิชาเดียวกัน คนละปีหลักสูตร เซคเดียวกัน วันเดียวกัน");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน คนละปีหลักสูตร เซคเดียวกัน วันเดียวกันttt`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        }

        // วิชาเดียวกัน ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกัน
        else if (
          teacher1.subject_id === subject1.subject_id &&
          teacher1.subject_year === subject1.subject_year &&
          teacher1.subject_sec === subject1.subject_sec

        ) {
          // มีวิชาและหมู่เรียนนี้ในรายวิชาที่เลือกไว้แล้ว
          //alert("วิชาเดียวกัน ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกันtue");
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `วิชาเดียวกัน ปีหลักสูตรเดียวกัน เซคเดียวกัน วันเดียวกันttt`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          return true;
        } else {
          //เพิ่ม db
          if (teacher.length === i + 1) {
            console.log("123456789");

            finalClick();
            return 0;
          }
        }
        console.log("ไม่เข้าสักอัน ควย");
      }
    }

    // else if () {

    // }

    // ไม่พบการทับซ้อนกัน
    return false;
  }

  const renderScheteacher = (value, index) => {
    const handleDelete = () => {
      const updatedSubject = [...subject]; // คัดลอก state เพื่อไม่ให้แก้ไข state โดยตรง
      updatedSubject.splice(index, 1); // ลบข้อมูลที่ต้องการออกจาก array โดยใช้ index ที่ระบุ
      setSubject(updatedSubject); // อัพเดท state ใหม่
    };

    const handleInputChange = (e, index, field) => {
      const { value } = e.target;
      const updatedSubject = [...subject];
      updatedSubject[index][field] = value;
      setSubject(updatedSubject);
    };
    const handleSelectChange = (event, index, subject_major_id) => {
      const { value } = event.target;

      // สร้าง array ใหม่โดยคัดลอก selectedYears เดิมและกำหนดค่าใหม่ให้กับ index ที่แตกต่างกัน
      setSelectedYears((prevState) => {
        const updatedSelectedYears = [...prevState];
        updatedSelectedYears[index] = {
          ...updatedSelectedYears[index],
          [subject_major_id]: value,
        };
        return updatedSelectedYears;
      });

      const updatedSubject = [...subject];
      updatedSubject[index].subject_major_id = value;
      setSubject(updatedSubject);
    };

    // const handleTimeChange = (e, index, field) => {
    //   const { value } = e.target;
    //   const updatedSubject = [...subject];
    //   updatedSubject[index][field] = value;
    //   setSubject(updatedSubject);
    // };

    // const handleYearChange = (yearOptions) => {
    //   setSelectedYear(yearOptions);
    // };

    return (
      <div className="choseTeacher" key={index}>
        <div className="box_sub_id">
          {value.subject_id}-{value.subject_year}
        </div>
        <div className="box_sub_name">{value.subject_name}</div>
        <div className="box_sub_credit">{value.subject_credit}</div>

        <input
          className="box_sub_sec"
          type="text"
          value={value.subject_sec || ""}
          onChange={(e) => handleInputChange(e, index, "subject_sec")}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
          }}
        />
        <input
          className="box_sub_no"
          type="text"
          value={value.subject_no || ""}
          onChange={(e) => handleInputChange(e, index, "subject_no")}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
          }}
          required
          pattern="[0-9]*"
        />
        <div className="box_sub_force_or_not">
          {value.subject_is_require === 1 ? "บังคับ" : "เสรี"}
        </div>
        <div>
          <select
            className="box_sub_major"
            onChange={(e) =>
              handleSelectChange(e, index, value.subject_major_id)
            }
            value={
              selectedYears[index]
                ? selectedYears[index][value.subject_major_id]
                : ""
            }
          >
            <option defaultValue={""} >
              choose
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div
          className="box_sub_day"
          onClick={() =>
            value.subject_sec !== undefined && value.subject_sec !== "" && handleDayChange(index)
          }
        >
          {value.subject_sec !== undefined && value.subject_sec !== "" ? (
            <>
              {value.selectedDay} {value.selectedStart} - {value.selectedEnd}
            </>
          ) : (
            "ใส่หมู่เรียนก่อน"
          )}
        </div>

        <div className="box_delete" onClick={handleDelete}>
          <AiOutlineCloseCircle size={50} color="red" />
        </div>
      </div>
    );
  };


  const finalClick = () => {
    addScheTecherdb();

    // ตรวจสอบว่าโน้ตไม่ว่างเปล่า และไม่มีค่าเท่ากับ "Note..."
    if (note.trim() !== "" && note.trim() !== "Note...") {
      // ปริ้นค่าที่ผู้ใช้ป้อนและค่าของ subject_id ที่สอดคล้องกับ index ทุกตัว
      subject.forEach((item, index) => {
        console.log("ค่าที่ผู้ใช้ป้อน:", item.subject_sec);
        console.log("subject_id:", item.subject_id);
        console.log("subject_sec:", item.subject_sec);
        console.log("subject_required:", item.subject_required);
        console.log("subject_major:", item.subject_major);
        console.log("subject_day:", item.selectedDay); //เพิ่งเพิ่มมาจาก enjoy
      });

      handleConfirm();
    } else {
      // โปรแกรมไม่ต้องทำอะไรเมื่อโน้ตว่างเปล่า หรือมีค่าเป็น "Note..."
      console.log("โน้ตว่างเปล่า หรือมีค่าเป็น 'Note...'");
    }
  };

  const addScheTecherdb = () => {
    subject.forEach((item) => {
      Axios.post("http://localhost:5000/table_subject", {
        user_id: profile.user_id,
        user_name: profile.user_name,
        user_email: profile.user_email,
        subject_id: item.subject_id,
        subject_year: item.subject_year,
        subject_name: item.subject_name,
        subject_sec: item.subject_sec, // ใช้ item.subject_sec ที่เก็บค่าจาก input แทน
        subject_major: item.subject_major_id,
        subject_credit: item.subject_credit,
        subject_no: item.subject_no,
        subject_required: item.subject_is_require,
        subject_day: item.selectedDay,
        subject_start: item.selectedStart,
        subject_end: item.selectedEnd,
        room: "-",
      })
        .then((response) => {
          console.log(response.data);
          // สามารถเพิ่มโค้ดที่ต้องการให้ทำหลังจากส่งข้อมูลสำเร็จได้ที่นี่
        })
        .catch((error) => {
          console.error(error);
          // สามารถเพิ่มโค้ดที่ต้องการให้ทำเมื่อเกิดข้อผิดพลาดในการส่งข้อมูลได้ที่นี่
        });
    });
    Swal.fire({
      icon: "success",
      title: "การดำเนินการสำเร็จ",
      text: `วิชาได้ถูกเพิ่มเข้าไปในระบบแล้ว`, // Assuming teacher array has at least one item
      confirmButtonText: "ตกลง",
    }).then(() => {
      setTimeout(() => {
        window.location.reload(); // Reload the page after a delay
      }, 500); // 500 milliseconds (0.5 second)
    });
  };

  const bfFinal = () => {
    // console.log(subject.length,"กี่วิชาเอ่ยยย")
    if(subject.length === 0){
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถลงทะเบียนรายวิชาได้",
        text: `กรุณาเลือกข้อมูลอย่างน้อย 1 วิชา`, // Assuming teacher array has at least one item
        confirmButtonText: "ตกลง",
      })

    }
    for (let i = 0; i < subject.length; i++) {
      const checkSub = subject[i];
      
      
      if (checkSub.subject_sec === undefined ||
        checkSub.subject_no === undefined ||
        checkSub.selectedDay === undefined ||
        checkSub.selectedStart === undefined ||
        checkSub.selectedEnd === undefined ||
        checkSub.subject_major_id === "T12"
      ) {
        console.log('ggggggggggggggggggggg')
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถลงทะเบียนรายวิชาได้",
          text: `กรุณากรอกข้อมูลให้ครบก่อนกดยืนยัน`, // Assuming teacher array has at least one item
          confirmButtonText: "ตกลง",
        })
      }
      else {
        let flag = checkSubjectOverlap(subject)
        if (flag) {
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลงทะเบียนรายวิชาได้",
            text: `มีวิชาซ้ำกัน`, // Assuming teacher array has at least one item
            confirmButtonText: "ตกลง",
          })
          alert("มีวิชาซ้ำห้ามส่ง");
        } else {
          DBOverlap();
        }

      }
    }

  };

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
      note_time: currentDateTimeString,
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
      console.log(currentDateTimeString);
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

  const handleDayChange = async (index) => {
    const { value } = await Swal.fire({
      title: "เปลี่ยนแปลงวัน",
      input: "select",
      inputOptions: {
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
        Sun: "Sunday",
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
            selectedDay = value; // set selectedDay เป็นค่าที่ถูกเลือก
            resolve();
          } else {
            resolve("Please select a day.");
          }
        });
      },
    });

    if (value) {
      const { value: times } = await Swal.fire({
        title: "เลือกช่วงเวลา",
        html:
          '<label for="start-time">เวลาเริ่มต้น:</label>' +
          '<select id="start-time" class="swal2-select">' +
          '<option value="08.00">08.00</option>' +
          '<option value="08.30">08.30</option>' +
          '<option value="09.00">09.00</option>' +
          '<option value="09.30">09.30</option>' +
          '<option value="10.00">10.00</option>' +
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
          '<option value="10.00">10.00</option>' +
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

          if (startTime >= endTime) {
            Swal.showValidationMessage("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น");
            return false;
          }

          selectedTime = [startTime, endTime]; // set selectedTime เป็นค่าที่ถูกเลือก
          return selectedTime;
        },
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
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
      if (selectedDay && selectedTime) {
        const updatedSubject = [...subject];
        updatedSubject[index].selectedDay = selectedDay;
        updatedSubject[index].selectedStart = selectedTime[0];
        updatedSubject[index].selectedEnd = selectedTime[1];
        setSubject(updatedSubject);
        console.log(subject, "time");
        // ทำอะไรบางอย่างเมื่อผู้ใช้เลือกเวลาเริ่มต้นและสิ้นสุด
        console.log("วัน:", selectedDay);
        console.log("เวลาเริ่มต้น:", selectedTime[0]);
        console.log("เวลาสิ้นสุด:", selectedTime[1]);
        Swal.fire(
          "เวลาที่เลือก",
          "วัน: " +
          selectedDay +
          "\n" +
          "เริ่มต้น: " +
          selectedTime[0] +
          " น." +
          " ,  สิ้นสุด: " +
          selectedTime[1] +
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
          <div className="profileJ" onClick={goTeacher}>
            Profile
          </div>
          <div className="homeJ" onClick={goHome}>
            หน้าหลัก
          </div>
        </div>
      </div>
      <div>
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
        <div className="bxx6">จำนวน(คน)</div>
        <div className="bxx7">บังคับ/เสรี</div>
        <div className="bxx8">ชั้นปี</div>
        <div className="bxx9">วันและเวลา</div>

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
        <div className="submit" onClick={bfFinal}>
          ยืนยัน
        </div>
        <div className="whitebox"></div>
      </div>
    </div>
  );
}

export default ScheTeacher;
