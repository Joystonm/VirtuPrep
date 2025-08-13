import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Box, Sphere, Plane } from '@react-three/drei';
import * as THREE from 'three';
import anime from 'animejs/lib/anime.es.js';
import '../styles/VRExperience.css';

// VR Environment Components
const AuditoriumEnvironment = ({ isVR, audienceReaction }) => {
  const groupRef = useRef();
  const audienceRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && !isVR) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    
    // Animate audience based on reaction
    if (audienceRef.current) {
      const intensity = audienceReaction === 'positive' ? 1.2 : 
                       audienceReaction === 'engaged' ? 1.0 : 0.8;
      audienceRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.1 * intensity;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Stage */}
      <Plane args={[20, 15]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Plane>
      
      {/* Backdrop */}
      <Plane args={[25, 12]} position={[0, 3, -10]}>
        <meshStandardMaterial color="#2C3E50" />
      </Plane>
      
      {/* Spotlights */}
      <spotLight
        position={[0, 15, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={2}
        castShadow
        target-position={[0, 0, 0]}
      />
      <spotLight
        position={[-5, 12, 8]}
        angle={0.2}
        penumbra={0.3}
        intensity={1.5}
        color="#FFD700"
      />
      
      {/* Audience */}
      <group ref={audienceRef} position={[0, -1, 8]}>
        {Array.from({ length: 50 }, (_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          const x = (col - 4.5) * 2;
          const z = row * 2;
          const y = row * 0.3;
          
          return (
            <group key={i} position={[x, y, z]}>
              {/* Head */}
              <Sphere args={[0.3]} position={[0, 1.5, 0]}>
                <meshStandardMaterial 
                  color={audienceReaction === 'positive' ? '#FFE4B5' : 
                        audienceReaction === 'bored' ? '#D3D3D3' : '#F5DEB3'} 
                />
              </Sphere>
              {/* Body */}
              <Box args={[0.6, 1, 0.4]} position={[0, 0.5, 0]}>
                <meshStandardMaterial 
                  color={audienceReaction === 'positive' ? '#4169E1' : 
                        audienceReaction === 'engaged' ? '#32CD32' : '#708090'} 
                />
              </Box>
            </group>
          );
        })}
      </group>
      
      {/* Floating feedback text */}
      <Text
        position={[0, 8, -5]}
        fontSize={1}
        color={audienceReaction === 'positive' ? '#00FF00' : 
              audienceReaction === 'bored' ? '#FF4500' : '#FFFFFF'}
        anchorX="center"
        anchorY="middle"
      >
        {audienceReaction === 'positive' ? '👏 Engaged Audience' :
         audienceReaction === 'bored' ? '😴 Losing Interest' :
         audienceReaction === 'confused' ? '🤔 Audience Confused' :
         '👥 Neutral Audience'}
      </Text>
    </group>
  );
};

const MeetingRoomEnvironment = ({ isVR, participantReaction }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && !isVR) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Conference Table */}
      <Box args={[8, 0.2, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Chairs and Participants */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 3;
        const z = Math.sin(angle) * 1.5;
        
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Chair */}
            <Box args={[0.8, 1.5, 0.8]} position={[0, 0.75, 0]}>
              <meshStandardMaterial color="#654321" />
            </Box>
            {/* Person (if not empty chair) */}
            {i < 6 && (
              <>
                <Sphere args={[0.25]} position={[0, 2, 0]}>
                  <meshStandardMaterial color="#F5DEB3" />
                </Sphere>
                <Box args={[0.5, 0.8, 0.3]} position={[0, 1.2, 0]}>
                  <meshStandardMaterial 
                    color={participantReaction === 'positive' ? '#4169E1' : '#708090'} 
                  />
                </Box>
              </>
            )}
          </group>
        );
      })}
      
      {/* Presentation Screen */}
      <Plane args={[6, 4]} position={[0, 3, -4]}>
        <meshStandardMaterial color="#F0F0F0" />
      </Plane>
      
      {/* Room lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 5, 0]} intensity={1} />
      
      {/* Feedback text */}
      <Text
        position={[0, 4, -3]}
        fontSize={0.5}
        color={participantReaction === 'positive' ? '#00FF00' : '#FFFFFF'}
        anchorX="center"
        anchorY="middle"
      >
        {participantReaction === 'positive' ? '✅ Team Engaged' :
         participantReaction === 'confused' ? '❓ Clarification Needed' :
         '💼 Professional Meeting'}
      </Text>
    </group>
  );
};

