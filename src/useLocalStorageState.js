import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(function() {
        const storedValue = localStorage.getItem(key)
        try {
            return storedValue ? JSON.parse(storedValue) : initialState;
          } catch (error) {
            console.error(`Error parsing localStorage value for key "${key}":`, error);
            return initialState; // Return initialState if parsing fails
          }
      });

      useEffect(
        function () {
          localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
      );

      return [value, setValue]
    
}