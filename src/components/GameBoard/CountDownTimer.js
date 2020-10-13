import React from 'react';

import './CountDownTimer.css';

function CountDownTimer({ now, max, color }) {
  return (
    <div
      className="progress progress-bar-vertical"
      style={{ borderColor: `${color}` }}
    >
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{
          height: `${now}%`,
          backgroundColor: `${color}`,
        }}
      />
    </div>
  );
}

export default CountDownTimer;
