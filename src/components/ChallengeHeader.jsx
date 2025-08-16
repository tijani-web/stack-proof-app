import React from 'react';
import Timer from './Timer';

const languageIcons = [
  { name: 'JavaScript', image: '/images/lang-icons/javascript.svg' },
  { name: 'Python', image: '/images/lang-icons/python.svg' },
  { name: 'Java', image: '/images/lang-icons/java.svg' },
  { name: 'Cplusplus', image: '/images/lang-icons/Cplusplus.svg' },
  { name: 'CSharp', image: '/images/lang-icons/csharp.svg' },
  { name: 'C', image: '/images/lang-icons/c.svg' },
];

const difficultyColor = {
  Beginner: '#4caf50',
  Intermediate: '#ff9800',
  Advanced: '#f44336'
};

export default function ChallengeHeader({ language = 'JavaScript', difficulty = 'Intermediate', initialMinutes = 10 }) {
  const langIcon = languageIcons[language] || null;

  return (
    <header className="challenge-header glass fade-in">
      {/* LEFT SIDE */}
      <div className="header-left">
        <h2 className="challenge-title">🔥 Coding Challenge</h2>
        <div className="meta-badges">
          <div className="lang-badge">
            {langIcon && <img src={langIcon} alt={language} className="lang-icon" />}
            <span>{language}</span>
          </div>
          <span className="difficulty-badge" style={{ backgroundColor: difficultyColor[difficulty] }}>
            {difficulty}
          </span>
        </div>
      </div>
    </header>
  );
}
