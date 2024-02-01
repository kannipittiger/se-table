import React from "react";
import logo from "../allstyles/englogo.png";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import {gapi} from 'gapi-script';
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import "../allstyles/admin.css";
<<<<<<< HEAD
import {LogOut} from "./home.js";

function Admin() {
  const clientID = "752843116047-hhm72rl3u54s8lodja586leako4cjnul.apps.googleusercontent.com"
  
  const navigate = useNavigate();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientID,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, [])

=======
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup,getAuth, signOut,GoogleAuthProvider } from 'firebase/auth';

function Admin() {

  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
        await signOut(auth)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        console.log('logout');
    }catch (error) {
        console.error(error);
    }
}
>>>>>>> firebase-login

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
          <div className="sign-in">หน้าหลัก</div>
        </div>
      </div>
      <div>
        <div className="box1">บทบาท</div>
        <div className="box2">ตรวจสอบความถูกต้อง</div>
        <div className="box3">
          <text>ชื่อ :</text>
        </div>
        <div className="box4">
          <text>สาขา : </text>
        </div>
        <div className="box5">
          <text>คณะ : </text>
        </div>
        <div className="box6">
          <text>เมล : </text>
        </div>
        <div className="box8">
          <text>โทร : </text>
        </div>
<<<<<<< HEAD
        <GoogleLogout 
          clientId={clientID} buttonText="Log out" 
        />
=======
        <div className="box9" onClick={handleLogout}>SIGN OUT</div>
>>>>>>> firebase-login
        <div className="circle"></div>
      </div>
      <div className="whitebox"></div>
    </div>
  );
}
export default Admin;
