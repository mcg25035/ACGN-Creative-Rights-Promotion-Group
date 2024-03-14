import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../slices';
import UserApi from '../../utils/UserAPI';
import './style.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const response = await UserApi.login(username, password);

            if (response.status === 200) {
                console.log('Login successful');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="page">
            <div>
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
            </div>
        </div>
    );
};

export default Login;
