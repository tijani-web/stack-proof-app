import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartChallenge = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/language-selector');
  };

  return (
    <div className="start-challenge-wrapper">
      <button className="start-challenge-btn" onClick={handleClick}>
        Start New Challenge
      </button>
    </div>
  );
};

export default StartChallenge;
