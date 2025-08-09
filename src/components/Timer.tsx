import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

interface TimerProps {
  timeLimit: number; // in seconds
  onTimeUpdate: (timeSpent: number) => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeLimit, onTimeUpdate, isActive }) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const onTimeUpdateRef = useRef(onTimeUpdate);
  const lastReportedTimeRef = useRef(-1);

  // Keep the ref updated with the latest callback
  useLayoutEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  });

  // Report time changes after render is complete
  useLayoutEffect(() => {
    if (lastReportedTimeRef.current !== timeSpent) {
      lastReportedTimeRef.current = timeSpent;
      // Use requestAnimationFrame to ensure this happens after render
      requestAnimationFrame(() => {
        onTimeUpdateRef.current(timeSpent);
      });
    }
  });

  useEffect(() => {
    let interval: number | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    setTimeSpent(0);
  }, [timeLimit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeStatus = () => {
    if (timeSpent <= timeLimit) return 'good';
    if (timeSpent <= timeLimit * 1.5) return 'warning';
    return 'overtime';
  };

  const timeRemaining = Math.max(0, timeLimit - timeSpent);
  const isOvertime = timeSpent > timeLimit;

  return (
    <div className={`timer ${getTimeStatus()}`}>
      <div className="timer-display">
        <div className="time-spent">
          <span className="label">Time Spent:</span>
          <span className="time">{formatTime(timeSpent)}</span>
        </div>
        <div className="time-remaining">
          <span className="label">
            {isOvertime ? 'Overtime:' : 'Remaining:'}
          </span>
          <span className="time">
            {isOvertime ? formatTime(timeSpent - timeLimit) : formatTime(timeRemaining)}
          </span>
        </div>
      </div>
      
      <div className="timer-bar">
        <div 
          className="timer-progress"
          style={{ 
            width: `${Math.min(100, (timeSpent / timeLimit) * 100)}%`,
            backgroundColor: getTimeStatus() === 'good' ? '#4CAF50' : 
                           getTimeStatus() === 'warning' ? '#FF9800' : '#F44336'
          }}
        ></div>
      </div>
      
      {isOvertime && (
        <div className="overtime-warning">
          ⚠️ Over time limit!
        </div>
      )}
    </div>
  );
};

export default Timer;
