

import { useSelector } from 'react-redux';
import UserAPI from '../utils/UserAPI';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Logout = () => {
    const navigate = useNavigate();
    const {loginStatus} = useSelector((state) => state.userState);
    useEffect(()=>{
        async function logout() {
            if (!loginStatus) {
                navigate('/');
            }
            else {
                await UserAPI.logout();
                navigate('/');
                window.location.reload();
            }
        }
        logout();
    }, [loginStatus]);

    return (
        <>
        </>
    );
};

export default Logout;
