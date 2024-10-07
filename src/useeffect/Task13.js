// 13. Timer with Start/Stop: Create a timer that can be started and stopped using useState 
// and useEffect.


import React, { useState, useEffect } from 'react';

const Task13 = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (
    <div>
      <h1>{seconds} seconds</h1>
      <button className='btn btn-success mx-2' onClick={startTimer}>Start</button>
      <button className='btn btn-danger mx-2' onClick={stopTimer}>Stop</button>
      <button className='btn btn-secondary mx-2' onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Task13;
