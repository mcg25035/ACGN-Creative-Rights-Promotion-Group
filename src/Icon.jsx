import logo from '/logo.png';
import { Link } from "react-router-dom";

function Icon(){
    return (
        <Link to={"/"} className="">
            <img className='logo h-full' src={logo} />
        </Link>
    );
}

export default Icon;
