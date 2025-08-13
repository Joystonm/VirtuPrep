import React, { useState, useEffect } from 'react';
import anime from 'animejs';
import { interviewQuestions } from './questionData';
import './QuestionBank.css';

const QuestionBank = ({ userProgress, updateProgress }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState(interviewQuestions);

  const categories = [
    { id: 'all', name: 'All Questions', icon: '📋', count: interviewQuestions.length },
    { id: 'behavioral', name: 'Behavioral', icon: '🧠', count: interviewQuestions.filter(q => q.category === 'behavioral').length },
    { id: 'technical', name: 'Technical', icon: '💻', count: interviewQuestions.filter(q => q.category === 'technical').length },
    { id: 'situational', name: 'Situational', icon: '🎯', count: interviewQuestions.filter(q => q.category === 'situational').length },
    { id: 'personal', name: 'Personal', icon: '👤', count: interviewQuestions.filter(q => q.category === 'personal').length },
    { id: 'company', name: 'Company-Specific', icon: '🏢', count: interviewQuestions.filter(q => q.category === 'company').length }
  ];

  useEffect(() => {
    filterQuestions();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    // Animate question cards
    anime({
      targets: '.question-card',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(50),
      duration: 400,
      easing: 'easeOutQuart'
    });
  }, [filteredQuestions]);

  const filterQuestions = () => {
    let filtered = interviewQuestions;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredQuestions(filtered);
  };

  const openQuestion = (question) => {
    setSelectedQuestion(question);
    
    anime({
      targets: '.question-modal',
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 400,
      easing: 'easeOutQuart'
    });
  };

  const closeQuestion = () => {
    anime({
      targets: '.question-modal',
      opacity: [1, 0],
      scale: [1, 0.9],
      duration: 300,
      easing: 'easeInQuart',
      complete: () => setSelectedQuestion(null)
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#27ae60';
      case 'Medium': return '#f39c12';
      case 'Hard': return '#e74c3c';
      default: return '#3498db';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'behavioral': return '#9b59b6';
      case 'technical': return '#3498db';
      case 'situational': return '#e67e22';
      case 'personal': return '#1abc9c';
      case 'company': return '#34495e';
      default: return '#7f8c8d';
    }
  };

  return (
    <div className="question-bank">
      <div className="question-bank-header">
        <h2>❓ Interview Question Bank</h2>
        <p>40+ carefully curated questions with model answers and tips</p>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search questions or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="categories-nav">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-count">{category.count}</span>
          </button>
        ))}
      </div>

      <div className="questions-grid">
        {filteredQuestions.map((question, index) => (
          <div 
            key={question.id} 
            className="question-card"
            onClick={() => openQuestion(question)}
          >
            <div className="question-header">
              <span 
                className="question-category"
                style={{ backgroundColor: getCategoryColor(question.category) }}
              >
                {question.category}
              </span>
              <span 
                className="question-difficulty"
                style={{ color: getDifficultyColor(question.difficulty) }}
              >
                {question.difficulty}
              </span>
            </div>
            
            <h3 className="question-text">{question.question}</h3>
            
            <div className="question-tags">
              {question.tags.slice(0, 3).map(tag => (
                <span key={tag} className="question-tag">{tag}</span>
              ))}
              {question.tags.length > 3 && (
                <span className="more-tags">+{question.tags.length - 3}</span>
              )}
            </div>
            
            <div className="question-footer">
              <span className="question-type">{question.type}</span>
              <span className="view-answer">View Answer →</span>
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No questions found</h3>
          <p>Try adjusting your search or category filter</p>
        </div>
      )}

      {selectedQuestion && (
        <div className="question-modal-overlay" onClick={closeQuestion}>
          <div className="question-modal" onClick={(e) => e.stopPropagation()}>
            <div className="question-modal-header">
              <div className="question-modal-meta">
                <span 
                  className="modal-category"
                  style={{ backgroundColor: getCategoryColor(selectedQuestion.category) }}
                >
                  {selectedQuestion.category}
                </span>
                <span 
                  className="modal-difficulty"
                  style={{ color: getDifficultyColor(selectedQuestion.difficulty) }}
                >
                  {selectedQuestion.difficulty}
                </span>
              </div>
              <button className="close-button" onClick={closeQuestion}>×</button>
            </div>
            
            <div className="question-modal-content">
              <h2 className="modal-question">{selectedQuestion.question}</h2>
              
              <div className="question-tags-full">
                {selectedQuestion.tags.map(tag => (
                  <span key={tag} className="question-tag-full">{tag}</span>
                ))}
              </div>
              
              <div className="answer-section">
                <h3>💡 Model Answer</h3>
                <div className="model-answer">
                  {selectedQuestion.modelAnswer}
                </div>
              </div>
              
              <div className="tips-section">
                <h3>🎯 Tips for Success</h3>
                <ul className="tips-list">
                  {selectedQuestion.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
              
              {selectedQuestion.followUp && (
                <div className="followup-section">
                  <h3>🔄 Potential Follow-up Questions</h3>
                  <ul className="followup-list">
                    {selectedQuestion.followUp.map((followup, index) => (
                      <li key={index}>{followup}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="question-actions">
                <button className="practice-btn">
                  🎤 Practice This Question
                </button>
                <button className="bookmark-btn">
                  ⭐ Bookmark
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
