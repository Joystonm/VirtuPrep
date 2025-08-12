import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import VRScene from '../components/VRScene';
import SpeechMetrics from '../components/SpeechMetrics';
import useSpeechAnalysis from '../hooks/useSpeechAnalysis';
import useVRControls from '../hooks/useVRControls';

const Simulation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scenario = searchParams.get('scenario') || 'public-speaking';
  
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [audienceReaction, setAudienceReaction] = useState('neutral');
  const [sessionData, setSessionData] = useState({
    scenario,
    startTime: null,
    challenges: [],
    performanceMetrics: []
  });

  // Custom hooks
  const {
    isRecording,
    speechMetrics,
    transcript,
    startRecording,
    stopRecording
  } = useSpeechAnalysis();

  const {
    isVRSupported,
    isVRActive,
    enterVR,
    exitVR
  } = useVRControls();

  // Session timer
  useEffect(() => {
    let interval;
    if (sessionStarted) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStarted]);

  // Generate challenges based on scenario
  useEffect(() => {
    const challenges = generateChallenges(scenario);
    setSessionData(prev => ({ ...prev, challenges }));
  }, [scenario]);

  // Trigger challenges during session
  useEffect(() => {
    if (sessionStarted && sessionDuration > 0) {
      const challengeInterval = Math.floor(sessionDuration / 30); // Every 30 seconds
      const challenges = sessionData.challenges;
      
      if (challengeInterval < challenges.length && sessionDuration % 30 === 0) {
        setCurrentChallenge(challenges[challengeInterval]);
        
        // Auto-dismiss challenge after 10 seconds
        setTimeout(() => {
          setCurrentChallenge(null);
        }, 10000);
      }
    }
  }, [sessionDuration, sessionStarted, sessionData.challenges]);

  const generateChallenges = (scenarioType) => {
    const challengeMap = {
      'public-speaking': [
        {
          type: 'audience_question',
          title: 'Audience Question',
          description: 'Someone in the audience raises their hand with a question.',
          prompt: 'How would you handle a challenging question from the audience?'
        },
        {
          type: 'technical_difficulty',
          title: 'Technical Issue',
          description: 'The microphone stops working temporarily.',
          prompt: 'Continue your presentation while the technical issue is resolved.'
        },
        {
          type: 'distraction',
          title: 'Distraction',
          description: 'Someone enters the room late, causing a distraction.',
          prompt: 'Maintain your composure and continue presenting.'
        }
      ],
      'presentation-skills': [
        {
          type: 'clarification_request',
          title: 'Clarification Needed',
          description: 'A colleague asks you to explain a complex concept in simpler terms.',
          prompt: 'Break down your explanation for better understanding.'
        },
        {
          type: 'time_pressure',
          title: 'Time Constraint',
          description: 'You have 2 minutes less than planned for your presentation.',
          prompt: 'Adjust your presentation to fit the reduced time.'
        }
      ],
      'team-leadership': [
        {
          type: 'conflict_resolution',
          title: 'Team Conflict',
          description: 'Two team members disagree on the project approach.',
          prompt: 'Mediate the conflict and guide the team to a solution.'
        },
        {
          type: 'difficult_decision',
          title: 'Tough Decision',
          description: 'You need to make a decision that affects the entire team.',
          prompt: 'Explain your reasoning and get team buy-in.'
        }
      ],
      'collaboration': [
        {
          type: 'idea_building',
          title: 'Build on Ideas',
          description: 'A team member shares an incomplete idea.',
          prompt: 'Help develop and improve the proposed idea.'
        },
        {
          type: 'consensus_building',
          title: 'Reach Consensus',
          description: 'The team is split on which direction to take.',
          prompt: 'Facilitate discussion to reach team consensus.'
        }
      ]
    };

    return challengeMap[scenarioType] || challengeMap['public-speaking'];
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    setSessionData(prev => ({ ...prev, startTime: Date.now() }));
    startRecording();
  };

  const handleEndSession = () => {
    setSessionStarted(false);
    stopRecording();
    
    // Prepare session results
    const results = {
      ...sessionData,
      endTime: Date.now(),
      duration: sessionDuration,
      finalMetrics: speechMetrics,
      transcript,
      audienceReaction
    };
    
    // Navigate to results page with data
    navigate('/results', { state: { sessionResults: results } });
  };

  const handleAudienceReaction = (reaction) => {
    setAudienceReaction(reaction);
  };

  const handleSceneReady = () => {
    console.log('VR Scene is ready');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

  return (
    <div className="simulation">
      <div className="simulation-header">
        <div className="session-info">
          <h2>{getScenarioTitle(scenario)} Simulation</h2>
          <div className="session-controls">
            <div className="timer">
              <span className="timer-label">Duration:</span>
              <span className="timer-value">{formatTime(sessionDuration)}</span>
            </div>
            
            {!sessionStarted ? (
              <button 
                className="start-session-btn"
                onClick={handleStartSession}
              >
                Start Session
              </button>
            ) : (
              <button 
                className="end-session-btn"
                onClick={handleEndSession}
              >
                End Session
              </button>
            )}
          </div>
        </div>

        <div className="vr-controls">
          {isVRSupported && (
            <button 
              className={`vr-toggle-btn ${isVRActive ? 'active' : ''}`}
              onClick={isVRActive ? exitVR : enterVR}
            >
              {isVRActive ? 'Exit VR' : 'Enter VR'}
            </button>
          )}
        </div>
      </div>

      <div className="simulation-container">
        <div className="vr-section">
          <VRScene 
            scenario={scenario}
            onAudienceReaction={handleAudienceReaction}
            onSceneReady={handleSceneReady}
          />
          
          {/* Challenge Overlay */}
          {currentChallenge && (
            <div className="challenge-overlay">
              <div className="challenge-card">
                <div className="challenge-header">
                  <h3>{currentChallenge.title}</h3>
                  <span className="challenge-type">{currentChallenge.type}</span>
                </div>
                <p className="challenge-description">{currentChallenge.description}</p>
                <p className="challenge-prompt">{currentChallenge.prompt}</p>
                <button 
                  className="challenge-dismiss"
                  onClick={() => setCurrentChallenge(null)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="metrics-section">
          <SpeechMetrics 
            metrics={speechMetrics}
            isRecording={isRecording}
            audienceReaction={audienceReaction}
            onMetricsUpdate={(metrics) => {
              setSessionData(prev => ({
                ...prev,
                performanceMetrics: [...prev.performanceMetrics, {
                  timestamp: Date.now(),
                  ...metrics
                }]
              }));
            }}
          />
          
          {/* Session Progress */}
          <div className="session-progress">
            <h4>Session Progress</h4>
            <div className="progress-items">
              <div className="progress-item">
                <span className="progress-label">Challenges Completed:</span>
                <span className="progress-value">
                  {sessionData.challenges.findIndex(c => c === currentChallenge) + 1} / {sessionData.challenges.length}
                </span>
              </div>
              <div className="progress-item">
                <span className="progress-label">Words Spoken:</span>
                <span className="progress-value">{transcript.split(' ').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="transcript-section">
          <h4>Live Transcript</h4>
          <div className="transcript-content">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulation;
