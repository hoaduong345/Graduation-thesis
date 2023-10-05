import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      console.log(
        "🚀 ~ file: useDebounce.tsx:9 ~ timer ~ setDebouncedValue(value);:",
        setDebouncedValue(value)
      );
    }, delay);

    // Cleanup the timer on unmount or when value changes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
