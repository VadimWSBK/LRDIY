import React, { useEffect, useRef } from 'react';
import useStore from '../hooks/useStore';
import styles from '../styles/Popup.module.css';

interface PopupProps {
    infoText: string;
    id: string; // Add a unique id prop to identify each popup
}

const Popup: React.FC<PopupProps> = ({ infoText, id }) => {
    const { popupVisibility, togglePopup } = useStore((state) => ({
        popupVisibility: state.popupVisibility,
        togglePopup: state.togglePopup,
    }));

    const isVisible = popupVisibility[id] || false; // Get visibility state for the specific popup

    const popupRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            togglePopup(id, false);
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
        togglePopup(id, !isVisible);
    };

    return (
        <div className={styles.popupContainer} ref={popupRef}>
            <a href="#" className={styles.popupLink} onClick={handleToggleVisibility}>
                Why do I need this?
            </a>
            {isVisible && (
                <div className={styles.popupBubble}>
                    {infoText}
                </div>
            )}
        </div>
    );
};

export default Popup;
