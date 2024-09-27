// components/AlertPopup.tsx

import React from 'react';

// Define the props interface for AlertPopup
interface AlertPopupProps {
    message: string;
    isVisible: boolean;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ isVisible, message }) => {
    if (!isVisible) return null;

    return (
        <div className="alert-popup-overlay">
            <div className="alert-popup">
                <div className="alert-content">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default AlertPopup;

