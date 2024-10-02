import { useState, useEffect, useCallback, useRef } from 'react';

export const useAlertPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const alertRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Use to store timeout reference

  const showAlert = useCallback((message: string) => {
    // Clear any previous timeout if the alert is shown again
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAlertMessage(message);
    setIsVisible(true);

    // Automatically close the alert after 4 seconds
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // 4 seconds delay
  }, []);

  const closeAlert = useCallback(() => {
    setIsVisible(false);

    // Clear timeout when manually closing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
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
