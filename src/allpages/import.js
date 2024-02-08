import React, { useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
//import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { read, utils, writeFile } from "xlsx";
import "../allstyles/import.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Import() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [columnArray, setColumn] = useState([]);
  const [values, setValues] = useState([]);

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

  const muad = (row) => {
    if (row.muad == 0) {
      return <div>บังคับ</div>;
    } else if (row.muad == 1) {
      return <div>เลือก</div>;
    }
  };
  const handleButtonClick = () => {
    window.location.href =
      "https://drive.usercontent.google.com/download?id=1gl95LK1fOAk47hvNhAqm9MM0h-oFm2CX&export=download&authuser=2&confirm=t&uuid=e054fd4f-0772-4908-b486-dd37fc01cb9c&at=APZUnTVNmQ8_oiHQx4c5YGdcwIj5:1707400406705"; // เปลี่ยน URL เป็น URL ที่คุณต้องการ
  };

  // const handleFileUpload = (e) => {
  //     const reader = new FileReader();
  //     reader.readAsBinaryString(e.target.files[0]);
  //     reader.onload = (e) => {
  //       const data = e.target.result;
  //       const workbook = xlsx.read(data, { type: "binary" });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const parsedData = xlsx.utils.sheet_to_json(sheet);
  //       setData(parsedData);
  //       console.log(data);
  //     };

  // }

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
          <div class=" scroll">
            {data.map((row, index) => (
              <div key={index} className="renderimport">
                <div
                  id="boxรหัส"
                  // style={{ flex: 10, border: "2px solid black", margin: "2px" }}
                >
                  {row.code}
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
                  {row.point}
                </div>
                <div
                  id="boxบังคับ"
                  // style={{ flex: 5, border: "2px solid black", margin: "2px" }}
                >
                  {muad(row)}
                </div>
                {/* <div id="" style={{border:'1px solid black'}} key={index}>{row['รหัสวิชา']}</div>
                  <div id="" key={index}>{row['ชื่อวิชา']}</div>
                  <div id="" key={index}>{row['หน่วยกิต']}</div>
                  <div id="" key={index}>{row['หมวดวิชา']}</div> */}
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
        <label id="boxclear">เคลียร์</label>
        <label id="boxสำเร็จ">สำเร็จ</label>
      </div>
    </div>
  );
}
export default Import;
