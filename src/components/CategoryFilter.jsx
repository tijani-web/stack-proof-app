import { categoriesByLanguage} from '../utils/categoriesByLanguage'
export default function CategoryFilter({ selectedLanguage, selectedDifficulty, selected, onToggle }) {
  const categories = categoriesByLanguage[selectedLanguage]?.[selectedDifficulty] || [];

  return (
    <div className='category-filter'>
      <h2 className="category-title">Categories for {selectedLanguage} - {selectedDifficulty}</h2>
      <div className="category-options">
        {categories.map((tag) => (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className={`category-btn ${selected.includes(tag) ? 'selected' : ''}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
