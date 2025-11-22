// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

/**
 * Hook that debounces a value. 
 * This is used primarily to delay updating the filter state 
 * for the API call until the user pauses typing.
 * * @param value The value to debounce (e.g., the raw search term).
 * @param delay The delay in milliseconds (e.g., 400ms).
 * @returns The debounced value, which updates only after the delay.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: If the value (search input) changes again before the timeout fires, 
    // clear the previous timeout and start a new one. This is the core of debouncing.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect only if 'value' or 'delay' changes

  return debouncedValue;
}