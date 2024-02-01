import React from 'react';
import logo from '../allstyles/englogo.png'
import '../allstyles/edu.css'
function Edu() 
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
                <div className='box1'><text>ตรวจสอบความถูกต้อง</text></div>
                <div className='box2'><text>จัดตาราง</text></div>
                <div className='box3'><text>ชื่อ:</text></div>
                <div className='box4'><text>สาขา:</text></div>
                <div className='box5'><text>คณะ:</text></div>
                <div className='box6'><text>เมล:</text></div>
                <div className='box7'><text>เพิ่มรายวิชา</text></div>
                <div className='box8'><text>โทร:</text></div>
                <div className='box9'><text>Sign out</text></div>
                <div className='circle'></div>
                <div className='whitebox'></div>
            </div>
        </div>

    )
}

export default Edu