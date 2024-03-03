import { useState } from 'react';
import axios from 'axios';
import './style.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/api/login', {
                username,
                password,
            });

            if (response.status === 200) {
                console.log('Login successful');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            setError(error.message);
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
