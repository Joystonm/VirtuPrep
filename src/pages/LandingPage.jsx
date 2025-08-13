import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <HeroSection />
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h2>🚀 Complete Soft Skills Training Platform</h2>
            <p>From VR simulations to AI-powered interview coaching</p>
          </div>
          
          <div className="features-grid">
            {/* VR Training */}
            <div className="feature-card">
              <div className="feature-icon-large">🥽</div>
              <h3>VR Simulations</h3>
              <p>Practice in immersive 3D environments with realistic scenarios and virtual audiences</p>
              <ul className="feature-list">
                <li>Public speaking stages</li>
                <li>Meeting rooms</li>
                <li>Conference halls</li>
                <li>Real-time feedback</li>
              </ul>
              <button 
                className="feature-button"
                onClick={() => navigate('/scenarios')}
              >
                Start VR Training
              </button>
            </div>

            {/* Interview Preparation */}
            <div className="feature-card featured">
              <div className="feature-badge">🆕 NEW</div>
              <div className="feature-icon-large">🤖</div>
              <h3>AI Interview Coaching</h3>
              <p>Master interview skills with comprehensive preparation and real-time AI feedback</p>
              <ul className="feature-list">
                <li>40+ interview questions</li>
                <li>Step-by-step learning path</li>
                <li>Real-time speech analysis</li>
                <li>Personalized feedback</li>
              </ul>
              <button 
                className="feature-button primary"
                onClick={() => navigate('/interview-prep')}
              >
                Try Interview Prep
              </button>
            </div>

            {/* Analytics */}
            <div className="feature-card">
              <div className="feature-icon-large">📊</div>
              <h3>Progress Analytics</h3>
              <p>Track your improvement with detailed performance metrics and insights</p>
              <ul className="feature-list">
                <li>Performance tracking</li>
                <li>Skill breakdowns</li>
                <li>Progress charts</li>
                <li>AI recommendations</li>
              </ul>
              <button 
                className="feature-button"
                onClick={() => navigate('/interview-prep/analytics')}
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2>🎯 How VirtuPrep Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Choose Your Path</h3>
              <p>Select VR simulations for immersive practice or Interview Prep for comprehensive coaching</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Practice & Learn</h3>
              <p>Engage with realistic scenarios, answer questions, and receive instant AI-powered feedback</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Track Progress</h3>
              <p>Monitor your improvement with detailed analytics and personalized recommendations</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Master Skills</h3>
              <p>Build confidence and excel in real-world situations with proven soft skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Soft Skills?</h2>
            <p>Join thousands of users who have improved their communication and interview skills</p>
            <div className="cta-buttons">
              <button 
                className="cta-button primary"
                onClick={() => navigate('/interview-prep')}
              >
                🤖 Start Interview Prep
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => navigate('/scenarios')}
              >
                🥽 Try VR Training
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
