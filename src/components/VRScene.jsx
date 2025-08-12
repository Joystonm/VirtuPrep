import React, { useState, useEffect } from 'react';

const VRScene = ({ scenario, onAudienceReaction, onSceneReady }) => {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [audienceReaction, setAudienceReaction] = useState('neutral');

  useEffect(() => {
    // Simulate scene loading
    const timer = setTimeout(() => {
      setSceneLoaded(true);
      onSceneReady && onSceneReady();
    }, 1000);

    return () => clearTimeout(timer);
  }, [scenario, onSceneReady]);

  // Simulate audience reactions
  useEffect(() => {
    const reactionInterval = setInterval(() => {
      const reactions = ['positive', 'engaged', 'neutral', 'bored', 'confused'];
      const newReaction = reactions[Math.floor(Math.random() * reactions.length)];
      setAudienceReaction(newReaction);
      onAudienceReaction && onAudienceReaction(newReaction);
    }, 3000);

    return () => clearInterval(reactionInterval);
  }, [onAudienceReaction]);

  const getScenarioDescription = (scenarioType) => {
    const descriptions = {
      'public-speaking': 'Large auditorium with audience of 100+ people',
      'presentation-skills': 'Professional conference room with projection screen',
      'team-leadership': 'Round table meeting room with team members',
      'collaboration': 'Workshop space with multiple work stations',
      'networking': 'Professional networking event environment',
      'interview-skills': 'Corporate office interview setting'
    };
    return descriptions[scenarioType] || 'Professional training environment';
  };

  return (
    <div className="vr-scene">
      <div className="scene-container">
        {!sceneLoaded ? (
          <div className="scene-loading">
            <div className="loading-spinner"></div>
            <p>Loading VR Environment...</p>
          </div>
        ) : (
          <div className="scene-content">
            <div className="scene-info">
              <h3>🎭 {scenario?.replace('-', ' ').toUpperCase() || 'VR TRAINING'}</h3>
              <p>{getScenarioDescription(scenario)}</p>
              <div className="audience-status">
                <span>Audience Reaction: </span>
                <span className={`reaction-indicator ${audienceReaction}`}>
                  {audienceReaction.charAt(0).toUpperCase() + audienceReaction.slice(1)}
                </span>
              </div>
            </div>
            <div className="scene-placeholder">
              <div className="environment-preview">
                <div className="stage-area">
                  <div className="virtual-stage"></div>
                  <div className="audience-area">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={`audience-member ${audienceReaction}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="scene-controls">
        <button className="control-btn" onClick={() => setAudienceReaction('positive')}>
          😊 Positive
        </button>
        <button className="control-btn" onClick={() => setAudienceReaction('neutral')}>
          😐 Neutral
        </button>
        <button className="control-btn" onClick={() => setAudienceReaction('confused')}>
          😕 Confused
        </button>
      </div>
    </div>
  );
};

export default VRScene;
