import React from 'react';
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