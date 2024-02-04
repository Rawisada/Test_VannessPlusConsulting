import React from "react";
import {Link} from "react-router-dom";
import "../css/Navbar.css"

const Navbar = (props) => {

  
  return (
    <nav>
      <ul className="nav justify-content-end" id="nav">
        <li className="nav-item pr-3 pb-3">
          <Link to="/" className="nav-link" target="_parent">
          Point  1
          </Link>
        </li>
        <li className="nav-item pr-3 pb-3">
          <Link to="/profile"  className="nav-link">
          Point 3
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
