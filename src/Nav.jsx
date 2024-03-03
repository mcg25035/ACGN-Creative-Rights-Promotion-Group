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
        <div>
            <div className={`bg-white z-[5] top-0 fixed w-full px-16 items-center h-[100rem] transform ${ visible ? '' : 'translate-y-[-100%]' } transition-all duration-150 ease-out`}>
                <div className="menu mr-[20px] flex justify-between items-center">
                    <span className="h-[100rem]"><Icon/></span>
                </div>
                {/* block relative bg-white p-[25px] top-1 float-end */}
            </div>
            <div className={`bg-transparent z-[7] top-0 fixed w-full px-16 items-center h-[100rem] transform ${ visible ? '' : 'translate-y-[-100%]' } transition-all duration-150 ease-out`}>
                <div className="menu-transparent mr-[20px] flex justify-between items-center">
                    <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span className="line l1"></span>
                        <span className="line l2"></span>
                        <span className="line l3"></span>
                    </div>
                </div>
                {/* block relative bg-white p-[25px] top-1 float-end */}
            </div>
            <ul className={`menu z-[6] ${isOpen ? '':'menu-hidden'}`}>
                    <li className="navbar-area"></li>
                    <li><Link to="about_us" name="關於我們" subtext="About Us" /></li>
                    <li><Link to="donate" name="贊助支持" subtext="Donate"/></li>
                    <li><Link to="working_project" name="企劃進度" subtext="Project Progress" /></li>
                    <li><Link to="join_us" name="加入我們" subtext="Join Us" /></li>
                    <li><Link to="login" name="登入" subtext="Login"/></li>
                    <li><Link to="login" name="測試多一項" subtext="test"/></li>
                </ul>
            <div className={`menu-overlay z-[4] ${isOpen ? '':'menu-hidden'}`}>
            </div>
        </div>
    );
}

export default Nav;
