import React from 'react';
import logo from '../allstyles/englogo.png'
import '../allstyles/SubmitEdu.css'

function SubEdu() 
{
    return(
        <div className='allbox'>
            <div className='header'>
                <img src={logo} className='imglogo' alt='logo'></img>
                <div className='kubar'>
                    <div className=''>
                        <div className='thai-ku'>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</div>
                        <div className='english-ku'>Kasetsart university sriracha campus</div>
                    </div>
                    <div/>
                </div>
                <div className='menu-bar'>
                    <div className='home-button'>Profile</div>
                    <div className='sign-in'>หน้าหลัก</div>
                </div>
            </div>
            <div>
                <label className='box1'>ระบบยื่นคำร้อง</label>
                <label className='box2'>วันเวลา</label>
                <label className='box3'>หัวข้อ</label>
                <label className='box4'>ชื่ออาจารย์</label>
                <label className='box5'>รายละเอียด</label>
                <label className='box6'>ยืนยันคำร้อง</label>
                <label className='box7'>สำเร็จ</label>
                <label className='box8'>ไม่สำเร็จ</label>
                <label className='circle'></label>
                <label className='circle1'></label>
                <label className='circle2'></label>
                <label className='rectangle'></label>
                <label className='rectangle1'></label>
                <label className='rectangle2'></label>
                <label className='whitebox'></label>
            </div>
        </div>

    )
}

export default SubEdu