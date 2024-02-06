import React from 'react';
import logo from '../allstyles/englogo.png'
import '../allstyles/chatedu.css'
function Chatedu() 
{
    return (
        <div className='allbox'>
            <div className='header'>
                <img src={logo} className='imglogo' alt='logo'></img>
                <div className='kubar'>
                    <div className=''>
                        <div className='thai-ku'>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</div>
                        <div className='english-ku'>Kasetsart university sriracha campus</div>
                    </div>
                    <div />
                </div>
                <div className='menu-bar'>
                    <div className='home-button'>
                        sign in
                    </div>
                    <div className='sign-in'>
                        หน้าหลัก
                    </div>
                </div>
            </div>
            <div>
            <div className='chat1'></div>
            <div className='chat2'></div>
            <div className='chat3'></div>
            <div className='chat4'></div>
            <div className='chat5'></div>
            <div className='chat6'></div>
            <div className='chat7'></div>
            <div className='chat9'>ไม่สำเร็จ</div>
            <div className='chat10'>สำเร็จ</div>
            <div className='chat11'>ยื่นยันคำร้อง</div>
            <div className='circle1'></div>
            <div className='circle2'></div>
            <div className='circle3'></div>
            <div className='circle4'></div>
            <div className='circle5'></div>
            <div className='circle6'></div>
            <div className='circle7'></div>
            <div className='textยื่นคำร้อง'>ระบบยื่นยันคำร้อง</div>
            <div className='textวันเวลา'>วันเวลา</div>
            <div className='textหัวข้อ'>หัวข้อ</div>
            <div className='textชื่ออาจารย์'>ชื่ออาจารย์</div>
            <div className='textรายละเอียด'>รายละเอียด</div>
            </div>
            <div className='whitebox'>
            </div>
        </div>
    )
}

export default Chatedu