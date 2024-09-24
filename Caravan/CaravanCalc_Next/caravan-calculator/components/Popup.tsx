// Popup.tsx
import React, { useEffect, useRef } from 'react';
import useStore from '../hooks/useStore';
import { Product, BucketCount } from '../types/index';

interface PopupProps {
    infoText: string;
}

const Popup: React.FC<PopupProps> = ({ infoText }) => {
    const { isVisible, togglePopup } = useStore((state) => ({
        isVisible: state.isVisible,
        togglePopup: state.togglePopup,
    }));

    const popupRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            togglePopup(false);
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

    const handleToggleVisibility = (e: React.MouseEvent) => {
        e.preventDefault();
        togglePopup(!isVisible);
    };

    return (
        <div className="info-popup-container" ref={popupRef}>
            <a href="#" className="info-popup-link-style" onClick={handleToggleVisibility}>
                Why do I need this?
            </a>
            {isVisible && (
                <div className="info-popup-bubble" onClick={() => togglePopup(false)}>
                    {infoText}
                </div>
            )}
        </div>
    );
};

export default Popup;
