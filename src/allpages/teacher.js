import React from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/teacher.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  signInWithPopup,
  getAuth,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import Noti from "./noti";

function Teacher() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [notishow, setNotishow] = useState(false);

  const [info, setInfo] = useState("");
  const [profile, setProfile] = useState("");

  const [dataNotifi, setDataNotifi] = useState([]);
  const [reload, setReload] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setReload(!reload);
    }, 500); // รีโหลดทุก 0.5 วินาที

    return () => clearInterval(interval);
  }, [reload]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/user`).then((response) => {
      setInfo(response.data);
      console.log(info);
    });
  }, []);

  useEffect(() => {
    const getapi = async () => {
      try {
        const dataNotifiapi = await Axios.get(
          "http://localhost:5000/notification"
        );
        const data = dataNotifiapi.data;
        const userNotifications = data.filter(
          (notification) => notification.user_email === profile.user_email
        );
        setDataNotifi(userNotifications);
        setUnreadNotifications(userNotifications.length);
      } catch (err) {
        alert(err.response.data);
      }
    };
    getapi();
  }, [reload, profile.user_email]);

  const compareUserInfo = () => {
    // เปรียบเทียบข้อมูล user กับ info หรือทำอย่างอื่นตามต้องการ
    if (info.length > 0) {
      for (let i = 0; i < info.length; i++) {
        if (user.email === info[i]["user_email"]) {
          console.log(user);
          setProfile(info[i]);
          console.log(profile);
        }
      }
    }
  };

  const goHome = () => {
    navigate("/");
    handleLogout();
  };

  const goScheteacher = () => {
    navigate("/scheteacher", { state: { profile: profile } });
  };
  const goTable = () => {
    navigate("/tableteacher", { state: { profile: profile } });
  };

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

  useEffect(() => {
    compareUserInfo();
  }, [info]);

  return (
    <div className="allbox">
      {notishow === true ? (
        <Noti setShow={setNotishow} profile={profile}></Noti>
      ) : null}
      <div className={notishow === true ? "t-blur" : ""}>
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
            <div className="profileT">Profile</div>
            <div className="sign-iN" onClick={goHome}>
              หน้าหลัก
            </div>
          </div>
        </div>
        <div>
          <div className="box1t" onClick={goTable}>
            ตรวจสอบความถูกต้อง
          </div>
          <div className="box2t" onClick={goScheteacher}>
            จัดตาราง
          </div>
          <div className="box3t">ชื่อ : {profile.user_name}</div>
          <div className="box4t">สาขา : {profile.user_department}</div>
          <div className="box5t">คณะ : {profile.user_faculty}</div>
          <div className="box6t">เมล : {profile.user_email}</div>
          <div className="box8t">โทร : {profile.user_phone}</div>
          <div className="box9t" onClick={handleLogout}>
            SIGN OUT
          </div>

          <img
            className="circleT"
            src={`${profile.user_image}`}
            alt="profile"
          />
        </div>
        <div className="whitebox">
          <div className="notifiT">
            {unreadNotifications > 0 && (
              <span className="notification-badgeT">{unreadNotifications}</span>
            )}
          </div>
        </div>
        <div
          className="icon-noti"
          onClick={() => {
            setNotishow(true);
          }}
        >
          <IoNotificationsOutline size={50} />
        </div>
      </div>
    </div>
  );
}

export default Teacher;
