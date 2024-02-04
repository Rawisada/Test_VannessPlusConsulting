import NavbarComponent from "./Navbar";
import "../css/component.css"
import study from "../picture/study.jpg"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {getToken} from "../services/authorize";

const FormInternship = () => {
    const [state, setState] = useState({
        fname:"",
        lname:"",
        email: "",
        tel: "",
        university:"",
        position:"",
        date:"",
        gpax:""
    });
    const[profile, setProfile] = useState(null)

    const {
        fname, lname , email,tel, university, position, date, gpax} = state;
    
    const inputValue = (name) => (event) => {
        setState({ ...state, [name]: event.target.value });
    };

    const isSubmitEnabled = !fname || !lname || !email || !tel || !university || !position || !date || !gpax ||!profile ;

      const submitForm=(e)=>{
      
        e.preventDefault();
        console.log("API URL =", process.env.REACT_APP_API)
        console.log(email, fname, lname, tel, university, position,date,gpax,profile)
        axios
        .post(`${process.env.REACT_APP_API}/profile`, {email, fname, lname, tel, university, position,date,gpax,profile}, {
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
                    setState({...state,email:"",fname:"",lname:"", tel:"", university:"", position:"", date:""});
                    setProfile("");
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
    const submitProfile = (event) => {
        if (event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            
            // Check if the selected file is a PDF
            if (selectedFile.type === "application/pdf") {
                let fileName = selectedFile.name;

                setProfile(fileName);
            } else {
                // Handle the case when a non-PDF file is selected
                alert("Please select a PDF file.");
                event.target.value = null; // Clear the file input
            }
        }
    };
    
 


    useEffect(()=>{
        console.log(process.env.REACT_APP_API);

    },[])

  return (
    <div>
        <NavbarComponent/>
        <div className="main2">
           
                <div className="box-content">
                    <h2>Internship application form</h2>
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
                            <label for="usr">Email:</label>
                            <input type="email" class="form-control" value={email} onChange={inputValue("email")} />
                        </div>
                        <div class="form-group">
                            <label for="usr">Phone Number :</label>
                            <input type="tel" class="form-control" id="tel" pattern="[0-9]*" minLength={10} maxLength={10} value={tel} onChange={inputValue("tel")}/>
                        </div>
                        <div class="form-group">
                            <label>University:</label>
                            <input type="text" class="form-control" value={university} onChange={inputValue("university")}/>
                        </div>
                        <div class="form-group">
                            <label>Job Position:</label>
                            <input type="text" class="form-control" value={position} onChange={inputValue("position")}/>
                        </div>
                        <div class="form-group">
                            <label>Start Date - End Date:</label>
                            <input type="text" class="form-control" value={date} onChange={inputValue("date")}/>
                        </div>
                        <div class="form-group">
                            <label>GPAX:</label>
                            <input type="text" class="form-control" value={gpax} onChange={inputValue("gpax")}/>
                        </div>

                        <div class="form-group">
                            <label>CV/Resume:</label>
                            <input type="file" class="form-control" name="pdfFile" accept=".pdf" onChange={submitProfile} />
                        </div>
                        <div>
                        <input type="submit" value="Submit" className="btn btn-primary" disabled={isSubmitEnabled} />
                        </div>
       
                    </form>
                </div>
            
        </div>
    </div>
  );
}

export default FormInternship;
