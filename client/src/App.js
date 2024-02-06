import NavbarComponent from "./component/Navbar";
import "../src/css/component.css"
import study from "../src/picture/study.jpg"
import {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {authenticate} from "./services/authorize";
import { useNavigate } from "react-router-dom"
function App() {

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const {email, password} = state;

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const isSubmitEnabled =  !email || !password ;

  let navigate = useNavigate()

  const submitForm=(e)=>{
    e.preventDefault();
    console.log(process.env.REACT_APP_API)
    axios.post(`${process.env.REACT_APP_API}/login`, {email, password})
    .then(response=>{
        authenticate(response, () => navigate('/info'))
       
    }).catch(err=>{
        Swal.fire('แจ้งเตือน', err.response.data.error,'error')
        
    })
  }
  useEffect(()=>{
      console.log(process.env.REACT_APP_API);

  },[])

  return (
    <div>
      <NavbarComponent/>
      <div className="main">
        <div class="flexbox">
          <div className="box none">
            <img src={study} className="img-login"/>
          </div>
          <div className="box content">
            <h2>Login</h2>
            <form onSubmit={submitForm}>
              <div class="form-group">
                <label>Email:</label>
                <input type="email" class="form-control" value={email} onChange={inputValue("email")}/>
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input type="password" class="form-control" value={password}  onChange={inputValue("password")}/>
              </div>
              <div>
                <input type="submit" value="Login" className="btn btn-primary" target="_parent" id="login"  disabled={isSubmitEnabled}/>
              </div>
            </form>
            <div className="center">
              <a href="/signup" role="button" className="colorPrimary" target="_parent">Don't have an account yet? Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
