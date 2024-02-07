import Icon from "./Icon";
import Link from "./Link";
import "./Nav.css"



function Nav(){
    var ul_style = {
        position: "relative",
        height: "100%"
    }

    return <div className="navbar">
        <ul style={ul_style}>
            <li className="nav-logo"><Icon /></li>
            <li><Link to="join_us" name="加入我們" /></li>
            <li><Link to="working_project" name="進行中企劃" /></li>
            <li><Link to="donate" name="贊助支持" /></li>
            <li><Link to="about_us" name="關於我們" /></li>
        </ul>
    </div>
}

export default Nav;