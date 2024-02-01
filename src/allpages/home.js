import React from 'react';
<<<<<<< HEAD
import logo from '../allstyles/englogo.png';
import '../allstyles/home.css';
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import {gapi} from 'gapi-script';



const Home = () => {

    const clientID = "752843116047-hhm72rl3u54s8lodja586leako4cjnul.apps.googleusercontent.com"
    const [profile, setProfile] = useState(null)

    const navigate = useNavigate();

    useEffect(()=>{
        const initClient = () => {
            gapi.client.init({
                clientId:clientID,
                scope:''
            })
        }
        gapi.load("client:auth2",initClient)
    },[])


    const onSuccess = (res) => {
        setProfile(res.profileObj)
        //navigate('admin');
        console.log('success',res)
    }

    const onFailure = (res) => {
        console.log('failed',res)
    }

    const LogOut = (profile) => {
        //navigate('/');
        setProfile(null);
        console.log('lololololl')
    }
=======
import logo from '../allstyles/englogo.png'
import '../allstyles/home.css'
import GoogleButton from 'react-google-button'
import { signInWithPopup,getAuth, signOut,GoogleAuthProvider } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            localStorage.setItem('token',result.user.accessToken);
            localStorage.setItem('user',JSON.stringify(result.user));
            navigate("teacher");
            console.log(result);
        }catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async() => {
        signOut(auth).then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.clear();
            window.location.reload();
            console.log('logout');
          }).catch((error) => {
            console.error(error);
          });
        }
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
>>>>>>> firebase-login

    return(
        <div className='allbox'>
            {/* <div className='header'>
                <img src={logo} className='imglogo' alt='logo'></img>
                <div className='kubar'>
                    <div className=''>
                        <div className='thai-ku'>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</div>
                        <div className='english-ku'>Kasetsart university sriracha campus</div>
                    </div>
                    <div />
                </div>
                <div className='menu-bar'>
<<<<<<< HEAD
                    <GoogleLogin 
                        clientId={clientID}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                    <GoogleLogout
                        clientId={clientID} buttonText="Log out"
                        onLogoutSuccess={LogOut}
                    />
=======
                    <div 
                        className='sign-in'
                        onClick={handleSignInWithGoogle}
                    >
                        SIGN IN
                    </div>
                    {/* <GoogleButton 
                        type="darl"
                        label="SIGN IN"
                        
                    /> */}
                    <div 
                        className='home'
                    >
                        หน้าหลัก
                    </div>
>>>>>>> firebase-login
                </div>
            </div>
            <div className='whitebox'>
            </div> */}
            {profile ? (
                            <div >
                                <div className ="user-image">
                                <img src ={profile.imageUrl} alt="user image"/>
                                </div>
                                <div className = "email-container">

                                    <p>Name : {profile.name}</p>
                                    <p>Email : {profile.email}</p>
                                </div>
                                <br/><br/>
                                <div className='google-logout-button'>
                                    <GoogleLogout 
                                        clientId = {clientID}
                                        buttonText="Log out" 
                                        onLogoutSuccess={LogOut}

                                    />
                                </div>

                            </div>
                        ) : (
                            <div className='google-login-button'>
                                <GoogleLogin
                                    clientId={clientID}
                                    buttonText='Sing in with Google' 
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}

                                />
                            </div>)}
        </div>
    )
}

export default Home;