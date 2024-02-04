import NavbarComponent from "./Navbar";
import "../css/component.css"
import study from "../picture/study.jpg"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {getToken} from "../services/authorize";

const SignUp = () => {
    const [state, setState] = useState({
        fname:"",
        lname:"",
        email: "",
        bday: "",
        gender: "",
        tel: "",
        password: "",
        cpassword: "",
    });
    
    const {
        fname, lname , bday, gender, tel, email, password, cpassword} = state;
    
    const inputValue = (name) => (event) => {
        setState({ ...state, [name]: event.target.value });
    };

    const isSubmitEnabled = !fname || !lname || !email || !tel || !gender || !password || !cpassword || !bday ;

      const submitForm=(e)=>{
      
        e.preventDefault();
        console.log("API URL =", process.env.REACT_APP_API)
        console.log(bday)
        axios
        .post(`${process.env.REACT_APP_API}/register`, {fname, lname , bday, gender, tel, email, password}, {
            headers:{
                authorization : `Bearer ${getToken()}`
            }
        })
        .then(response=>{
            Swal.fire({
                title:'Account Created!',
                text:'Your account has been successfully created',
                icon:'success',
                confirmButtonText: "OK",
                confirmButtonColor: '#263A50',
                
            }).then((result) => {
                if (result.isConfirmed) {
                    setState({...state,email:"",fname:"",lname:"", bday:"",gender:"", tel:"",password:"",cpassword:""});
                    window.location.reload();
                }
              });
         
           
        }).catch(err=>{
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
            )
        })
    }
    useEffect(()=>{
        console.log(process.env.REACT_APP_API);

    },[])

    const [passwordMatch, setPasswordMatch] = useState(true);

    function verifyPassword() {
        if (cpassword !== password) {
            setPasswordMatch(false);
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = "Passwords don't match!";
        } else {
            setPasswordMatch(true);
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerHTML = "Passwords match";
        }
    }

 
   
  return (
    <div>
        <NavbarComponent/>
        <div className="main2">
           
                <div className="box-content">
                    <h2>Sign up</h2>
                    <form  onSubmit={submitForm}>
                        <div class="form-group">
                            <label>First Name:</label>
                            <input type="text" class="form-control" value={lname} onChange={inputValue("lname")}/>
                        </div>
                        <div class="form-group">
                            <label>Last Name:</label>
                            <input type="text" class="form-control" value={fname} onChange={inputValue("fname")}/>
                        </div>
                        <div class="form-group">
                            <label>Birthday:</label>
                            <input type="date" class="form-control" value={bday} onChange={inputValue("bday")} />
                        </div>
                        <div>
                            <label >Gender :</label>
                            <select name="gender" value={gender}  class="form-select" onChange={inputValue("gender")}>
                                <option value="" disabled>Please select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="usr">Phone Number :</label>
                            <input type="tel" class="form-control" id="tel" pattern="[0-9]*" minLength={10} maxLength={10} value={tel} onChange={inputValue("tel")}/>
                        </div>
                        <div class="form-group">
                            <label for="usr">Email:</label>
                            <input type="email" class="form-control" value={email} onChange={inputValue("email")} />
                        </div>
                        <div class="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" class="form-control" value={password}  onChange={inputValue("password")}/>
                        </div>
                        <div class="form-group">
                            <label for="pwd">Comfirm Password:</label>
                            <input type="password" class="form-control" value={cpassword}  onChange={inputValue("cpassword")} onKeyUp={()=>verifyPassword()}/>
                            <span id = "message"></span>
                        </div>
                        <div>
                            <input type="submit" value="Sign up" className="btn btn-primary" target="_parent" id="buttonSubmit"   disabled={!passwordMatch || isSubmitEnabled}/>
                        </div>
                    </form>
                    <div className="center">
                        <a href="/" role="button" className="colorPrimary" target="_parent">Already have an account? Log in</a>
                    </div>
                </div>
            
        </div>
    </div>
  );
}

export default SignUp;
