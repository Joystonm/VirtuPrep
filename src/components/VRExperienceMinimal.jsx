import React, { useState } from 'react';

const VRExperienceMinimal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLaunchVR = () => {
    setIsLoading(true);
    console.log('VR Launch clicked');
    
    setTimeout(() => {
      setIsLoading(false);
      alert('VR Experience launched successfully! (Minimal version)');
    }, 1000);
  };

  return (
    <section style={{
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        🥽 VR Experience
      </h2>
      
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Step into a new dimension of skill practice – right from your browser or VR headset.
      </p>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '3rem',
        borderRadius: '20px',
        marginBottom: '3rem',
        maxWidth: '800px',
        margin: '0 auto 3rem'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>🎭 Training Environments</h3>
        <p>Choose between Auditorium Mode and Meeting Room Mode</p>
      </div>

      <button 
        onClick={handleLaunchVR}
        disabled={isLoading}
        style={{
          background: isLoading ? '#666' : 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
          border: 'none',
          color: 'white',
          fontSize: '1.3rem',
          padding: '1.5rem 3rem',
          borderRadius: '50px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        {isLoading ? (
          <>
            <span>⏳</span>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <span>🚀</span>
            <span>Launch VR Experience</span>
          </>
        )}
      </button>

      <div style={{ marginTop: '2rem', opacity: 0.8 }}>
        <p>
          <strong>🖥️ Desktop:</strong> Click & drag to explore • 
          <strong>📱 Mobile:</strong> Touch & drag to navigate • 
          <strong>🥽 VR:</strong> Natural head movement
        </p>
      </div>
    </section>
  );
};

export default VRExperienceMinimal;
