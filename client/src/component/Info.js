import NavbarComponent from "./Navbar";
import logout_icon from "../picture/logout-w.png"
import React, { useState, useEffect } from "react";
import { getEmail, logout} from "../services/authorize";
import axios from "axios";
import {getToken} from "../services/authorize";
import { useNavigate } from "react-router-dom"


const Info = () => {
    const[users, setUser] = useState([])
    let navigate = useNavigate()
    const onlogout=()=>{
        logout(() => navigate('/'))

    }
    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/info/${getEmail()}`, {
            headers:{
                authorization : `Bearer ${getToken()}`
            }
        })
        .then(response=>{
            setUser(response.data)
            console.log(users)
        }).catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
    },[])




    console.log(getEmail())
   
  return (
    <div>
        <a className="colorPrimary logout" onClick={onlogout} style={{textDecoration:"none"}}><img src={logout_icon} className="icon"/> Logout</a>
        <div className="main colorPrimary">
           
                <div className="box-content">
                    <h1 className="center">Profile</h1>
                    <p>Email: {users && users.email}</p>
                    <p>FirstName: {users && users.fname}</p>
                    <p>LastName: {users && users.lname}</p>
                    <p>Birthday: {users && new Date(users.birthday).toLocaleDateString('en-GB')}</p>
                    <p>Gender: {users && users.gender}</p>
                    <p>Tel: {users && users.tel}</p>
    
                </div>
            
        </div>
    </div>
  );
}

export default Info;
