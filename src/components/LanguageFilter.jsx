import React from 'react';

const languages = [
  { name: 'JavaScript', image: '/images/lang-icons/javascript.svg' },
  { name: 'Python', image: '/images/lang-icons/python.svg' },
  { name: 'Java', image: '/images/lang-icons/java.svg' },
  { name: 'Cplusplus', image: '/images/lang-icons/c++.svg' },
  { name: 'CSharp', image: '/images/lang-icons/csharp.svg' },
  { name: 'C', image: '/images/lang-icons/c.svg' },
];
const colorMap = {
  JavaScript: '#f7df1e',
  Python: '#4B8BBE',
  Java: '#b07219',
  Cplusplus: '#f34b7d',
  CSharp: '#68217A',
  C: '#555555'
};


export default function LanguageFilter({ selected, onSelect }) {
  return (
    <div className="language-filter">
      {languages.map(({ name, image }) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className={`lang-btn ${selected === name ? 'selected' : ''}`}
          style={{ backgroundColor: colorMap[name] ? colorMap[name] : '#2a2a2a' }}
        >
          <img src={image} alt={name} className="lang-icon" />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}
