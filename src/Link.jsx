import "./Link.css"
import React from "react"
import { Link as RouterLink } from "react-router-dom";

function Link({ name, to}){
   return (
        <div className="nav-link">
            <RouterLink to={`/${to}`} className="nav-text">{name}</RouterLink>
        </div>
   );
}

export default Link;
