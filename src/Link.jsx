import "./Link.scss";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

function Link({ name, to }){
    var ref = React.createRef();
    var onMouse = {
        over: ()=>{
         /**@type {HTMLElement} */
            var element = ref.current;

            element.classList.add("on-hover");
        },
        out: ()=>{
         /**@type {HTMLElement} */
            var element = ref.current;

            element.classList.remove("on-hover");
        }
    };

    return (
        <div className="nav-link" onMouseOut={onMouse.out} onMouseOver={onMouse.over}>
            <RouterLink ref={ref} to={`/${to}`} className="nav-text">
                {name}
            </RouterLink>
        </div>
    );
}

Link.propTypes = {
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};

export default Link;
