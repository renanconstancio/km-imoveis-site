import { useState } from "react";

export const useLocalStorage = (k: string, obj: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(k);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(k, JSON.stringify(obj));
        return obj;
      }
    } catch (err) {
      return obj;
    }
  });

  const setValue = (value: any) => {
    try {
      window.localStorage.setItem(k, JSON.stringify(value));
      // eslint-disable-next-line no-empty
    } catch (err) {}
    setStoredValue(value);
  };
  return [storedValue, setValue];
};
