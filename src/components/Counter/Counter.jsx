import { useState, useEffect } from 'react';

export const Counter = () => {
  const [counterA, setCounterA] = useState(0);
  const [counterB, setCounterB] = useState(0);

  const handleCounterAIncrement = () => {
    setCounterA(prevState => prevState + 1);
  };

  const handleCounterBIncrement = () => {
    setCounterB(prevState => prevState + 1);
  };

  useEffect(() => {
    const totalClicks = counterA + counterB;
    document.title = `Всего кликнули ${totalClicks} раз`;
  }, [counterA, counterB]);

  return (
    <>
      <button type="button" onClick={handleCounterAIncrement}>
        Click on counter A {counterA} times
      </button>

      <button type="button" onClick={handleCounterBIncrement}>
        Click on counter B {counterB} times
      </button>
    </>
  );
};
