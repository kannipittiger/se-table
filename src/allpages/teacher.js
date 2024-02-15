import React from 'react';
import logo from '../allstyles/englogo.png'
import '../allstyles/teacher.css'
import { auth, googleAuthProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
    signInWithPopup,
    getAuth,
    signOut,
    GoogleAuthProvider,
  } from "firebase/auth";
function Teacher() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await signOut(auth);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
          console.log("logout");
        } catch (error) {
          console.error(error);
        }
      };

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
            <div className='box1'>ตรวจสอบความถูกต้อง</div>
            <div className='box2'>จัดตาราง</div>
            <div className='box3'><text>ชื่อ :</text></div>
            <div className='box4'><text>สาขา :</text></div>
            <div className='box5'><text>คณะ :</text></div>
            <div className='box6'><text>เมล :</text></div>
            <div className='box8'><text>โทร :</text></div>
            <div className='box9' onClick={handleLogout} >SIGN OUT</div>
            <div className='circle'></div>
            </div>
            <div className='whitebox'>
            </div>
        </div>
    )
}

export default Teacher;