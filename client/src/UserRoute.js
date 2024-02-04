import { Component, } from "react";
import { getEmail} from "./services/authorize";
import { Routes, Route, Navigate,Outlet  } from 'react-router-dom';


const UserRoute = (component) => {
    return getEmail ? <Component />: <Navigate to="/login" />;
}
export default UserRoute;