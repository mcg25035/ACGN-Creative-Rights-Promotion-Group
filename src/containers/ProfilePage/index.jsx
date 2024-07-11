import SwitchInput from './SwitchInput';
import ImageInput from './ImageInput';
import './Profile.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import UserAPI from '../../utils/UserAPI';
import TransitionTriangle from '../../transitions/TransitionTriangle';

// XXX: mock
/**
 * @typedef {Object} Mock
 * @property {string} display
 * @property {string} type
 * @property {boolean} editable
 * @property {*} value
 * @property {[any, Function]} state
 */

/**
 * @type {Mock[]} mockData
 */
const mockData = [
    { name:"userId", display:"使用者名稱", type:"string", editable: false, value: "codingbear" },
    { name:"password", display:"密碼", type:"password", editable: true, value: null },
    { name:"confirmPassword", display:"確認密碼", type:"password", editable: true, value: null }
    // { name:"累積發文數", type:"number", editable: false, value: 276 },
    // { name:"上線顯示", type:"boolean", editable: true, value: true },
    // { name:"頭貼", type:"image", editable: true, value: "https://cdn.discordapp.com/attachments/763787703958372402/1209053537628323900/image.png?ex=65e585da&is=65d310da&hm=51f9cfce771d3b41cfb53286a3ad4ec9fbea74bdec59764830c82d14bd5bd3bf&" },
    // { name:"自我介紹"}
];

const ProfilePage = () => {
    // const updateProfile = () => {
    //     // TODO: update profile
    // };
    const { loginStatus, currentUserId } = useSelector((state) => state.userState);
    const [activeTransition, setActiveTransition] = useState(false);
    // mockData[0].value = currentUserId;
    mockData.find((data) => data.name === 'userId').value = currentUserId;
    mockData.forEach((data) => {
        // if (!data.editable) return;
        let initState = "";
        if (data.type === "password") initState = "********";
        if (data.type === "boolean") initState = data.value;
        if (data.type === "image") initState = data.value;
        if (data.type === "string") initState = data.value;
        if (data.type === "number") initState = data.value;
        
        const state = useState(initState);
        const [stateValue, setStateValue] = state;
        useEffect(()=>{
            setStateValue(initState);
        },[loginStatus])

        //Debug
        // useEffect(() => {
        //     console.log(stateValue);
        // },[state[0]])

        data.state = state;
        // console.log(data.state, data.type)
    })
    const [textHint, setTextHint] = useState('');
    const navigate = useNavigate();

    const mapInputType = (type) => {
        switch (type) {
            case 'string':
                return 'text';
            default:
                return type;
        }
    };

    const getMockStateValue = (name) => {
        const mock = mockData.find((data) => data.name === name);
        if (!mock) return undefined;
        const [state, setState] = mock.state;
        return state;
    }

    const renderInput = (data,events={}) => {
        const { type } = data;
        switch (type) {
            case 'string':
            case 'password':
            case 'number':
                return renderCommonInput(data,events);
            case 'boolean':
                return renderSwitchInput(data,events);
            case 'image':
                return renderImageInput(data,events);
            default:
                return null;

        }

    };

    const rendetInputRow = (data) => {
        const { display } = data;
        const [showHint, setShowHint] = useState(false);
        var events = {
            onFocus: () => setShowHint(true),
            onBlur: () => setShowHint(false)
        }
        return (
            <label key={display}>
                <span>{display}</span>
                {renderInput(data,events)}
                {showHint && textHint.length > 0 && <p className='hint'></p>}
                {showHint && textHint.length > 0 && <p className="hint">{textHint}</p>}
            </label>
        );
    };

    /**
     * @param {Mock} mock 
     * @param {*} events 
     * @returns 
     */
    const renderCommonInput = (mock, events={}) => {
        const { display, state, editable, type } = mock;
        const [value, setValue] = state;
        const fixedType = mapInputType(type);
        const onChange = (input) => {
            if (events.onChange) events.onChange();
            setValue(input.target.value);
        };
        const onFocus = ()=>{
            if (events.onFocus) events.onFocus();
            if (editable) return;
            setTextHint('該欄位不可編輯');
        }
        const onBlur = ()=>{
            if (events.onBlur) events.onBlur();
            if (editable) return;
            setTextHint('');
        }
        return (
            <input
                type={fixedType}
                name={display}
                readOnly={!editable}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        );
    };

    const renderSwitchInput = ({ editable, value }) => {
        const onClick = () => {
            if (editable) {
                // TODO: update value;
            }
        };

        return (
            <SwitchInput value={value} onClick={onClick} />
        );
    };

    const renderImageInput = ({ value, name, editable }) => {
        return (
            <ImageInput value={value} name={name} editable={editable} />
        );
    };

    if (!loginStatus) {
        navigate('/');
    }

    const submit = async () => {
        /**@type {String} */
        var password = getMockStateValue("password");
        var confirmPassword = getMockStateValue("confirmPassword");
        if (password !== confirmPassword) {
            toast.error('密碼不一致', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        password = password.passwordProcess();

        var userData = {
            password: password,
            // nickname: getMockStateValue("nickname"),
            // realname: getMockStateValue("realname"),
            // email: getMockStateValue("email"),
        }

        try{
            await UserAPI.updateUserInfo(currentUserId, userData);
            setActiveTransition(true);
        }
        catch(error) {
            console.error(error);
            return toast.error('此事件交互失敗', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

        

    };

    return (
        <div className="profile-page">
            <div className="profile-block-wrapper">
                <TransitionTriangle active={activeTransition} text='更新成功' redirectTo='/' transitionTime={0.65} />
                <div className='option-wrapper'>
                    {mockData.map(rendetInputRow)}
                </div>
                <button onClick={submit}>更新</button>
            </div>
        </div>
    );
};

export default ProfilePage;
