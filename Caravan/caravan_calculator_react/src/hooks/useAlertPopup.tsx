// hooks/useAlertPopup.tsx

import { useState } from 'react';

const useAlertPopup = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    // Show alert with a specific message and auto-hide after 3 seconds
    const show = (message: string) => {
        setAlertMessage(message);
        setIsVisible(true);

        // Automatically hide the popup after 3 seconds
        setTimeout(() => {
            hide();
        }, 3000);

        // Add event listener to close popup on outside click
        document.addEventListener('mousedown', handleOutsideClick);
    };

    // Hide alert and remove event listener
    const hide = () => {
        setIsVisible(false);

        // Remove event listener
        document.removeEventListener('mousedown', handleOutsideClick);
    };

    // Handle clicks outside the popup
    const handleOutsideClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('.alert-popup') === null) {
            hide(); // Hide the popup if clicked outside
        }
    };

    return {
        isVisible,
        show,
        alertMessage,
        setAlertMessage
    };
};

export default useAlertPopup;
