import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Box, Sphere, Plane, Html } from '@react-three/drei';
import * as THREE from 'three';
import anime from 'animejs';
import '../styles/VRTraining.css';

// Enhanced VR Training Environment
const TrainingEnvironment = ({ scenario, onPerformanceUpdate, isVRActive }) => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [audienceEngagement, setAudienceEngagement] = useState(75);
  const groupRef = useRef();
  const audienceRef = useRef();
  const { camera, gl } = useThree();

  useFrame((state) => {
    if (groupRef.current && !isVRActive) {
      // Smooth camera rotation for preview
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }

    // Dynamic audience animation
    if (audienceRef.current) {
      audienceRef.current.children.forEach((child, i) => {
        const baseY = child.userData.baseY || 0;
        const engagement = audienceEngagement / 100;
        child.position.y = baseY + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1 * engagement;
      });
    }
  });

  useEffect(() => {
    // Simulate training challenges
    const challenges = [
      "A participant raises their hand with a question",
      "Someone in the back row looks confused",
      "The projector stops working",
      "A phone starts ringing",
      "Someone disagrees with your point"
    ];

    const challengeInterval = setInterval(() => {
      const challenge = challenges[Math.floor(Math.random() * challenges.length)];
      setCurrentChallenge(challenge);
      
      // Update performance metrics
      onPerformanceUpdate({
        challenge: challenge,
        engagement: audienceEngagement,
        timestamp: Date.now()
      });

      setTimeout(() => setCurrentChallenge(null), 5000);
    }, 10000);

    return () => clearInterval(challengeInterval);
  }, [audienceEngagement, onPerformanceUpdate]);

  const renderAuditorium = () => (
    <group ref={groupRef}>
      {/* Main Stage */}
      <Plane args={[25, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Plane>
      
      {/* Stage Backdrop */}
      <Plane args={[30, 15]} position={[0, 5, -12]}>
        <meshStandardMaterial color="#2C3E50" />
      </Plane>
      
      {/* Professional Lighting Setup */}
      <spotLight
        position={[0, 20, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-8, 15, 8]}
        angle={0.2}
        penumbra={0.3}
        intensity={2}
        color="#FFD700"
      />
      <spotLight
        position={[8, 15, 8]}
        angle={0.2}
        penumbra={0.3}
        intensity={2}
        color="#87CEEB"
      />
      
      {/* Audience Seating */}
      <group ref={audienceRef} position={[0, -1, 8]}>
        {Array.from({ length: 80 }, (_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          const x = (col - 4.5) * 2.5;
          const z = row * 2.5;
          const y = row * 0.4;
          
          return (
            <group key={i} position={[x, y, z]} userData={{ baseY: y }}>
              {/* Seat */}
              <Box args={[0.8, 0.1, 0.8]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#654321" />
              </Box>
              
              {/* Person */}
              <Sphere args={[0.3]} position={[0, 1.8, 0]}>
                <meshStandardMaterial 
                  color={audienceEngagement > 80 ? '#FFE4B5' : 
                        audienceEngagement > 60 ? '#F5DEB3' : '#D3D3D3'} 
                />
              </Sphere>
              <Box args={[0.6, 1.2, 0.4]} position={[0, 0.8, 0]}>
                <meshStandardMaterial 
                  color={audienceEngagement > 80 ? '#4169E1' : 
                        audienceEngagement > 60 ? '#32CD32' : '#708090'} 
                />
              </Box>
              
              {/* Occasional hand raise */}
              {Math.random() > 0.95 && (
                <Sphere args={[0.1]} position={[0.4, 2.2, 0]}>
                  <meshStandardMaterial color="#FFE4B5" />
                </Sphere>
              )}
            </group>
          );
        })}
      </group>
      
      {/* Interactive Elements */}
      {currentChallenge && (
        <Html position={[0, 8, -5]} center>
          <div className="challenge-popup">
            <h4>🎯 Training Challenge</h4>
            <p>{currentChallenge}</p>
          </div>
        </Html>
      )}
      
      {/* Performance Indicators */}
      <Text
        position={[-10, 6, -8]}
        fontSize={0.8}
        color={audienceEngagement > 80 ? '#00FF00' : 
              audienceEngagement > 60 ? '#FFFF00' : '#FF4500'}
        anchorX="center"
        anchorY="middle"
      >
        Engagement: {audienceEngagement}%
      </Text>
    </group>
  );

  const renderMeetingRoom = () => (
    <group ref={groupRef}>
      {/* Conference Room Floor */}
      <Plane args={[20, 15]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#F5F5DC" />
      </Plane>
      
      {/* Conference Table */}
      <Box args={[10, 0.3, 5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Presentation Screen */}
      <Plane args={[8, 5]} position={[0, 4, -6]}>
        <meshStandardMaterial color="#F0F0F0" />
      </Plane>
      
      {/* Meeting Participants */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 4;
        const z = Math.sin(angle) * 2;
        
        return (
          <group key={i} position={[x, 0.5, z]}>
            {/* Chair */}
            <Box args={[1, 2, 1]} position={[0, 1, 0]}>
              <meshStandardMaterial color="#654321" />
            </Box>
            
            {/* Person (skip one chair for user) */}
            {i !== 0 && (
              <>
                <Sphere args={[0.3]} position={[0, 2.5, 0]}>
                  <meshStandardMaterial color="#F5DEB3" />
                </Sphere>
                <Box args={[0.6, 1, 0.4]} position={[0, 1.5, 0]}>
                  <meshStandardMaterial color="#4169E1" />
                </Box>
              </>
            )}
          </group>
        );
      })}
      
      {/* Room Lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 8, 0]} intensity={2} />
      <pointLight position={[-5, 6, -3]} intensity={1} />
      <pointLight position={[5, 6, -3]} intensity={1} />
      
      {/* Challenge Display */}
      {currentChallenge && (
        <Html position={[0, 6, -5]} center>
          <div className="challenge-popup meeting">
            <h4>💼 Meeting Challenge</h4>
            <p>{currentChallenge}</p>
          </div>
        </Html>
      )}
    </group>
  );

  return (
    <>
      <Environment preset="studio" />
      <OrbitControls 
        enabled={!isVRActive}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={30}
      />
      
      {scenario === 'auditorium' ? renderAuditorium() : renderMeetingRoom()}
    </>
  );
};

// Performance Dashboard Component
const PerformanceDashboard = ({ metrics, isVisible }) => {
  const dashboardRef = useRef();

  useEffect(() => {
    if (dashboardRef.current) {
      anime({
        targets: dashboardRef.current,
        opacity: isVisible ? 1 : 0,
        translateX: isVisible ? 0 : -300,
        duration: 400,
        easing: 'easeOutCubic'
      });
    }
  }, [isVisible]);

  return (
    <div ref={dashboardRef} className="performance-dashboard">
      <div className="dashboard-header">
        <h3>📊 Live Performance Analytics</h3>
      </div>
      
      <div className="metrics-container">
        <div className="metric-card">
          <div className="metric-icon">🎯</div>
          <div className="metric-info">
            <span className="metric-label">Speech Clarity</span>
            <div className="metric-progress">
              <div 
                className="progress-bar clarity"
                style={{ width: `${metrics.clarity}%` }}
              ></div>
            </div>
            <span className="metric-value">{metrics.clarity}%</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-info">
            <span className="metric-label">Audience Engagement</span>
            <div className="metric-progress">
              <div 
                className="progress-bar engagement"
                style={{ width: `${metrics.engagement}%` }}
              ></div>
            </div>
            <span className="metric-value">{metrics.engagement}%</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-info">
            <span className="metric-label">Speaking Pace</span>
            <div className="metric-progress">
              <div 
                className="progress-bar pace"
                style={{ width: `${metrics.pace}%` }}
              ></div>
            </div>
            <span className="metric-value">{metrics.pace} WPM</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">🎭</div>
          <div className="metric-info">
            <span className="metric-label">Confidence Level</span>
            <div className="metric-progress">
              <div 
                className="progress-bar confidence"
                style={{ width: `${metrics.confidence}%` }}
              ></div>
            </div>
            <span className="metric-value">{metrics.confidence}%</span>
          </div>
        </div>
      </div>
      
      <div className="recent-challenges">
        <h4>Recent Challenges</h4>
        <div className="challenges-list">
          {metrics.recentChallenges?.map((challenge, index) => (
            <div key={index} className="challenge-item">
              <span className="challenge-time">
                {new Date(challenge.timestamp).toLocaleTimeString()}
              </span>
              <span className="challenge-text">{challenge.challenge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main VR Training Component
const VRTraining = () => {
  const [currentScenario, setCurrentScenario] = useState('auditorium');
  const [isVRActive, setIsVRActive] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [isTrainingActive, setIsTrainingActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [metrics, setMetrics] = useState({
    clarity: 85,
    engagement: 72,
    pace: 145,
    confidence: 78,
    recentChallenges: []
  });

  const sessionRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    let interval;
    if (isTrainingActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        
        // Simulate metric fluctuations during training
        setMetrics(prev => ({
          ...prev,
          clarity: Math.max(60, Math.min(100, prev.clarity + (Math.random() - 0.5) * 10)),
          engagement: Math.max(50, Math.min(100, prev.engagement + (Math.random() - 0.5) * 15)),
          pace: Math.max(120, Math.min(180, prev.pace + (Math.random() - 0.5) * 20)),
          confidence: Math.max(60, Math.min(100, prev.confidence + (Math.random() - 0.5) * 8))
        }));
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTrainingActive]);

  const handleStartTraining = async () => {
    setIsTrainingActive(true);
    
    // Check for WebXR support
    try {
      if ('xr' in navigator && await navigator.xr.isSessionSupported('immersive-vr')) {
        setIsVRActive(true);
      }
    } catch (error) {
      console.log('VR not supported, using desktop mode');
    }
    
    // Animate canvas entrance
    if (canvasRef.current) {
      anime({
        targets: canvasRef.current,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutBack'
      });
    }
  };

  const handleStopTraining = () => {
    setIsTrainingActive(false);
    setIsVRActive(false);
    setSessionTime(0);
  };

  const handlePerformanceUpdate = (data) => {
    setMetrics(prev => ({
      ...prev,
      recentChallenges: [data, ...prev.recentChallenges.slice(0, 4)]
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="vr-training-page">
      <div className="training-header">
        <div className="header-content">
          <h1>🥽 VR Training Experience</h1>
          <p>Immersive soft skills training with real-time feedback and AI-powered coaching</p>
          
          {isTrainingActive && (
            <div className="session-info">
              <div className="session-timer">
                <span className="timer-label">Session Time:</span>
                <span className="timer-value">{formatTime(sessionTime)}</span>
              </div>
              <div className="session-scenario">
                <span className="scenario-label">Environment:</span>
                <span className="scenario-value">
                  {currentScenario === 'auditorium' ? '🎭 Auditorium' : '💼 Meeting Room'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="training-container">
        {/* Performance Dashboard */}
        <PerformanceDashboard 
          metrics={metrics} 
          isVisible={showDashboard && isTrainingActive} 
        />

        {/* Main Training Area */}
        <div className="training-main">
          {!isTrainingActive ? (
            <div className="training-setup">
              <div className="setup-content">
                <h2>Choose Your Training Environment</h2>
                
                <div className="scenario-selection">
                  <div 
                    className={`scenario-option ${currentScenario === 'auditorium' ? 'active' : ''}`}
                    onClick={() => setCurrentScenario('auditorium')}
                  >
                    <div className="scenario-icon">🎭</div>
                    <h3>Auditorium Training</h3>
                    <p>Practice public speaking with a large virtual audience</p>
                    <ul>
                      <li>80+ animated audience members</li>
                      <li>Professional stage lighting</li>
                      <li>Dynamic crowd reactions</li>
                      <li>Unexpected interruptions</li>
                    </ul>
                  </div>
                  
                  <div 
                    className={`scenario-option ${currentScenario === 'meeting' ? 'active' : ''}`}
                    onClick={() => setCurrentScenario('meeting')}
                  >
                    <div className="scenario-icon">💼</div>
                    <h3>Meeting Room Training</h3>
                    <p>Develop leadership skills in professional meetings</p>
                    <ul>
                      <li>Interactive team members</li>
                      <li>Presentation challenges</li>
                      <li>Conflict resolution scenarios</li>
                      <li>Decision-making exercises</li>
                    </ul>
                  </div>
                </div>
                
                <button 
                  className="start-training-btn"
                  onClick={handleStartTraining}
                >
                  <span className="btn-icon">🚀</span>
                  <span>Start VR Training</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="training-canvas-container">
              <div ref={canvasRef} className="training-canvas">
                <Canvas
                  camera={{ position: [0, 5, 15], fov: 60 }}
                  shadows
                  gl={{ antialias: true }}
                >
                  <Suspense fallback={null}>
                    <TrainingEnvironment 
                      scenario={currentScenario}
                      onPerformanceUpdate={handlePerformanceUpdate}
                      isVRActive={isVRActive}
                    />
                  </Suspense>
                </Canvas>
                
                {/* Training Controls */}
                <div className="training-controls">
                  <button 
                    className="control-button"
                    onClick={() => setShowDashboard(!showDashboard)}
                  >
                    {showDashboard ? '📊 Hide Dashboard' : '📊 Show Dashboard'}
                  </button>
                  
                  <button 
                    className="control-button scenario-switch"
                    onClick={() => setCurrentScenario(
                      currentScenario === 'auditorium' ? 'meeting' : 'auditorium'
                    )}
                  >
                    🔄 Switch Environment
                  </button>
                  
                  <button 
                    className="control-button stop-training"
                    onClick={handleStopTraining}
                  >
                    ⏹️ End Training
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VRTraining;
