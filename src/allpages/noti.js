import React from 'react';
import logo from '../allstyles/englogo.png'
import '../allstyles/noti.css'
import { IoMdCloseCircle} from "react-icons/io";

function Noti() 
{
    return(
    <div className="boxnoti">
        <div className="notifi">Notifications</div>
        <div className="clear">เคลียร์</div>
        <div className="circleNo1"></div>
        <div className="circleNo2"></div>
        <div className="circleNo3"></div>
        <div className="circleNo4"></div>
        <div className="chatNo1"></div>
        <div className="chatNo2"></div>
        <div className="chatNo3"></div>
        <div className="chatNo4"></div>
        <div className="icon-big">
        <IoMdCloseCircle size={45}/>
        </div>
        <div className="icon-small1">
        <IoMdCloseCircle size={25} color='666666'/>
        </div>
        <div className="icon-small2">
        <IoMdCloseCircle size={25} color='666666'/>
        </div>
        <div className="icon-small3">
        <IoMdCloseCircle size={25} color='666666'/>
        </div>
        <div className="icon-small4">
        <IoMdCloseCircle size={25} color='666666'/>
        </div>
    </div>
    )
}

export default Noti;