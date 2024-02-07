import React,{ useState, useEffect } from "react";
import logo from "../allstyles/englogo.png";
//import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import * as xlsx from "xlsx";
import "../allstyles/import.css";

function Import() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const goHome = () => {
    navigate("/");
  };

  /*const readExcel = async(e) => {
    const file = e.target.file[0];
    const data = await file.arrayBuffer(file);
    const excelfile = xlsx.read(data);
    const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
    const exceljson = xlsx.utils.sheet_to_json(excelsheet);
    console.log(exceljson);
  }*/

  const handleFileUpload = (e) => {
    
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = xlsx.utils.sheet_to_json(sheet);
        setData(parsedData);
        console.log(data);
      };
    
  }
  

  return (
    <div className="allbox">
      <div className="header">
        <img src={logo} className="imglogo" alt="logo"></img>
        <div className="kubar">
          <div className="">
            <div className="thai-ku">
              มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </div>
            <div className="english-ku">
              Kasetsart university sriracha campus
            </div>
          </div>
          <div />
        </div>
        <div className="menu-bar">
          <div className="home-button">sign in</div>
          <div className="sign-in" onClick={goHome}>
            หน้าหลัก
          </div>
        </div>
      </div>
      <div className="whitebox">
        <div id="boxDownload">Download Excel</div>
        <label id="boxImport">
          <input type="file" title="Import" style={{ display:"none" }} accept=".xlsx,.xls" onChange={handleFileUpload} />
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
              {data.map((row,index)=>(
                <div key={index} className="renderimport">
                  <div style={{width:50,height:50,border:'1px solid black',margin:'2px',borderRadius:100}}  >5</div>
                  <div style={{flex:10,border:'1px solid black',margin:'2px'}}>{row['รหัสวิชา']}</div>
                  <div style={{flex:10,border:'1px solid black',margin:'2px'}}>{row['ชื่อวิชา']}</div>
                  <div style={{flex:6,border:'1px solid black',margin:'2px'}}>{row['หน่วยกิต']}</div>
                  <div style={{flex:5,border:'1px solid black',margin:'2px'}}>{row['หมวดวิชา']}</div>
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
