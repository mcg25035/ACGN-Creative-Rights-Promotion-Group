import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../slices';
import React from 'react';
import UserApi from '../../utils/UserAPI';
import { sleep } from '../../utils/commonUtils';
import './style.scss';
import './checkMarkStyke.scss';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const authorized = useSelector((state) => !!state.loginToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginSuccessOverlay = React.createRef();
    const unloginElementContainer = React.createRef();
    const pageRef = React.createRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            /**@type {HTMLElement} */
            var overlay = loginSuccessOverlay.current;
            /**@type {HTMLElement} */
            var unloginElement = unloginElementContainer.current;
            dispatch(setLoading(true));
            await UserApi.login(username, password);

            // when login success
            dispatch(setLoading(false));
            overlay.classList.add('active');
            var currentHeight = unloginElement.clientHeight;
            await sleep(750);
            setLoginSuccess(true);
            /**@type {HTMLElement} */
            var page = pageRef.current;
            page.style.setProperty('--current-height', `${currentHeight}px`);
            await sleep(1000);
            window.location.reload();
        } catch (error) {
            // when login failed
            setError(error.message);
            dispatch(setLoading(false));
        }
    };

    useEffect(() =>{
        if (authorized) {
            console.log('redirect');
            navigate('/');
        }
    }, [authorized, navigate]);


    return (
        <div className="page" ref={pageRef}>
            {!loginSuccess && <div ref={unloginElementContainer} className="unlogin">
                <div ref={loginSuccessOverlay} className='overlay inactive'></div>
                <h1><b>登入</b></h1>
                <span>
                    <input
                        type="text"
                        name="username"
                        placeholder="使用者名稱"
                        value={username}
                        autoComplete='off'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </span>
                <span>
                    <input
                        type="password"
                        name="password"
                        placeholder="密碼"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </span>
                <button onClick={handleSubmit}>登入</button>
                {error && <p className="error">{error}</p>}
            </div>}
            {loginSuccess && <div className="login">
                <div className='ac-container'>
                    <div className="animation-component circle-loader load-complete">
                        <div className="animation-component checkmark draw" style={{ display: "block" }} />
                    </div>
                </div>
                <h1><b>登入成功</b></h1>
            </div>}
        </div>
    );
};

export default Login;
