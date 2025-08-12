import React from 'react';

const ScenarioCard = ({ 
  title, 
  description, 
  difficulty, 
  duration, 
  skills = [], 
  icon, 
  onSelect 
}) => {
  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      default: return 'difficulty-intermediate';
    }
  };

  return (
    <div className="scenario-card">
      <div className="scenario-header">
        <div className="scenario-icon">{icon}</div>
        <div className="scenario-meta">
          <span className={`scenario-difficulty ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
          {duration && <span className="scenario-duration">{duration}</span>}
        </div>
      </div>
      
      <h3 className="scenario-title">{title}</h3>
      <p className="scenario-description">{description}</p>
      
      {skills.length > 0 && (
        <div className="scenario-skills">
          <h4>Skills You'll Practice:</h4>
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index} className="skill-item">{skill}</li>
            ))}
          </ul>
        </div>
      )}
      
      <button onClick={onSelect} className="scenario-select-btn">
        Start Simulation
      </button>
    </div>
  );
};

export default ScenarioCard;
