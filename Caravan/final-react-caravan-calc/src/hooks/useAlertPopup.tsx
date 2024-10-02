import { useState, useEffect, useCallback, useRef } from 'react';

export const useAlertPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const alertRef = useRef<HTMLDivElement | null>(null);

  const showAlert = useCallback((message: string) => {
    setAlertMessage(message);
    setIsVisible(true);
  }, []);

  const closeAlert = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Handle clicks outside or on the alert to close it
  useEffect(() => {
    const handleClickOutsideOrInside = (event: MouseEvent) => {
      if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
        closeAlert(); // Close when clicking outside the alert
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutsideOrInside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOrInside);
    };
  }, [isVisible, closeAlert]);

  return { isVisible, alertMessage, showAlert, closeAlert, alertRef };
};
