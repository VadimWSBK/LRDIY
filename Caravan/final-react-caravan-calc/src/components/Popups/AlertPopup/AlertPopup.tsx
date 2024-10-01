// components/AlertPopup.tsx

import React from 'react';
import styles from './AlertPopup.module.css';

// Define the props interface for AlertPopup
interface AlertPopupProps {
    message: string;
    isVisible: boolean;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ isVisible, message }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.alertPopupOverlay}>
            <div className={styles.alertPopup}>
                <div className={styles.alertContent}>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default AlertPopup;

