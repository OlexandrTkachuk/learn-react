import { useEffect, useState, useRef } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(() => new Date());
  const intervalId = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      stop();
    };
  }, []);

  const stop = () => {
    clearInterval(intervalId.current);
  };

  return (
    <div>
      <p>Поточний час: {time.toLocaleTimeString()}</p>
      <button type="button" onClick={stop}>
        Зуупинити
      </button>
    </div>
  );
};
