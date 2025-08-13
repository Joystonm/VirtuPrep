import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#667eea' }}>🎯 VirtuPrep - Soft Skills Trainer</h1>
      <p>Welcome to VirtuPrep! The application is loading successfully.</p>
      <div style={{ marginTop: '2rem' }}>
        <h2>🚀 Features Coming Soon:</h2>
        <ul>
          <li>🎤 Public Speaking Training</li>
          <li>👥 Team Leadership Scenarios</li>
          <li>🤝 Collaboration Exercises</li>
          <li>📊 Real-time Performance Analytics</li>
          <li>🥽 VR Environment Support</li>
        </ul>
      </div>
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f0f9ff', 
        borderRadius: '8px',
        border: '1px solid #0ea5e9'
      }}>
        <p><strong>✅ Server is running correctly!</strong></p>
        <p>The React application has loaded successfully. We can now add more features.</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
