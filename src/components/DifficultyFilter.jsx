import React from 'react';

const DifficultyFilter = ({ selected, onSelect }) => {
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div>
      <h2>Select Difficulty Level</h2>
      <div className="difficulty-options">
        {levels.map((level) => (
          <button
            key={level}
            className={`difficulty-btn ${selected === level ? 'selected' : ''}`}
            onClick={() => onSelect(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultyFilter;
