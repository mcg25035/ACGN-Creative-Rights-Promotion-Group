import Icon from "./Icon";
import Link from "./Link";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import './Nav.scss';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const { loginStatus } = useSelector((state) => state.userState);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        //TODO: call api to logout?
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
            <div className={`bg-white z-[5] top-0 fixed w-full px-16 items-center h-[100rem] transform ${ isOpen ? '' : (visible ? '' : 'translate-y-[-100%]') } transition-all duration-150 ease-out`}/>
            <div className={` bg-transparent z-[7] top-0 fixed w-full px-16 items-center h-[100rem] transform ${ isOpen ? '' : (visible ? '' : 'translate-y-[-100%]') } transition-all duration-150 ease-out`}>
                <div className="menu-transparent mr-[20px] flex justify-between items-center">
                    <span className="h-[100rem]"><Icon/></span>
                    <div className={` cursor-pointer ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span className="line l1"></span>
                        <span className="line l2"></span>
                        <span className="line l3"></span>
                    </div>
                </div>
            </div>
            <div className={`menu z-[6] ${isOpen ? '':'menu-hidden'}`}>
                <ul>
                    <li onClick={toggleMenu}><Link to="about_us" name="關於我們" subtext="About Us" /></li>
                    <li onClick={toggleMenu}><Link to="donate" name="贊助支持" subtext="Donate"/></li>
                    <li onClick={toggleMenu}><Link to="working_project" name="企劃進度" subtext="Project Progress" /></li>
                    <li onClick={toggleMenu}><Link to="join_us" name="加入我們" subtext="Join Us" /></li>
                    {!loginStatus && <li onClick={toggleMenu}><Link to="login" name="登入" subtext="Login"/></li>}
                    {loginStatus && <li onClick={logout}><Link to="" name="登出" subtext="Logout"/></li>}
                    {loginStatus && <li onClick={toggleMenu}><Link to="profile" name="帳號" subtext="Profile"/></li>}
                    {loginStatus && <li onClick={toggleMenu}><Link to="post_article" name="發文" subtext="Post"/></li>}
                    <li onClick={toggleMenu}><Link to="login" name="測試多一項" subtext="test"/></li>
                    <li onClick={toggleMenu}><Link to="login" name="測試多一項" subtext="test"/></li>
                </ul>
            </div>
            <div className={`menu-overlay z-[4] ${isOpen ? '':'menu-hidden'}`}/>
        </div>
    );
}

export default Nav;
