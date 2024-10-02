import { useState, useEffect, useCallback, useRef } from 'react';

export const usePopup = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const showPopup = useCallback((content: string) => {
    setPopupContent(content);
    setPopupVisible(true);
  }, []);

  const closePopup = useCallback(() => {
    setPopupVisible(false);
  }, []);

  // Handle clicks outside the popup to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (popupVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupVisible, closePopup]);

  return { popupVisible, popupContent, showPopup, closePopup, popupRef };
};
