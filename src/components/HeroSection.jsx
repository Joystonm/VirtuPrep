import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Master Your Soft Skills</h1>
          <p className="hero-subtitle">
            Practice public speaking, leadership, and teamwork in immersive VR environments with AI-powered feedback
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
              <span className="feature-icon">🤝</span>
              <span>Collaboration</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Real-time Analytics</span>
            </div>
          </div>
          <button className="hero-cta-button">Start Training</button>
        </div>
        <div className="hero-animation">
          <div className="hero-placeholder">
            <div className="placeholder-content">
              <h3>🎯 VR Training Environment</h3>
              <p>3D animation will be added here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
