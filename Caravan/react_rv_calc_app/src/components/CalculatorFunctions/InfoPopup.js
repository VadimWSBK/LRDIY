// src/components/CalculatorFunctions/InfoPopup.js
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPopup, closePopup } from '../../store/actions';

const InfoPopup = ({ infoText }) => {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.calculator.isVisible); // Get popup visibility from Redux store
    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            dispatch(closePopup()); // Dispatch action to close popup
        }
    };

    useEffect(() => {
        if (isVisible) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isVisible]);

    const toggleVisibility = (e) => {
        e.preventDefault();
        if (isVisible) {
            dispatch(closePopup()); // Dispatch action to close popup
        } else {
            dispatch(openPopup()); // Dispatch action to open popup
        }
    };

    return (
        <div className="info-popup-container" ref={popupRef}>
            <a href="#" className="info-popup-link-style" onClick={toggleVisibility}>
                Why do I need this?
            </a>
            {isVisible && (
                <div className="info-popup-bubble" onClick={() => dispatch(closePopup())}>
                    {infoText}
                </div>
            )}
        </div>
    );
};

export default InfoPopup;
