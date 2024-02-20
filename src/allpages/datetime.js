import React, { useState, useEffect } from "react";
import "../allstyles/datetime.css";

function Datetime() {
  const [data, setData] = useState([]);

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
    <div className="boxsum">
      <label id="Textdate">Date :</label>
      <select className="Date">
        <option>Select</option>
        <option>วันจันทร์</option>
        <option>วันอังคาร</option>
        <option>วันพุธ</option>
        <option>วันพฤหัสบดี</option>
        <option>วันศุกร์</option>
        <option>วันเสาร์</option>
        <option>วันอาทิตย์</option>
      </select>
      <label id="Texttime">Time :</label>
      <select className="Time">
        <option>Select</option>
        <option>08.00-08.30</option>
        <option>08.30-09.00</option>
        <option>09.00-09.30</option>
        <option>09.30-10.00</option>
        <option>10.00-10.30</option>
        <option>10.30-11.00</option>
        <option>11.00-11.30</option>
        <option>11.30-12.00</option>
        <option>12.00-12.30</option>
        <option>12.30-13.00</option>
        <option>13.00-13.30</option>
        <option>13.30-14.00</option>
        <option>14.30-15.00</option>
        <option>15.00-15.30</option>
        <option>15.30-16.00</option>
        <option>16.00-16.30</option>
        <option>16.30-17.00</option>
        <option>17.00-17.30</option>
        <option>17.30-18.00</option>
        <option>18.00-18.30</option>
        <option>18.30-19.00</option>
        <option>19.00-19.30</option>
        <option>19.30-20.00</option>
        <option>20.00-20.30</option>
        <option>20.30-21.00</option>
        <option>21.00-21.30</option>
        <option>21.30-22.00</option>
      </select>
      <div id="boxsummitdate">submit</div>
    </div>
  );
}

export default Datetime;
