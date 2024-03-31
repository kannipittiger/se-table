import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
import Axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { read, utils, writeFile } from "xlsx";
import "../allstyles/import.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Swal from "sweetalert2";

function Import() {
  const navigate = useNavigate();
  const Swal = require("sweetalert2");

  const [data, setData] = useState([]);
  const [tempsubject, setTempsubject] = useState([]);

  const goHome = () => {
    navigate("/");
  };
  const goEdu = () => {
    navigate("/edu");
  };

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      // Check if the file type is CSV
      if (!file.name.endsWith(".csv")) {
        // If the file is not CSV, show an alert
        Swal.fire({
          title: "<b>Error!</b>",
          html: "<b>Please select a CSV file.</b>",
          icon: "error",
          confirmButtonText: "OK",
        });
        return; // Stop further execution
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheet = wb.SheetNames;
        if (sheet.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheet[0]]);
          if (rows.length === 0) {
            // Check if there are no data rows
            // Show an alert if there are no data rows
            Swal.fire({
              title: "<b>No Data!</b>",
              html: "<b>No data found in the CSV file.</b>",
              icon: "warning",
              confirmButtonText: "OK",
            });
            return; // Stop further execution
          }
          setData(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const clearExcel = () => {
    Swal.fire({
      title: "Deleted!",
      text: "ลบข้อมูลสำเร็จ",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.reload();
    });
  };

  const required = (row) => {
    if (row.required === 0) {
      return "เลือก";
    } else if (row.required === 1) {
      return "บังคับ";
    }
  };
  const handleButtonClick = () => {
    window.location.href =
      "https://drive.usercontent.google.com/download?id=1KShN2JG6v4k_uQ8BsDxcCB-KZv_w0Phu&export=download&authuser=0"; // เปลี่ยน URL เป็น URL ที่คุณต้องการ
  };
  const handleCSVexample = () => {
    window.location.href =
      "https://drive.usercontent.google.com/download?id=1XM_jpIEsmZpfAAIJ4mYI9Q0EME5c_h0f&export=download&authuser=0"; // เปลี่ยน URL เป็น URL ที่คุณต้องการ
  };

  const PostDB = () => {
    
    const seen = {};

    const newData = [];
    const newTemp = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj["id"] = "0" + data[i]["id"];
      console.log(obj["id"].length);
      obj["year"] = data[i]["year"];
      newData.push(obj);
      
        
      
      
    }
    

    for (let i = 0; i < tempsubject.length; i++) {
      let obj = {};
      obj["subject_id"] = tempsubject[i]["subject_id"];
      obj["subject_year"] = tempsubject[i]["subject_year"];
      newTemp.push(obj);
    }

    const nonDuplicatedItems = newData.filter((item) => {
      return !newTemp.some((tempItem) => {
        return (
          tempItem.subject_id === item.id && tempItem.subject_year === item.year
        );
      });
    });

    if (nonDuplicatedItems.length === 0) {
      // Show an alert if there are no new data
      Swal.fire({
        title: "<b>No New Data!</b>",
        html: "<b>No new data to be added.</b>",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return; // Stop further execution
    }
    
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < nonDuplicatedItems.length; j++) {
        if( newData[i].id.length  >= 7 && newData[i].id.length  <= 8) {
          if (
            newData[i].id === nonDuplicatedItems[j].id &&
            data[i]["year"] === nonDuplicatedItems[j].year
            
          ) {
            Axios.post(`http://localhost:5000/sendtemp`, {
              subject_id: newData[i].id,
              subject_year: data[i]["year"],
              subject_name: data[i]["name"],
              subject_major_id: data[i]["major"],
              subject_credit: data[i]["credit"],
              subject_is_require: data[i]["required"],
            })
            .then((response) => {
              if (response.status === 200) {
                Swal.fire({
                  title: "Success!",
                  text: "เพิ่มข้อมูลสำเร็จ",
                  icon: "success",
                  confirmButtonText: "OK",
                }).then(() => {
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "มีข้อผิดพลาดเกิดขึ้น",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            })
              .catch((error) => console.log(error));
          }
        }
        else {
          Swal.fire({
            title: "Error!",
            text: "กรุณาตรวจสอบรหัสวิชาอีกครั้ง",
            icon: "warning",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      }
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/subjectid`).then((response) => {
      setTempsubject(response.data);
    });
  }, []);

  return (
    <div className="allbox">
      <div className="header">
        <img src={logo} className="imglogo" alt="logo"></img>
        <div className="kubar">
          <div className="">
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
          <div className="profileG" onClick={goEdu}>
            Profile
          </div>
          <div className="homeG" onClick={goHome}>
            หน้าหลัก
          </div>
          {/* <div className="sign_in" onClick={goHome}>
            หน้าหลัก
          </div> */}
        </div>
      </div>
      <div className="whiteboximport">
        <div id="boxDownload" onClick={handleButtonClick}>
          Download Excel
        </div>
        <div id="boxCSV" onClick={handleCSVexample}>
          CSV Import Example
        </div>
        <label id="boxImport">
          <input
            type="file"
            title="Import"
            style={{ display: "none" }}
            accept=".csv"
            onChange={handleImport}
          />
          Import
        </label>

        <div>
          <label className="textรหัส">รหัสวิชา</label>
          <label className="textวิชา">ชื่อวิชา</label>
          <label className="textหน่วยกิต">หน่วยกิต</label>
          <label className="textบังคับ">บังคับ/เลือก</label>
        </div>

        {data.length > 0 && (
          <div className=" scroll">
            {data.map((row, index) => (
              <div key={index} className="renderimport">
                <div
                  id="boxรหัส"
                  // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >
                  0{row.id}-{row.year}
                </div>
                <div
                  id="boxวิชา"
                  // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >
                  {row.name}
                </div>
                <div
                  id="boxหน่วยกิต"
                  // style={{ flex: 6, border: "2px solid black", margin: "2px" }}
                >
                  {row.credit}
                </div>
                <div
                  id="boxบังคับ"
                  // style={{ flex: 5, border: "2px solid black", margin: "2px" }}
                >
                  {required(row)}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* <div>
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
          </div>
          <div>
            <label id="boxรหัส">0360xxxxx</label>
            <label id="boxรหัส2">0360xxxxx</label>
            <label id="boxรหัส3">0360xxxxx</label>
          </div>
          <div>
            <label id="boxวิชา">SE</label>
            <label id="boxวิชา2">SE</label>
            <label id="boxวิชา3">SE</label>
          </div>
          <div>
            <label id="boxหน่วยกิต">3</label>
            <label id="boxหน่วยกิต2">3</label>
            <label id="boxหน่วยกิต3">3</label>
          </div>
          <div>
            <label id="boxบังคับ">บังคับ</label>
            <label id="boxบังคับ2">บังคับ</label>
            <label id="boxบังคับ3">บังคับ</label>
          </div> */}
        <label id="boxclear" onClick={clearExcel}>
          เคลียร์
        </label>
        <label id="boxสำเร็จ" onClick={PostDB}>
          สำเร็จ
        </label>
      </div>
    </div>
  );
}
export default Import;