// Main VR Scene Component
const VRScene = ({ environment, isVR, onInteraction }) => {
  const [audienceReaction, setAudienceReaction] = useState('neutral');
  const { camera, gl } = useThree();
  
  useEffect(() => {
    // Simulate dynamic reactions
    const interval = setInterval(() => {
      const reactions = ['positive', 'engaged', 'neutral', 'bored', 'confused'];
      const newReaction = reactions[Math.floor(Math.random() * reactions.length)];
      setAudienceReaction(newReaction);
      onInteraction?.(newReaction);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [onInteraction]);

  useEffect(() => {
    if (isVR && 'xr' in navigator) {
      // WebXR setup
      gl.xr.enabled = true;
    }
  }, [isVR, gl]);

  return (
    <>
      <Environment preset="studio" />
      <OrbitControls 
        enabled={!isVR}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={50}
      />
      
      {environment === 'auditorium' ? (
        <AuditoriumEnvironment isVR={isVR} audienceReaction={audienceReaction} />
      ) : (
        <MeetingRoomEnvironment isVR={isVR} participantReaction={audienceReaction} />
      )}
    </>
  );
};

// Performance HUD Component
const PerformanceHUD = ({ metrics, isVisible }) => {
  const hudRef = useRef();
  
  useEffect(() => {
    if (hudRef.current) {
      anime({
        targets: hudRef.current,
        opacity: isVisible ? 1 : 0,
        translateY: isVisible ? 0 : -20,
        duration: 300,
        easing: 'easeOutQuart'
      });
    }
  }, [isVisible]);

  return (
    <div ref={hudRef} className="performance-hud">
      <div className="hud-panel">
        <h4>🎯 Live Feedback</h4>
        <div className="metrics-grid">
          <div className="metric">
            <span className="metric-label">Speech Clarity</span>
            <div className="metric-bar">
              <div 
                className="metric-fill" 
                style={{ width: `${metrics.clarity}%` }}
              ></div>
            </div>
            <span className="metric-value">{metrics.clarity}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Engagement</span>
            <div className="metric-bar">
              <div 
                className="metric-fill engagement" 
                style={{ width: `${metrics.engagement}%` }}
              ></div>
            </div>
            <span className="metric-value">{metrics.engagement}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Pace</span>
            <div className="metric-bar">
              <div 
                className="metric-fill pace" 
                style={{ width: `${metrics.pace}%` }}
              ></div>
            </div>
            <span className="metric-value">{metrics.pace}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main VR Experience Component
const VRExperience = () => {
  const [currentEnvironment, setCurrentEnvironment] = useState('auditorium');
  const [isVRMode, setIsVRMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHUD, setShowHUD] = useState(false);
  const [metrics, setMetrics] = useState({
    clarity: 85,
    engagement: 72,
    pace: 90
  });
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const canvasRef = useRef();
  const heroRef = useRef();

  useEffect(() => {
    // Animate hero section on mount
    if (heroRef.current) {
      anime({
        targets: heroRef.current.children,
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutQuart'
      });
    }
  }, []);

  const handleLaunchVR = async () => {
    setIsLoading(true);
    
    try {
      // Check for WebXR support
      if ('xr' in navigator && await navigator.xr.isSessionSupported('immersive-vr')) {
        setIsVRMode(true);
        setIsPreviewMode(false);
        setShowHUD(true);
      } else {
        // Fallback to desktop mode
        setIsPreviewMode(false);
        setShowHUD(true);
      }
    } catch (error) {
      console.log('VR not supported, using desktop mode');
      setIsPreviewMode(false);
      setShowHUD(true);
    }
    
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleEnvironmentSwitch = (env) => {
    setCurrentEnvironment(env);
    
    // Animate transition
    if (canvasRef.current) {
      anime({
        targets: canvasRef.current,
        opacity: [1, 0.3, 1],
        duration: 600,
        easing: 'easeInOutQuart'
      });
    }
  };

  const handleInteraction = (reaction) => {
    // Update metrics based on audience reaction
    const newMetrics = { ...metrics };
    
    switch (reaction) {
      case 'positive':
        newMetrics.engagement = Math.min(100, metrics.engagement + 5);
        break;
      case 'bored':
        newMetrics.engagement = Math.max(0, metrics.engagement - 10);
        break;
      case 'confused':
        newMetrics.clarity = Math.max(0, metrics.clarity - 5);
        break;
      default:
        break;
    }
    
    setMetrics(newMetrics);
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
        
        {/* Environment Preview */}
        <div className="vr-preview-container">
          <div ref={canvasRef} className="vr-canvas-container">
            <Canvas
              camera={{ position: [0, 5, 15], fov: 60 }}
              shadows
              className="vr-preview-canvas"
            >
              <Suspense fallback={null}>
                <VRScene 
                  environment={currentEnvironment}
                  isVR={isVRMode}
                  onInteraction={handleInteraction}
                />
              </Suspense>
            </Canvas>
            
            {/* Canvas Overlay Controls */}
            {!isPreviewMode && (
              <div className="canvas-controls">
                <button 
                  className="control-btn"
                  onClick={() => setShowHUD(!showHUD)}
                >
                  {showHUD ? '📊 Hide HUD' : '📊 Show HUD'}
                </button>
                <button 
                  className="control-btn"
                  onClick={() => setIsPreviewMode(true)}
                >
                  ↩️ Exit
                </button>
              </div>
            )}
          </div>
          
          {/* Performance HUD */}
          <PerformanceHUD metrics={metrics} isVisible={showHUD && !isPreviewMode} />
        </div>
      </div>

      {/* Environment Selection */}
      <div className="environment-selection">
        <h3>Choose Your Training Environment</h3>
        <div className="environment-cards">
          <div 
            className={`environment-card ${currentEnvironment === 'auditorium' ? 'active' : ''}`}
            onClick={() => handleEnvironmentSwitch('auditorium')}
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
            onClick={() => handleEnvironmentSwitch('meeting')}
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
              <span className="btn-glow"></span>
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

export default VRExperience;
