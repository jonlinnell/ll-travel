import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const storedCallback = useRef();

  useEffect(() => {
    storedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      storedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
