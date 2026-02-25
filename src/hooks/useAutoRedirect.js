import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * Custom hook for auto-redirecting after a delay
 * @param {number} delay - Delay in milliseconds before redirect
 * @param {string} targetScreen - Screen name to navigate to
 * @param {boolean} condition - Condition that must be true to trigger redirect
 */
export const useAutoRedirect = (delay = 2000, targetScreen, condition = true) => {
  const navigation = useNavigation();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (condition) {
      timeoutRef.current = setTimeout(() => {
        navigation.navigate(targetScreen);
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [condition, delay, targetScreen, navigation]);

  return {
    clearRedirect: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
  };
};

export default useAutoRedirect;
