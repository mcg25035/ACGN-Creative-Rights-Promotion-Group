import logo from '/logo.png';
import { Link } from "react-router-dom";

function Icon(){
    var style = {
        height: "100%",
        width: "auto",
        cursor: "pointer"
    };

    return (
        <Link to={"/"}>
            <img style={style} className='nav-icon' src={logo} />
        </Link>
    );
}

export default Icon;
