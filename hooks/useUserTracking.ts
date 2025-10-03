import { useState, useEffect } from 'react';

interface UserTrackingState {
  timeOnSite: number;
  scrollPercentage: number;
  shouldShowPopup: boolean;
}

export function useUserTracking() {
  const [state, setState] = useState<UserTrackingState>({
    timeOnSite: 0,
    scrollPercentage: 0,
    shouldShowPopup: false
  });

  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('peakai_popup_shown');
    if (popupShown) {
      setHasShownPopup(true);
      return;
    }

    // Timer for tracking time on site
    const startTime = Date.now();
    const timeInterval = setInterval(() => {
      const currentTime = (Date.now() - startTime) / 1000;
      setState(prev => ({ ...prev, timeOnSite: currentTime }));
    }, 1000);

    // Scroll tracking
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / documentHeight) * 100;

      setState(prev => ({ ...prev, scrollPercentage: Math.round(scrollPercent) }));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Show popup if conditions are met and hasn't been shown before
    if (!hasShownPopup && state.timeOnSite >= 7 && state.scrollPercentage >= 50) {
      setState(prev => ({ ...prev, shouldShowPopup: true }));
    }
  }, [state.timeOnSite, state.scrollPercentage, hasShownPopup]);

  const hidePopup = () => {
    setState(prev => ({ ...prev, shouldShowPopup: false }));
    setHasShownPopup(true);
    sessionStorage.setItem('peakai_popup_shown', 'true');
  };

  return {
    ...state,
    hidePopup
  };
}
