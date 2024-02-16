import Icon from "./Icon";
import Link from "./Link";
import { useState, useEffect } from "react";
import './Nav.scss';


function Nav(){
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const visible = prevScrollPos > currentScrollPos;

            setPrevScrollPos(currentScrollPos);
            setVisible(visible);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);
    return <div className={`bg-white top-0 fixed w-full flex px-16 items-center h-[80rem] z-[1] transform ${visible ? '' : 'translate-y-[-100%]'} transition-all duration-150 ease-out`}>
        <li className="mr-auto"><Icon /></li>
        <ul className="w-1/2 flex items-center justify-between">
            <li><Link to="about_us" name="關於我們" /></li>
            <li><Link to="donate" name="贊助支持" /></li>
            <li><Link to="working_project" name="企劃進度" /></li>
            <li><Link to="join_us" name="加入我們" /></li>
            <li><Link to="login" name="Login"/></li>
        </ul>
    </div>;
}

export default Nav;
