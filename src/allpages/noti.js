import React, { useEffect, useState } from 'react';
import logo from '../allstyles/englogo.png'
import '../allstyles/noti.css'
import { IoMdCloseCircle } from "react-icons/io";
import axios from 'axios';

function Noti({ setShow }) {
    const [dataNotifi, setDataNotifi] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const getapi = async () => {
            try {
                const dataNotifiapi = await axios.get("http://localhost:5000/notification");
                const data = dataNotifiapi.data;
                setDataNotifi(data)
                console.log(data);
            } catch (err) {
                alert(err.response.data);
            }

        }
        getapi()
    }, [reload])
    const delete_one = async (id) => {
        try {
            const dataNotifiapi = await axios.delete("http://localhost:5000/deletenotifi/" + id);
            const data = dataNotifiapi.data;
            setReload(!reload);
        } catch (err) {
            alert(err.response.data);
        }
    }
    const delete_all = async () => {
        dataNotifi.map((v, i) => {
            delete_one(v.id);
        })
    }
    return (
        <div className="noti-blur1">
            <div className="boxnoti">
                <div className='layout-notifi'>
                    <div className='nofi-flex-rowbox' >

                        <div className="notifi">Notifications</div>
                        <div className="icon-big" onClick={() => setShow(false)}>
                            <IoMdCloseCircle size={45} />
                        </div>

                    </div>
                    <div className='noti-chat-box'>
                        {dataNotifi.length > 0 ? dataNotifi.map((v, i) => (
                            <div className="chatNo1">
                                <div className='noti-text-box'>
                                    {v.name} : {v.info}
                                </div>
                                <div className="icon-small1" onClick={() => { delete_one(v.id) }}>
                                    <IoMdCloseCircle size={25} color='666666' />
                                </div>
                            </div>
                        )
                        ) : <a style={{ fontSize: "20px" }}>ไม่พบ</a>}


                    </div>
                    <div className='nofi-layout-clear-box'>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className="clear" onClick={()=>delete_all()}>เคลียร์</div>
                        </div>


                    </div>

                </div>


            </div>

        </div>
    )
}

export default Noti;