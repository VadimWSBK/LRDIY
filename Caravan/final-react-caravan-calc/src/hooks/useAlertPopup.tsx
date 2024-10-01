import { useState, useEffect, useRef } from 'react';

const useAlertPopup = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const timeoutRef = useRef<number | null>(null);

    // Show alert with a specific message and auto-hide after 3 seconds
    const show = (message: string) => {
        setAlertMessage(message);
        setIsVisible(true);

        // Automatically hide the popup after 3 seconds
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear any previous timeout
        }
        timeoutRef.current = window.setTimeout(() => {
            hide();
        }, 3000);
    };

    // Hide alert
    const hide = () => {
        setIsVisible(false);
        clearTimeout(timeoutRef.current!); // Ensure timeout is cleared
        timeoutRef.current = null;
    };

    // Handle clicks outside the popup
    const handleOutsideClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('.alert-popup') === null) {
            hide(); // Hide the popup if clicked outside
        }
    };

    // Manage adding/removing the event listener when the popup is visible
    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isVisible]); // Only re-run the effect when `isVisible` changes

    return {
        isVisible,
        show,
        alertMessage,
        setAlertMessage
    };
};

export default useAlertPopup;
