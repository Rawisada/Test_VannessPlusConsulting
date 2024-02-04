import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import UserRoute from "./UserRoute";
import App from "./App";
import SignUp from "./component/SignUp";
import Info from "./component/Info";
import { getEmail} from "./services/authorize";
import FormInternship from "./component/FormInternship"



const MyRoute=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/info" element={getEmail ? <Info/> : <Navigate to="/login"/>}   />
                <Route path="/profile" element={<FormInternship/>} />
            
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoute;