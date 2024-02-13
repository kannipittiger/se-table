import React from 'react';
import logo from '../allstyles/englogo.png'
import '../allstyles/teacher.css'
function Teacher() {

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
                    <div className='sign-iN'>
                        หน้าหลัก
                    </div>
                </div>
            </div>
            <div>
            <div className='box1t'>ตรวจสอบความถูกต้อง</div>
            <div className='box2t'>จัดตาราง</div>
            <div className='box3t'><text>ชื่อ :</text></div>
            <div className='box4t'><text>สาขา :</text></div>
            <div className='box5t'><text>คณะ :</text></div>
            <div className='box6t'><text>เมล :</text></div>
            <div className='box8t'><text>โทร :</text></div>
            <div className='box9t'>SIGN OUT</div>
            <div className='circleT'></div>
            </div>
            <div className='whitebox'>
            </div>
        </div>
    )
}

export default Teacher;