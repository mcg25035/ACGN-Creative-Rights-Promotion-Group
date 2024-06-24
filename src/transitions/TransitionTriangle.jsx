import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './TransitionTriangle.scss';
import './checkMarkStyle.scss'
import { useNavigate } from 'react-router-dom';

const TransitionTriangle = ({ active, text, redirectTo, transitionTime = 0.75 }) => {
    const overlayRef = useRef(null);
    const [overlayCovered,setOverlayCovered] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (active) {
            const overlay = overlayRef.current;
            overlay.classList.add('active');
            setTimeout(() => {
                setOverlayCovered(true);
            }, 1000*(transitionTime))

            setTimeout(() => {
                // alert("Redirecting to " + redirectTo)
                navigate(redirectTo);
            }, 1000*(1+transitionTime)); 
        }
    }, [active, navigate, redirectTo]);

    return (
        <div ref={overlayRef} className={`animation-overlay ${active ? 'visible' : ''}`}>
            <div className='overlay-triangle' style={{"--transition-time":transitionTime+"s"}}></div>
            {overlayCovered && 
                <div className='ac-container'>
                    <div className="animation-component circle-loader load-complete">
                        <div className="animation-component checkmark draw" style={{ display: "block" }} />
                    </div>
                </div>
            }
            <div className={`overlay-text ${overlayCovered ? 'show' : 'hide'}`}>{text}</div>
        </div>
    );
};

TransitionTriangle.propTypes = {
    active: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    redirectTo: PropTypes.string.isRequired,
    transitionTime: PropTypes.number
};

export default TransitionTriangle;
