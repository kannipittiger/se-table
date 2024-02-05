import React from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/home.css";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("admin");
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const goMajor = () => {
    navigate("major");
  };

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        window.location.reload();
        console.log("logout");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="allbox">
      <div className="header">
        <img src={logo} className="imglogo" alt="logo"></img>
        <div className="kubar">
          
            <div className="thai_ku">
              มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </div>
            <div className="english_ku">
              Kasetsart University Sriracha Campus
            </div>
          
        </div>
        <div className="menu_bar">
          <div className="sign_in" onClick={handleSignInWithGoogle}>
            <div>
              SIGN IN
            </div>
            <FcGoogle size={25}/>
          </div>
          <div className="home_button" onClick={goMajor}>
            หลักสูตร
          </div>
        </div>
      </div>
      <div className="whitebox"></div>
    </div>
  );
};

export default Home;
