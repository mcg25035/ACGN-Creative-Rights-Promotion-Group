import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons';
import './EmailVerifyPage.scss';

const CODE_LENGTH = 6;

const VERIFY_RESULT = {
    PENDING: 0,
    PASSED: 1,
    FAILED: 2,
};

const EmailVerifyPage = () => {
    const [verifyCode, setVerifyCode] = useState('');
    const [verifyResult, setVerifyResult] = useState(VERIFY_RESULT.PENDING);

    const updateVerifyCode = (ev) => {
        const { value } = ev?.target || {};
        if (value.length <= CODE_LENGTH) {
            setVerifyCode(value);
        }

        if (value.length === CODE_LENGTH) {
            // TODO: send verify codes
            setVerifyResult(VERIFY_RESULT.PASSED);
        } else if (value.length < CODE_LENGTH)  {
            setVerifyResult(VERIFY_RESULT.PENDING);
        }
    };

    const defaultCodes = new Array(CODE_LENGTH).fill('');

    const codes = [...verifyCode.split(''), ...defaultCodes].slice(0, CODE_LENGTH);

    const renderCode = (code, idx) => (<span key={idx} className="verify-code">{code}</span>);

    const faileMessage = (
        <div className="failed verify-message">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span>驗證失敗</span>
        </div>
    );

    const successMessage = (
        <div className="success verify-message">
            <FontAwesomeIcon icon={faCheck} />
            <span>驗證通過</span>
        </div>
    );

    return (
        <label className="email-verify-page">
            <input type="number" value={verifyCode} onChange={updateVerifyCode} />
            <h1>請輸入Email驗證碼</h1>
            <div>{codes.map(renderCode)}</div>
            <div className="verify-message-container">
                {(verifyResult === VERIFY_RESULT.FAILED) && faileMessage}
                {(verifyResult === VERIFY_RESULT.PASSED) && successMessage}
            </div>
        </label>
    );
};

export default EmailVerifyPage;
