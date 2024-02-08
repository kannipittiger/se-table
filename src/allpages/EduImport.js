import React,{ useState, useEffect } from 'react';
import '../allstyles/EduImport.css';

function EduImport() {

    const [data, setData] = useState([]);

    

    const handleFileSelect = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        event.target.classList.add('drag-over');
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.target.classList.remove('drag-over');
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        console.log(files); 
        event.target.classList.remove('drag-over');
    };

    return (
        <div className='allbox'>
            <label className='b1' 
                   onDragOver={handleDragOver}
                   onDragEnter={handleDragEnter}
                   onDragLeave={handleDragLeave}
                   onDrop={handleDrop}></label>
            <label className='b2' onClick={handleFileSelect}>เลือกไฟล์</label>
            <input type="file" id="fileInput" style={{ display: 'none' }} accept=".xlsx" />
            <label className='b3'>ลากไฟล์ลงมา หรือ คลิกเพื่อเลือกไฟล์</label>
            <label className='b4'>import รายวิชา เป็นนามสกุลไฟล์ .xlsx</label>
            <span className="carbon--close-filled"></span>
            <span className="pajamas--import"></span>
            <label className='whitebox'></label>
        </div>
    );
}

export default EduImport;