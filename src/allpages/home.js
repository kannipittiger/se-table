import React from "react";
import logo from "../allstyles/englogo.png";
import "../allstyles/home.css";
import GoogleButton from "react-google-button";
import {
  signInWithPopup,
  getAuth,
  signOut,
  GoogleAuthProvider,
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

  const goRoll = () => {
    navigate("roll");
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
  /*const handleSignInWithGoogle = async () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                console.log(user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(error)
            });
    }

    const handleLogout = async() => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('log out');
        }).catch((error) => {
            // An error happened.
        });
    }*/

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
          <div className="sign-in" onClick={handleSignInWithGoogle}>
            SIGN IN
          </div>
          {/* <GoogleButton 
                        type="darl"
                        label="SIGN IN"
                        
                    /> */}
          <div className="home" onClick={goRoll}>
            Roll
          </div>
        </div>
      </div>
      <div className="whitebox"></div>
    </div>
  );
};

export default Home;
