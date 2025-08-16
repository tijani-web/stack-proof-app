import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LanguageFilter from './LanguageFilter';
import DifficultyFilter from '../components/DifficultyFilter';
import CategoryFilter from './CategoryFilter';
import Layout from './Layout';

export default function LanguageGrid() {
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryRef = useRef(null);
  const navigate = useNavigate(); 

  const toggleCategory = (tag) => {
    setSelectedCategories((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleDifficultySelect = (level) => {
    setSelectedDifficulty(level);
    setTimeout(() => {
      categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 70);
  };

  const handleStartChallenge = () => {
    navigate('/code-quest', {
      state: {
        selectedLanguage,
        selectedDifficulty,
        selectedCategories
      }
    });
  };

  return (
    <Layout>
      <div className="page-wrapper">
        <header className="page-header">
          <h1>Pick Your Language • Choose Difficulty • Start Building</h1>
        </header>

        <main className="main-grid">
          <div className="lang-difficulty-row">
            <section className="language-box">
              <h2 className="section-title">Languages</h2>
              <LanguageFilter
                selected={selectedLanguage}
                onSelect={(lang) => {
                  setSelectedLanguage(lang);
                  setSelectedCategories([]);
                }}
              />
            </section>

            <hr />

            <aside className="difficulty-box">
              <h2 className="section-title">Difficulty</h2>
              <DifficultyFilter
                selected={selectedDifficulty}
                onSelect={handleDifficultySelect}
              />
            </aside>
          </div>

          <hr />

          <section className="category-section" ref={categoryRef}>
            <CategoryFilter
              selectedLanguage={selectedLanguage}
              selectedDifficulty={selectedDifficulty}
              selected={selectedCategories}
              onToggle={toggleCategory}
            />
            <p className="task-info-text">
              One challenge will be selected based on your filters. Make your selections, then click <strong>Start Challenge</strong> to begin.
            </p>

            <div className="start-btn-wrap">
              <button
                className="start-btn"
                disabled={selectedCategories.length === 0}
                onClick={handleStartChallenge}
              >
                Start Challenge
              </button>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
