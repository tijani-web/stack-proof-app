import React from 'react';

const XPCard = ({ xp = 0 }) => {
  const level = Math.floor(xp / 100) + 1;
  const xpThisLevel = xp % 100;
  const progressPercent = (xpThisLevel / 100) * 100;

  return (
    <div className="xp-card">
      <div className="xp-header">
        <h3>Level {level}</h3>
        <span>{xp} XP</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <p className="xp-remaining">{100 - xpThisLevel} XP to Level {level + 1}</p>
    </div>
  );
};

export default XPCard;
