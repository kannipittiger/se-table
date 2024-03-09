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

  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheet = wb.SheetNames;

        if (sheet.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheet[0]]);
          setData(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const clearExcel = () => {
    setData([]);
    Swal.fire({
      title: "Deleted!",
      text: "ลบข้อมูลสำเร็จ",
      icon: "warning",
      confirmButtonText: "OK",
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
      "https://drive.usercontent.google.com/download?id=1gl95LK1fOAk47hvNhAqm9MM0h-oFm2CX&export=download&authuser=2&confirm=t&uuid=e054fd4f-0772-4908-b486-dd37fc01cb9c&at=APZUnTVNmQ8_oiHQx4c5YGdcwIj5:1707400406705"; // เปลี่ยน URL เป็น URL ที่คุณต้องการ
  };

  const PostDB = () => {
    const seen = {};

    const newData = [];
    const newTemp = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj["id"] = "0"+data[i]["id"];
      obj["year"] = data[i]["year"];
      console.log(typeof(obj.id));
      newData.push(obj);
    }

    for (let i = 0; i < tempsubject.length; i++) {
      let obj = {};
      obj["subject_id"] = tempsubject[i]["subject_id"];
      obj["subject_year"] = tempsubject[i]["subject_year"];
      newTemp.push(obj);
    }
    console.log(newData);
    console.log(newTemp);
    const nonDuplicatedItems = newData.filter(item => {
      return !newTemp.some(tempItem => {
        return tempItem.subject_id === item.id && tempItem.subject_year === item.year;
      });
    });
    console.log(nonDuplicatedItems,'nondup');

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < nonDuplicatedItems.length; j++) {
        if (newData[i].id === nonDuplicatedItems[j].id && data[i]["year"] === nonDuplicatedItems[j].year) {
          console.log(data[i]["id"],data[i]["year"],"duplicate");
          Axios.post(`http://localhost:5000/sendtemp`, {
            subject_id: newData[i].id,
            subject_year: data[i]["year"],
            subject_name: data[i]["name"],
            subject_major_id: data[i]["major"],
            subject_credit: data[i]["credit"],
            subject_is_require: data[i]["required"]
          })
            .then((response) => {
              Swal.fire({
                title: "Success!",
                text: "เพิ่มข้อมูลสำเร็จ",
                icon: "success",
                confirmButtonText: "OK",
              });
            })
            .catch((error) => console.log(error));
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
          <div className="sign_in" onClick={goHome}>
            หน้าหลัก
          </div>
          <div className="home_button">sign in</div>
          {/* <div className="sign_in" onClick={goHome}>
            หน้าหลัก
          </div> */}
        </div>
      </div>
      <div className="whitebox">
        <div id="boxDownload" onClick={handleButtonClick}>
          Download Excel
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
