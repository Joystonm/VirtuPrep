import React, { useState, useEffect } from 'react';

const VRTrainingSimple = () => {
  const [currentScenario, setCurrentScenario] = useState('auditorium');
  const [isTrainingActive, setIsTrainingActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [metrics, setMetrics] = useState({
    clarity: 85,
    engagement: 72,
    pace: 145,
    confidence: 78
  });

  useEffect(() => {
    let interval;
    if (isTrainingActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        
        // Simulate metric changes
        setMetrics(prev => ({
          clarity: Math.max(60, Math.min(100, prev.clarity + (Math.random() - 0.5) * 10)),
          engagement: Math.max(50, Math.min(100, prev.engagement + (Math.random() - 0.5) * 15)),
          pace: Math.max(120, Math.min(180, prev.pace + (Math.random() - 0.5) * 20)),
          confidence: Math.max(60, Math.min(100, prev.confidence + (Math.random() - 0.5) * 8))
        }));
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTrainingActive]);

  const handleStartTraining = () => {
    setIsTrainingActive(true);
  };

  const handleStopTraining = () => {
    setIsTrainingActive(false);
    setSessionTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🥽 VR Training Experience
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
          Immersive soft skills training with real-time feedback and AI-powered coaching
        </p>
        
        {isTrainingActive && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '1rem'
          }}>
            <div style={{
              padding: '0.5rem 1rem',
              background: 'rgba(0, 255, 136, 0.1)',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              borderRadius: '25px'
            }}>
              <span>Session Time: </span>
              <span style={{ color: '#00ff88', fontWeight: 600 }}>{formatTime(sessionTime)}</span>
            </div>
            <div style={{
              padding: '0.5rem 1rem',
              background: 'rgba(0, 255, 136, 0.1)',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              borderRadius: '25px'
            }}>
              <span>Environment: </span>
              <span style={{ color: '#00ff88', fontWeight: 600 }}>
                {currentScenario === 'auditorium' ? '🎭 Auditorium' : '💼 Meeting Room'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Performance Dashboard */}
        {isTrainingActive && (
          <div style={{
            width: '350px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(15px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 2rem 0', color: '#00ff88', textAlign: 'center' }}>
              📊 Live Performance Analytics
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                    {key === 'pace' ? `${key}: ${value} WPM` : `${key}: ${Math.round(value)}%`}
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${key === 'pace' ? (value / 180) * 100 : value}%`,
                      height: '100%',
                      background: key === 'clarity' ? 'linear-gradient(90deg, #3b82f6, #1d4ed8)' :
                                 key === 'engagement' ? 'linear-gradient(90deg, #10b981, #059669)' :
                                 key === 'pace' ? 'linear-gradient(90deg, #f59e0b, #d97706)' :
                                 'linear-gradient(90deg, #8b5cf6, #7c3aed)',
                      borderRadius: '4px',
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Training Area */}
        <div style={{ flex: 1 }}>
          {!isTrainingActive ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '3rem',
              textAlign: 'center'
            }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>
                Choose Your Training Environment
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                <div 
                  style={{
                    padding: '2rem',
                    background: currentScenario === 'auditorium' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: currentScenario === 'auditorium' ? '2px solid #00ff88' : '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setCurrentScenario('auditorium')}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎭</div>
                  <h3 style={{ marginBottom: '1rem' }}>Auditorium Training</h3>
                  <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                    Practice public speaking with a large virtual audience
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                    <li style={{ padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span>
                      80+ animated audience members
                    </li>
                    <li style={{ padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span>
                      Professional stage lighting
                    </li>
                    <li style={{ padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span>
                      Dynamic crowd reactions
                    </li>
                  </ul>
                </div>
                
                <div 
                  style={{
                    padding: '2rem',
                    background: currentScenario === 'meeting' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: currentScenario === 'meeting' ? '2px solid #00ff88' : '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setCurrentScenario('meeting')}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
                  <h3 style={{ marginBottom: '1rem' }}>Meeting Room Training</h3>
                  <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                    Develop leadership skills in professional meetings
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                    <li style={{ padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span>
                      Interactive team members
                    </li>
                    <li style={{ padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span>
                      Presentation challenges
                    </li>
                    <li style={{ padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#00ff88' }}>✓</span>
                      Conflict resolution scenarios
                    </li>
                  </ul>
                </div>
              </div>
              
              <button 
                onClick={handleStartTraining}
                style={{
                  background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  padding: '1.5rem 3rem',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)'
                }}
              >
                <span>🚀</span>
                <span>Start VR Training</span>
              </button>
            </div>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '2rem',
              minHeight: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                  {currentScenario === 'auditorium' ? '🎭 Auditorium Training Active' : '💼 Meeting Room Training Active'}
                </h3>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem' }}>
                  VR Environment is running... (3D scene would be rendered here)
                </p>
                <div style={{
                  width: '200px',
                  height: '200px',
                  border: '4px solid rgba(0, 255, 136, 0.3)',
                  borderTop: '4px solid #00ff88',
                  borderRadius: '50%',
                  animation: 'spin 2s linear infinite',
                  margin: '0 auto 2rem'
                }}></div>
              </div>
              
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '1rem'
              }}>
                <button 
                  onClick={() => setCurrentScenario(currentScenario === 'auditorium' ? 'meeting' : 'auditorium')}
                  style={{
                    background: 'rgba(0, 255, 136, 0.2)',
                    border: '1px solid rgba(0, 255, 136, 0.5)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Switch Environment
                </button>
                
                <button 
                  onClick={handleStopTraining}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    cursor: 'pointer'
                  }}
                >
                  ⏹️ End Training
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VRTrainingSimple;
