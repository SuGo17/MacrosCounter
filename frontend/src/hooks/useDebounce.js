import { useEffect, useState } from "react";

function useDebounce(debounceTerm, debounceTimeLimit = 1000) {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    const timeOutFn = setTimeout(() => {
      console.log(debounceTerm);
      setDebouncedValue(debounceTerm);
    }, debounceTimeLimit);
    return () => {
      clearTimeout(timeOutFn);
    };
  }, [debounceTerm, debounceTimeLimit]);

  return debouncedValue;
}

export default useDebounce;
