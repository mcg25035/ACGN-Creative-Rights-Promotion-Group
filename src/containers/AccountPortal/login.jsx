import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../slices';
import React from 'react';
import UserApi from '../../utils/UserAPI';
import { sleep } from '../../utils/commonUtils';
import './style.scss';
import './checkMarkStyle.scss';
import TransitionTriangle from '../../transitions/TransitionTriangle';


const Login = () => {
    const [loaded, setLoaded] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { loginStatus } = useSelector((state) => state.userState);
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
            await sleep(750);
            setLoginSuccess(true);
            await sleep(1750);
            window.location.reload();
        } catch (error) {
            // when login failed
            setError(error.message);
            dispatch(setLoading(false));
        }
    };

    
    useEffect(() => {
        (async () => {
            await UserApi.waitUntilLoaded();
            setLoaded(true);
        })()
    })

    useEffect(() =>{
        if (loginStatus) {
            console.log('redirect');
            navigate('/');
        }
    }, [loginStatus, navigate]);


    return (
        <div className="page" ref={pageRef}>
                {loaded && <div ref={unloginElementContainer} className="login-page unlogin">
                <TransitionTriangle active={loginSuccess} text="登入成功" redirectTo='/' />
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
        </div>
    );
};

export default Login;
