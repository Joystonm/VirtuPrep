import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Master Your Soft Skills</h1>
          <p className="hero-subtitle">
            Practice public speaking, leadership, and teamwork in immersive VR environments with AI-powered coaching and comprehensive interview preparation
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🎤</span>
              <span>Public Speaking</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <span>Team Leadership</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Interview Prep</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Real-time Analytics</span>
            </div>
          </div>
          <div className="hero-cta-buttons">
            <button 
              className="hero-cta-button primary"
              onClick={() => navigate('/scenarios')}
            >
              Start VR Training
            </button>
            <button 
              className="hero-cta-button secondary"
              onClick={() => navigate('/interview-prep')}
            >
              🤖 Try Interview Prep
            </button>
          </div>
        </div>
        <div className="hero-animation">
          <div className="hero-placeholder">
            <div className="placeholder-content">
              <h3>🎯 AI-Powered Training</h3>
              <p>VR Simulations + Interview Coaching</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
