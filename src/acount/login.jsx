import { useState } from 'react';
import axios from 'axios';
import './login.scss'; // Import Sass file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Add state for error handling

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
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h1>登入 Login</h1>
                <span>
                    <h2>帳號名稱 Username</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="名稱"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </span>
                <span>
                    <h2>密碼 Password</h2>
                    <input
                        type="password"
                        name="password"
                        placeholder="密碼"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </span>
                <button type="submit">登入</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
