import React, { useState } from 'react';
import TransitionTriangle from '../../transitions/TransitionTriangle';
import './TestComponent.scss';

const TestComponent = () => {
    const [active, setActive] = useState(false);
    const text = "登入成功";
    const redirectTo = "/";

    return (
        <div className="test-page">
            <div className="parent">
                <TransitionTriangle active={active} text={text} redirectTo={redirectTo} transitionTime={1.2} />
                <button onClick={() => setActive(true)}>Trigger Animation</button>
            </div>
        </div>
    );
};

export default TestComponent;
