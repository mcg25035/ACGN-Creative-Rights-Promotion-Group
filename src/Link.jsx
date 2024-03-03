import "./Link.scss";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

function Link({ name, to, subtext }){
    var ref = [React.createRef()];
    var onMouse = {
        over: ()=>{
            for (var i = 0; i < ref.length; i++){
                /**@type {HTMLElement} */
                var element = ref[i].current;
                if (!element) continue;
                element.classList.add("on-hover");
            }
        },
        out: ()=>{
            for (var i = 0; i < ref.length; i++){
                /**@type {HTMLElement} */
                var element = ref[i].current;
                if (!element) continue;
                element.classList.remove("on-hover");
            }
        }
    };

    return (
        <div className="nav-link" onMouseOut={onMouse.out} onMouseOver={onMouse.over}>
            <RouterLink ref={ref[0]} to={`/${to}`} className="nav-text">
                <p className="text-main">{name}</p>
                {subtext && <p className="text-sub">{subtext}</p>}
            </RouterLink>
        </div>
    );
}

Link.propTypes = {
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};

export default Link;
