import React from 'react';
import logo from '../allstyles/englogo.png'
import '../allstyles/home.css'

const Home = () => {
    return(
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
            <div className='whitebox'>
            </div>
        </div>
    )
}

export default Home;