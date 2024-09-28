import { useEffect, useRef, useCallback } from 'react';
import useStore from '../../../store/useStore';
import styles from '../styles/Popup.module.css';
import { PopupProps,  } from '../../../types/index';



const Popup: React.FC<PopupProps> = ({ infoText, id }) => {
    const { popupVisibility, togglePopup } = useStore((state) => ({
        popupVisibility: state.popupVisibility,
        togglePopup: state.togglePopup,
    }));

    const isVisible = popupVisibility[id] || false;
    const popupRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            togglePopup(id, false);
        }
    }, [togglePopup, id]);

    useEffect(() => {
        if (isVisible) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isVisible, handleClickOutside]);

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
