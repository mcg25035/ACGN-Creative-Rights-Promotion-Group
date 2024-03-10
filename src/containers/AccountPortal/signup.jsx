import { useState } from 'react';
import axios from 'axios';
import checkString from './form';
import './style.scss';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [email,setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const check = checkString(password,confirm_password,1)
        if (check != true){
            return setError(check)
        }
        try {
            const response = await axios.post('/api/login', {
                username,
                password,
            });

            if (response.status === 200) {
                console.log('Signup successful');
            } else {
                throw new Error('Signup failed');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="page">
            <div>
                <h1><b>註冊</b></h1>
                <span>
                    <input
                        type="email"
                        name="email"
                        placeholder="電子郵件"
                        value={email}
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </span>
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
                <span>
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="確認密碼"
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </span>
                <button onClick={handleSubmit}>註冊</button>
                {error && <p className="error"><b>{error}</b></p>}
            </div>
        </div>
    );
};

export default Signup;
