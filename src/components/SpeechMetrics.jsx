import React, { useState, useEffect } from 'react';

const SpeechMetrics = ({ 
  metrics, 
  isRecording, 
  audienceReaction = 'neutral',
  onMetricsUpdate 
}) => {
  const [realtimeMetrics, setRealtimeMetrics] = useState({
    clarity: 0,
    pace: 0,
    confidence: 0,
    volume: 0,
    engagement: 0,
    fillerWords: 0,
    eyeContact: 0,
    gestures: 0
  });

  const [performanceHistory, setPerformanceHistory] = useState([]);

  useEffect(() => {
    if (metrics) {
      setRealtimeMetrics(prev => ({
        ...prev,
        ...metrics
      }));
      
      // Update performance history
      setPerformanceHistory(prev => [
        ...prev.slice(-19), // Keep last 20 data points
        {
          timestamp: Date.now(),
          ...metrics,
          audienceReaction
        }
      ]);

      onMetricsUpdate && onMetricsUpdate(metrics);
    }
  }, [metrics, audienceReaction, onMetricsUpdate]);

  const getMetricColor = (value, type = 'default') => {
    if (type === 'filler') {
      // Lower is better for filler words
      if (value <= 2) return 'metric-excellent';
      if (value <= 5) return 'metric-good';
      if (value <= 10) return 'metric-fair';
      return 'metric-poor';
    }
    
    // Higher is better for most metrics
    if (value >= 85) return 'metric-excellent';
    if (value >= 70) return 'metric-good';
    if (value >= 50) return 'metric-fair';
    return 'metric-poor';
  };

  const getAudienceReactionIcon = (reaction) => {
    switch (reaction) {
      case 'positive': return '😊';
      case 'engaged': return '👍';
      case 'neutral': return '😐';
      case 'bored': return '😴';
      case 'confused': return '😕';
      default: return '😐';
    }
  };

  const getEngagementLevel = () => {
    const avgScore = (realtimeMetrics.clarity + realtimeMetrics.confidence + realtimeMetrics.eyeContact) / 3;
    if (avgScore >= 80) return 'High';
    if (avgScore >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <div className="speech-metrics">
      <div className="metrics-header">
        <h3>Real-time Performance</h3>
        <div className="recording-indicator">
          <span className={`recording-dot ${isRecording ? 'active' : ''}`}></span>
          <span>{isRecording ? 'Recording' : 'Paused'}</span>
        </div>
      </div>

      {/* Core Speech Metrics */}
      <div className="metrics-section">
        <h4>Speech Analysis</h4>
        <div className="metrics-grid">
          <div className={`metric-item ${getMetricColor(realtimeMetrics.clarity)}`}>
            <div className="metric-icon">🗣️</div>
            <div className="metric-content">
              <span className="metric-label">Clarity</span>
              <span className="metric-value">{realtimeMetrics.clarity}%</span>
            </div>
          </div>
          
          <div className={`metric-item ${getMetricColor(realtimeMetrics.pace)}`}>
            <div className="metric-icon">⏱️</div>
            <div className="metric-content">
              <span className="metric-label">Pace</span>
              <span className="metric-value">{realtimeMetrics.pace} WPM</span>
            </div>
          </div>
          
          <div className={`metric-item ${getMetricColor(realtimeMetrics.confidence)}`}>
            <div className="metric-icon">💪</div>
            <div className="metric-content">
              <span className="metric-label">Confidence</span>
              <span className="metric-value">{realtimeMetrics.confidence}%</span>
            </div>
          </div>
          
          <div className={`metric-item ${getMetricColor(realtimeMetrics.volume)}`}>
            <div className="metric-icon">🔊</div>
            <div className="metric-content">
              <span className="metric-label">Volume</span>
              <span className="metric-value">{realtimeMetrics.volume}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Language & Presentation */}
      <div className="metrics-section">
        <h4>Body Language</h4>
        <div className="metrics-grid">
          <div className={`metric-item ${getMetricColor(realtimeMetrics.eyeContact)}`}>
            <div className="metric-icon">👁️</div>
            <div className="metric-content">
              <span className="metric-label">Eye Contact</span>
              <span className="metric-value">{realtimeMetrics.eyeContact}%</span>
            </div>
          </div>
          
          <div className={`metric-item ${getMetricColor(realtimeMetrics.gestures)}`}>
            <div className="metric-icon">🤲</div>
            <div className="metric-content">
              <span className="metric-label">Gestures</span>
              <span className="metric-value">{realtimeMetrics.gestures}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audience Engagement */}
      <div className="metrics-section">
        <h4>Audience Response</h4>
        <div className="audience-feedback">
          <div className="audience-reaction">
            <span className="reaction-icon">{getAudienceReactionIcon(audienceReaction)}</span>
            <span className="reaction-text">{audienceReaction.charAt(0).toUpperCase() + audienceReaction.slice(1)}</span>
          </div>
          <div className="engagement-level">
            <span className="engagement-label">Engagement:</span>
            <span className={`engagement-value ${getEngagementLevel().toLowerCase()}`}>
              {getEngagementLevel()}
            </span>
          </div>
        </div>
      </div>

      {/* Areas for Improvement */}
      <div className="metrics-section">
        <h4>Quick Tips</h4>
        <div className="improvement-tips">
          {realtimeMetrics.fillerWords > 5 && (
            <div className="tip-item">
              <span className="tip-icon">⚠️</span>
              <span>Reduce filler words (um, uh, like)</span>
            </div>
          )}
          {realtimeMetrics.pace < 120 && (
            <div className="tip-item">
              <span className="tip-icon">🐌</span>
              <span>Speak a bit faster to maintain engagement</span>
            </div>
          )}
          {realtimeMetrics.pace > 180 && (
            <div className="tip-item">
              <span className="tip-icon">🏃</span>
              <span>Slow down for better clarity</span>
            </div>
          )}
          {realtimeMetrics.eyeContact < 60 && (
            <div className="tip-item">
              <span className="tip-icon">👀</span>
              <span>Make more eye contact with audience</span>
            </div>
          )}
          {realtimeMetrics.volume < 50 && (
            <div className="tip-item">
              <span className="tip-icon">📢</span>
              <span>Project your voice more clearly</span>
            </div>
          )}
        </div>
      </div>

      {/* Performance Trend */}
      {performanceHistory.length > 5 && (
        <div className="metrics-section">
          <h4>Performance Trend</h4>
          <div className="trend-indicator">
            <div className="trend-chart">
              {/* Simple trend visualization */}
              {performanceHistory.slice(-10).map((point, index) => (
                <div 
                  key={index} 
                  className="trend-bar"
                  style={{ 
                    height: `${(point.clarity + point.confidence) / 2}%`,
                    backgroundColor: point.audienceReaction === 'positive' ? '#4ade80' : 
                                   point.audienceReaction === 'neutral' ? '#fbbf24' : '#f87171'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechMetrics;
