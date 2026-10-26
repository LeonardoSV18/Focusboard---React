import { useEffect, useState } from "react";

/**
 * Works like useState, but keeps the value in localStorage
 * so it survives a page refresh.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be full or blocked (private mode). The app still works.
    }
  }, [key, value]);

  return [value, setValue];
}
