import Icon from "./Icon";
import Link from "./Link";
import { useState, useEffect } from "react";
import './Nav.scss';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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

    return (
        <div className={`z-[2] bg-white top-0 fixed w-full px-16 items-center h-[100rem] transform ${ visible ? '' : 'translate-y-[-100%]' } transition-all duration-150 ease-out`}>
            <div className="menu mr-[20px] flex justify-between items-center">
                <span className="h-[100rem]"><Icon/></span>
                <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className="line l1"></span>
                    <span className="line l2"></span>
                    <span className="line l3"></span>
                </div>
            </div>
            <ul className={`block relative bg-white p-[25px] top-1 float-end ${isOpen ? '':'hidden'}`}>
                <li><Link to="about_us" name="關於我們" /></li>
                <li><Link to="donate" name="贊助支持" /></li>
                <li><Link to="working_project" name="企劃進度" /></li>
                <li><Link to="join_us" name="加入我們" /></li>
                <li><Link to="login" name="登入"/></li>
            </ul>
        </div>
    );
}

export default Nav;
