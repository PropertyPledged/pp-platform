"use client";

import { useEffect, useState, useCallback } from "react";

type StorageType = "local" | "session";

export function useStorage<T>(
  key: string,
  initialValue: T,
  type: StorageType = "local"
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const storage = type === "local" ? window.localStorage : window.sessionStorage;
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from ${type}Storage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        const storage = type === "local" ? window.localStorage : window.sessionStorage;
        storage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error writing to ${type}Storage key "${key}":`, error);
    }
  }, [key, type, storedValue]);

  return [storedValue, setValue];
}
