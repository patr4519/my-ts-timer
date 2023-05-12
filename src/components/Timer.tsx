import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);

      if (seconds >= 59) {
        setSeconds(0);
        setMinutes((prevMinutes) => prevMinutes + 1);
      }

      if (minutes >= 59) {
        setMinutes(0);
        setHours((prevHours) => prevHours + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes, hours]);

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  console.log(formatTime(1))

  return (
    <div>
      <h1>{`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}</h1>
    </div>
  );
};

export default Timer;
