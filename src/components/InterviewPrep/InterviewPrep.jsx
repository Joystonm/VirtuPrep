import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LearningPath from './LearningPath/LearningPath';
import QuestionBank from './QuestionBank/QuestionBank';
import PracticeMode from './PracticeMode/PracticeMode';
import Analytics from './Analytics/Analytics';
import './InterviewPrep.css';

const InterviewPrep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userProgress, setUserProgress] = useState({
    completedLessons: [],
    practiceStats: {
      totalQuestions: 0,
      averageScore: 0,
      improvementAreas: [],
      strengths: []
    }
  });

  const navigationItems = [
    { 
      id: 'learning-path', 
      title: 'Learning Path', 
      icon: '📚', 
      path: '/interview-prep/learning-path',
      description: 'Master interview basics step by step'
    },
    { 
      id: 'question-bank', 
      title: 'Question Bank', 
      icon: '❓', 
      path: '/interview-prep/question-bank',
      description: '40+ common interview questions'
    },
    { 
      id: 'practice-mode', 
      title: 'AI Practice', 
      icon: '🤖', 
      path: '/interview-prep/practice',
      description: 'Practice with AI interviewer'
    },
    { 
      id: 'analytics', 
      title: 'Analytics', 
      icon: '📊', 
      path: '/interview-prep/analytics',
      description: 'Track your progress'
    }
  ];

  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.includes('learning-path')) return 'learning-path';
    if (path.includes('question-bank')) return 'question-bank';
    if (path.includes('practice')) return 'practice-mode';
    if (path.includes('analytics')) return 'analytics';
    return 'learning-path';
  };

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('interviewPrepProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (newProgress) => {
    const updatedProgress = { ...userProgress, ...newProgress };
    setUserProgress(updatedProgress);
    localStorage.setItem('interviewPrepProgress', JSON.stringify(updatedProgress));
  };

  return (
    <div className="interview-prep">
      <div className="interview-prep-header">
        <div className="header-content">
          <h1>🎯 Interview Preparation</h1>
          <p>Master your interview skills with AI-powered coaching</p>
        </div>
        
        <div className="progress-overview">
          <div className="progress-stat">
            <span className="stat-value">{userProgress.practiceStats.totalQuestions}</span>
            <span className="stat-label">Questions Practiced</span>
          </div>
          <div className="progress-stat">
            <span className="stat-value">{userProgress.practiceStats.averageScore}%</span>
            <span className="stat-label">Average Score</span>
          </div>
          <div className="progress-stat">
            <span className="stat-value">{userProgress.completedLessons.length}</span>
            <span className="stat-label">Lessons Completed</span>
          </div>
        </div>
      </div>

      <nav className="interview-prep-nav">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${getCurrentSection() === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <div className="nav-content">
              <span className="nav-title">{item.title}</span>
              <span className="nav-description">{item.description}</span>
            </div>
          </button>
        ))}
      </nav>

      <div className="interview-prep-content">
        <Routes>
          <Route 
            path="learning-path/*" 
            element={
              <LearningPath 
                userProgress={userProgress} 
                updateProgress={updateProgress} 
              />
            } 
          />
          <Route 
            path="question-bank/*" 
            element={
              <QuestionBank 
                userProgress={userProgress} 
                updateProgress={updateProgress} 
              />
            } 
          />
          <Route 
            path="practice/*" 
            element={
              <PracticeMode 
                userProgress={userProgress} 
                updateProgress={updateProgress} 
              />
            } 
          />
          <Route 
            path="analytics/*" 
            element={
              <Analytics 
                userProgress={userProgress} 
              />
            } 
          />
          <Route 
            path="/" 
            element={
              <LearningPath 
                userProgress={userProgress} 
                updateProgress={updateProgress} 
              />
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

export default InterviewPrep;
