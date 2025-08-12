import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedbackGraph from '../components/FeedbackGraph';
import { generatePerformanceReport, exportSessionData } from '../utils/analyticsUtils';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sessionResults, setSessionResults] = useState(null);
  const [performanceReport, setPerformanceReport] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const results = location.state?.sessionResults;
    if (results) {
      setSessionResults(results);
      const report = generatePerformanceReport(results);
      setPerformanceReport(report);
    } else {
      // Redirect if no session data
      navigate('/scenarios');
    }
  }, [location.state, navigate]);

  if (!sessionResults || !performanceReport) {
    return (
      <div className="results-loading">
        <div className="loading-spinner"></div>
        <p>Generating your performance report...</p>
      </div>
    );
  }

  const getScenarioTitle = (scenarioId) => {
    const titles = {
      'public-speaking': 'Public Speaking',
      'presentation-skills': 'Presentation Skills',
      'team-leadership': 'Team Leadership',
      'collaboration': 'Team Collaboration',
      'networking': 'Professional Networking',
      'interview-skills': 'Interview Skills'
    };
    return titles[scenarioId] || 'Soft Skills Training';
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'score-excellent';
    if (score >= 70) return 'score-good';
    if (score >= 50) return 'score-fair';
    return 'score-poor';
  };

  const handleExportResults = () => {
    const exportUrl = exportSessionData(sessionResults);
    if (exportUrl) {
      const link = document.createElement('a');
      link.href = exportUrl;
      link.download = `virtuprep-results-${Date.now()}.json`;
      link.click();
    }
  };

  return (
    <div className="results">
      <div className="results-header">
        <div className="session-summary">
          <h2>{getScenarioTitle(sessionResults.scenario)} Results</h2>
          <div className="session-meta">
            <span className="session-duration">Duration: {formatDuration(sessionResults.duration)}</span>
            <span className="session-date">
              {new Date(sessionResults.endTime).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="results-actions">
          <button className="export-btn" onClick={handleExportResults}>
            📊 Export Results
          </button>
          <button className="retry-btn" onClick={() => navigate('/scenarios')}>
            🔄 Try Again
          </button>
        </div>
      </div>

      {/* Overall Score Card */}
      <div className="overall-score-card">
        <div className={`score-circle ${getScoreColor(performanceReport.overallScore)}`}>
          <span className="score-number">{performanceReport.overallScore}</span>
          <span className="score-label">Overall Score</span>
        </div>
        <div className="score-breakdown">
          <div className="score-item">
            <span className="score-category">Speech Clarity</span>
            <span className="score-value">{sessionResults.finalMetrics?.clarity || 0}%</span>
          </div>
          <div className="score-item">
            <span className="score-category">Confidence</span>
            <span className="score-value">{sessionResults.finalMetrics?.confidence || 0}%</span>
          </div>
          <div className="score-item">
            <span className="score-category">Engagement</span>
            <span className="score-value">{sessionResults.finalMetrics?.engagement || 0}%</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="results-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'detailed' ? 'active' : ''}`}
          onClick={() => setActiveTab('detailed')}
        >
          Detailed Analysis
        </button>
        <button 
          className={`tab-btn ${activeTab === 'improvements' ? 'active' : ''}`}
          onClick={() => setActiveTab('improvements')}
        >
          Improvements
        </button>
        <button 
          className={`tab-btn ${activeTab === 'transcript' ? 'active' : ''}`}
          onClick={() => setActiveTab('transcript')}
        >
          Transcript
        </button>
      </div>

      {/* Tab Content */}
      <div className="results-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="performance-chart">
              <FeedbackGraph data={performanceReport} />
            </div>
            
            <div className="key-highlights">
              <h3>Key Highlights</h3>
              <div className="highlights-grid">
                {performanceReport.strengths.map((strength, index) => (
                  <div key={index} className="highlight-item positive">
                    <span className="highlight-icon">✅</span>
                    <span className="highlight-text">{strength}</span>
                  </div>
                ))}
                {performanceReport.improvements.slice(0, 2).map((improvement, index) => (
                  <div key={index} className="highlight-item improvement">
                    <span className="highlight-icon">💡</span>
                    <span className="highlight-text">{improvement.suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="detailed-tab">
            <div className="metrics-breakdown">
              <h3>Performance Metrics</h3>
              <div className="metrics-cards">
                <div className="metric-card">
                  <h4>Speech Analysis</h4>
                  <div className="metric-details">
                    <div className="metric-row">
                      <span>Clarity:</span>
                      <span>{sessionResults.finalMetrics?.clarity || 0}%</span>
                    </div>
                    <div className="metric-row">
                      <span>Pace:</span>
                      <span>{sessionResults.finalMetrics?.pace || 0} WPM</span>
                    </div>
                    <div className="metric-row">
                      <span>Volume:</span>
                      <span>{sessionResults.finalMetrics?.volume || 0}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="metric-card">
                  <h4>Body Language</h4>
                  <div className="metric-details">
                    <div className="metric-row">
                      <span>Eye Contact:</span>
                      <span>{sessionResults.finalMetrics?.eyeContact || 0}%</span>
                    </div>
                    <div className="metric-row">
                      <span>Gestures:</span>
                      <span>{sessionResults.finalMetrics?.gestures || 0}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="metric-card">
                  <h4>Audience Response</h4>
                  <div className="metric-details">
                    <div className="metric-row">
                      <span>Final Reaction:</span>
                      <span>{sessionResults.audienceReaction}</span>
                    </div>
                    <div className="metric-row">
                      <span>Engagement:</span>
                      <span>{sessionResults.finalMetrics?.engagement || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'improvements' && (
          <div className="improvements-tab">
            <div className="improvement-sections">
              <div className="strengths-section">
                <h3>Your Strengths</h3>
                <div className="strengths-list">
                  {performanceReport.strengths.map((strength, index) => (
                    <div key={index} className="strength-item">
                      <span className="strength-icon">🌟</span>
                      <span className="strength-text">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="improvements-section">
                <h3>Areas for Improvement</h3>
                <div className="improvements-list">
                  {performanceReport.improvements.map((improvement, index) => (
                    <div key={index} className="improvement-item">
                      <div className="improvement-header">
                        <span className="improvement-area">{improvement.area}</span>
                        <span className={`priority-badge ${improvement.priority}`}>
                          {improvement.priority}
                        </span>
                      </div>
                      <p className="improvement-suggestion">{improvement.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="transcript-tab">
            <div className="transcript-container">
              <h3>Session Transcript</h3>
              <div className="transcript-content">
                {sessionResults.transcript || 'No transcript available for this session.'}
              </div>
              <div className="transcript-stats">
                <div className="stat-item">
                  <span className="stat-label">Words Spoken:</span>
                  <span className="stat-value">
                    {sessionResults.transcript ? sessionResults.transcript.split(' ').length : 0}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Average WPM:</span>
                  <span className="stat-value">{sessionResults.finalMetrics?.pace || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="next-steps">
        <h3>What's Next?</h3>
        <div className="next-steps-grid">
          <div className="next-step-card">
            <h4>Practice Again</h4>
            <p>Try the same scenario to improve your score</p>
            <button onClick={() => navigate(`/simulation?scenario=${sessionResults.scenario}`)}>
              Retry Scenario
            </button>
          </div>
          <div className="next-step-card">
            <h4>New Challenge</h4>
            <p>Explore different soft skills scenarios</p>
            <button onClick={() => navigate('/scenarios')}>
              Browse Scenarios
            </button>
          </div>
          <div className="next-step-card">
            <h4>Track Progress</h4>
            <p>View your improvement over time</p>
            <button onClick={() => console.log('Progress tracking coming soon')}>
              View Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
