import React, { useEffect, useState } from 'react';

const Timer = ({ initialMinutes = 5, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(true);


 useEffect(() => {
  if (!isActive || seconds <= 0) return;

  const interval = setInterval(() => {
    setSeconds(prev => {
      const next = prev - 1;
      onTimeUpdate?.(next);   // <- send it to parent
      return next;
    });
  }, 1000);
  return () => clearInterval(interval);
}, [isActive, seconds]);


  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer glass fade-in">
      <h3>⏱ Timer</h3>
      <p className="countdown">{formatTime()}</p>
      <p className="timer-sub">🏁 Aim to finish in {initialMinutes} mins — but take your time. Speed affects your badge!</p>
    </div>
  );
};

export default Timer;
