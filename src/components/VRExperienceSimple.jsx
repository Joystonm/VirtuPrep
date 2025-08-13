import React, { useState, useRef, useEffect } from 'react';
import '../styles/VRExperience.css';

// Simplified VR Experience Component for testing
const VRExperienceSimple = () => {
  const [currentEnvironment, setCurrentEnvironment] = useState('auditorium');
  const [isLoading, setIsLoading] = useState(false);
  const heroRef = useRef();

  useEffect(() => {
    // Simple animation without anime.js for testing
    if (heroRef.current) {
      const elements = heroRef.current.children;
      Array.from(elements).forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
          element.style.transition = 'all 0.8s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 200);
      });
    }
  }, []);

  const handleLaunchVR = () => {
    setIsLoading(true);
    
    // Simulate VR launch
    setTimeout(() => {
      setIsLoading(false);
      alert('VR Experience would launch here! (This is a simplified version for testing)');
    }, 2000);
  };

  return (
    <section className="vr-experience-section">
      {/* Hero Area */}
      <div ref={heroRef} className="vr-hero">
        <div className="vr-hero-content">
          <h2 className="vr-hero-title">
            🥽 VR Experience
          </h2>
          <p className="vr-hero-subtitle">
            Step into a new dimension of skill practice – right from your browser or VR headset.
          </p>
          <div className="vr-hero-description">
            <p>Experience immersive 3D environments where you can practice public speaking, 
               leadership, and collaboration skills with realistic virtual audiences and teammates.</p>
          </div>
        </div>
        
        {/* Simplified Preview */}
        <div className="vr-preview-container">
          <div className="vr-canvas-container">
            <div className="vr-preview-placeholder">
              <div className="preview-content">
                <h3>🎭 {currentEnvironment === 'auditorium' ? 'Auditorium Mode' : 'Meeting Room Mode'}</h3>
                <p>3D Environment Preview</p>
                <div className="preview-animation">
                  <div className="floating-element">🎤</div>
                  <div className="floating-element">👥</div>
                  <div className="floating-element">💡</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Selection */}
      <div className="environment-selection">
        <h3>Choose Your Training Environment</h3>
        <div className="environment-cards">
          <div 
            className={`environment-card ${currentEnvironment === 'auditorium' ? 'active' : ''}`}
            onClick={() => setCurrentEnvironment('auditorium')}
          >
            <div className="card-icon">🎭</div>
            <h4>Auditorium Mode</h4>
            <p>Large stage with animated audience reactions</p>
            <ul>
              <li>100+ virtual audience members</li>
              <li>Professional stage lighting</li>
              <li>Real-time crowd reactions</li>
              <li>Spotlight effects</li>
            </ul>
          </div>
          
          <div 
            className={`environment-card ${currentEnvironment === 'meeting' ? 'active' : ''}`}
            onClick={() => setCurrentEnvironment('meeting')}
          >
            <div className="card-icon">💼</div>
            <h4>Meeting Room Mode</h4>
            <p>Conference table with interactive participants</p>
            <ul>
              <li>Professional meeting setup</li>
              <li>Interactive team members</li>
              <li>Presentation screen</li>
              <li>Collaboration tools</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Launch Button */}
      <div className="vr-launch-section">
        <button 
          className={`vr-launch-btn ${isLoading ? 'loading' : ''}`}
          onClick={handleLaunchVR}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              <span>Initializing VR...</span>
            </>
          ) : (
            <>
              <span className="btn-icon">🚀</span>
              <span>Launch VR Experience</span>
            </>
          )}
        </button>
        
        <div className="vr-compatibility">
          <p>
            <strong>🖥️ Desktop:</strong> Click & drag to explore • 
            <strong>📱 Mobile:</strong> Touch & drag to navigate • 
            <strong>🥽 VR:</strong> Natural head movement
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="vr-features-grid">
        <div className="feature-item">
          <div className="feature-icon">🎯</div>
          <h4>Interactive Scenarios</h4>
          <p>Audience members raise hands, ask questions, and react to your performance</p>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">📊</div>
          <h4>Live Feedback HUD</h4>
          <p>Real-time metrics for speech clarity, engagement level, and pacing</p>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">🌟</div>
          <h4>Realistic Environments</h4>
          <p>Professional lighting, shadows, and reflections for maximum immersion</p>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">🔄</div>
          <h4>Smooth Transitions</h4>
          <p>Seamless switching between environments with animated scene changes</p>
        </div>
      </div>
    </section>
  );
};

export default VRExperienceSimple;
