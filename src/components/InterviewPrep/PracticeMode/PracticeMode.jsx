import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { interviewQuestions } from '../QuestionBank/questionData';
import VirtualInterviewer from './VirtualInterviewer';
import './PracticeMode.css';

const PracticeMode = ({ userProgress, updateProgress }) => {
  const [currentMode, setCurrentMode] = useState('setup'); // setup, practice, feedback
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [selectedCategory, setSelectedCategory] = useState('behavioral');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    averageScore: 0,
    totalTime: 0,
    startTime: null
  });
  const [groqApiKey, setGroqApiKey] = useState(
    process.env.REACT_APP_GROQ_API_KEY || localStorage.getItem('groqApiKey') || ''
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = [
    { id: 'behavioral', name: 'Behavioral', icon: '🧠' },
    { id: 'technical', name: 'Technical', icon: '💻' },
    { id: 'situational', name: 'Situational', icon: '🎯' },
    { id: 'personal', name: 'Personal', icon: '👤' },
    { id: 'company', name: 'Company-Specific', icon: '🏢' }
  ];

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript + ' ');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startPracticeSession = () => {
    if (!groqApiKey) {
      alert('Please enter your Groq API key to use AI features');
      return;
    }

    const filteredQuestions = interviewQuestions.filter(q => 
      q.difficulty === selectedDifficulty && q.category === selectedCategory
    );

    if (filteredQuestions.length === 0) {
      alert('No questions found for the selected criteria');
      return;
    }

    const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setCurrentMode('practice');
    setSessionStats(prev => ({ ...prev, startTime: Date.now() }));
    
    // Animate transition
    anime({
      targets: '.practice-interface',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      easing: 'easeOutQuart'
    });
  };

  const startRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    setIsRecording(true);
    setTranscript('');
    setRecordingTime(0);
    recognitionRef.current.start();

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    // Animate recording indicator
    anime({
      targets: '.recording-indicator',
      scale: [1, 1.2, 1],
      duration: 1000,
      loop: true,
      easing: 'easeInOutSine'
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Analyze the response
    if (transcript.trim()) {
      analyzeResponse();
    }
  };

  const analyzeResponse = async () => {
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: `You are an expert interview coach. Analyze the candidate's response to the interview question and provide detailed feedback. 

              Evaluate the response on these criteria (score 1-10 for each):
              1. Content Quality - How well did they answer the question?
              2. Structure - Was the answer well-organized (STAR method for behavioral questions)?
              3. Clarity - How clear and articulate was the response?
              4. Confidence - Did they sound confident and professional?
              5. Completeness - Did they fully address the question?

              Also analyze:
              - Filler words usage (um, uh, like, etc.)
              - Speaking pace and flow
              - Specific strengths in the response
              - Areas for improvement
              - Suggestions for better answers

              Provide your analysis in JSON format:
              {
                "scores": {
                  "content": number,
                  "structure": number,
                  "clarity": number,
                  "confidence": number,
                  "completeness": number
                },
                "overallScore": number,
                "fillerWords": number,
                "speakingPace": "slow/good/fast",
                "strengths": ["strength1", "strength2"],
                "improvements": ["improvement1", "improvement2"],
                "suggestions": "Detailed suggestions for improvement",
                "followUpQuestions": ["question1", "question2"]
              }`
            },
            {
              role: 'user',
              content: `Interview Question: "${currentQuestion.question}"
              
              Category: ${currentQuestion.category}
              Difficulty: ${currentQuestion.difficulty}
              
              Candidate's Response: "${transcript}"
              
              Please analyze this response and provide detailed feedback.`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze response');
      }

      const data = await response.json();
      const analysisText = data.choices[0].message.content;
      
      try {
        const analysis = JSON.parse(analysisText);
        setAiAnalysis(analysis);
        setCurrentMode('feedback');
        
        // Update session stats
        setSessionStats(prev => ({
          ...prev,
          questionsAnswered: prev.questionsAnswered + 1,
          averageScore: ((prev.averageScore * prev.questionsAnswered) + analysis.overallScore) / (prev.questionsAnswered + 1),
          totalTime: Date.now() - prev.startTime
        }));

        // Update user progress
        const newStats = {
          ...userProgress.practiceStats,
          totalQuestions: userProgress.practiceStats.totalQuestions + 1,
          averageScore: Math.round(((userProgress.practiceStats.averageScore * userProgress.practiceStats.totalQuestions) + analysis.overallScore) / (userProgress.practiceStats.totalQuestions + 1))
        };
        updateProgress({ practiceStats: newStats });

      } catch (parseError) {
        console.error('Error parsing AI analysis:', parseError);
        setAiAnalysis({
          overallScore: 7,
          scores: { content: 7, structure: 7, clarity: 7, confidence: 7, completeness: 7 },
          strengths: ['Good effort'],
          improvements: ['Continue practicing'],
          suggestions: 'Keep practicing to improve your interview skills.'
        });
        setCurrentMode('feedback');
      }
    } catch (error) {
      console.error('Error analyzing response:', error);
      alert('Error analyzing your response. Please check your API key and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const nextQuestion = () => {
    const filteredQuestions = interviewQuestions.filter(q => 
      q.difficulty === selectedDifficulty && q.category === selectedCategory
    );
    const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setCurrentMode('practice');
    setTranscript('');
    setAiAnalysis(null);
  };

  const endSession = () => {
    setCurrentMode('setup');
    setCurrentQuestion(null);
    setTranscript('');
    setAiAnalysis(null);
    setSessionStats({
      questionsAnswered: 0,
      averageScore: 0,
      totalTime: 0,
      startTime: null
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#27ae60';
    if (score >= 6) return '#f39c12';
    return '#e74c3c';
  };

  if (currentMode === 'setup') {
    return (
      <div className="practice-mode">
        <div className="practice-setup">
          <div className="setup-header">
            <h2>🤖 AI Interview Practice</h2>
            <p>Practice with our AI interviewer and get instant feedback</p>
          </div>

          {!groqApiKey && (
            <div className="api-key-section">
              <h3>🔑 Setup Required</h3>
              <p>Enter your Groq API key to enable AI-powered coaching:</p>
              <div className="api-key-input">
                <input
                  type="password"
                  placeholder="Enter your Groq API key..."
                  value={groqApiKey}
                  onChange={(e) => setGroqApiKey(e.target.value)}
                />
                <button 
                  onClick={() => localStorage.setItem('groqApiKey', groqApiKey)}
                  className="save-key-btn"
                >
                  Save Key
                </button>
              </div>
              <p className="api-help">
                Get your free API key at <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer">console.groq.com</a>
              </p>
            </div>
          )}

          <div className="setup-options">
            <div className="option-group">
              <h3>📊 Difficulty Level</h3>
              <div className="difficulty-buttons">
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    className={`difficulty-btn ${selectedDifficulty === difficulty ? 'active' : ''}`}
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <h3>📂 Question Category</h3>
              <div className="category-buttons">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            className="start-practice-btn"
            onClick={startPracticeSession}
            disabled={!groqApiKey}
          >
            🚀 Start Practice Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-mode">
      {currentMode === 'practice' && (
        <div className="practice-interface">
          <div className="practice-header">
            <div className="session-info">
              <span>Questions: {sessionStats.questionsAnswered}</span>
              <span>Category: {selectedCategory}</span>
              <span>Difficulty: {selectedDifficulty}</span>
            </div>
            <button className="end-session-btn" onClick={endSession}>
              End Session
            </button>
          </div>

          <div className="practice-content">
            <div className="left-panel">
              <div className="current-question">
                <h3>Current Question</h3>
                <div className="question-display">
                  <p>{currentQuestion?.question}</p>
                </div>
                
                <div className="question-meta">
                  <span className="question-category">{currentQuestion?.category}</span>
                  <span className="question-difficulty">{currentQuestion?.difficulty}</span>
                </div>
              </div>

              <div className="recording-controls">
                {!isRecording ? (
                  <button className="start-recording-btn" onClick={startRecording}>
                    🎤 Start Speaking
                  </button>
                ) : (
                  <button className="stop-recording-btn" onClick={stopRecording}>
                    ⏹️ Stop Recording
                  </button>
                )}
                
                {isRecording && (
                  <div className="recording-status">
                    <div className="recording-indicator"></div>
                    <span>Recording: {formatTime(recordingTime)}</span>
                  </div>
                )}
              </div>

              <div className="live-transcript">
                <h4>Live Transcription</h4>
                <div className="transcript-box">
                  {transcript || 'Your speech will appear here...'}
                </div>
              </div>
            </div>

            <div className="right-panel">
              <VirtualInterviewer isListening={isRecording} />
              
              <div className="interview-tips">
                <h4>💡 Quick Tips</h4>
                <ul>
                  <li>Take a moment to think before speaking</li>
                  <li>Use the STAR method for behavioral questions</li>
                  <li>Speak clearly and at a moderate pace</li>
                  <li>Provide specific examples</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentMode === 'feedback' && (
        <div className="feedback-interface">
          <div className="feedback-header">
            <h2>📊 AI Analysis & Feedback</h2>
            <p>Here's how you performed on this question</p>
          </div>

          {isAnalyzing ? (
            <div className="analyzing-state">
              <div className="analyzing-spinner"></div>
              <p>AI is analyzing your response...</p>
            </div>
          ) : aiAnalysis && (
            <div className="feedback-content">
              <div className="overall-score">
                <div className="score-circle" style={{ borderColor: getScoreColor(aiAnalysis.overallScore) }}>
                  <span className="score-value">{aiAnalysis.overallScore}</span>
                  <span className="score-label">/ 10</span>
                </div>
                <h3>Overall Score</h3>
              </div>

              <div className="detailed-scores">
                <h3>📈 Detailed Breakdown</h3>
                <div className="scores-grid">
                  {Object.entries(aiAnalysis.scores || {}).map(([key, value]) => (
                    <div key={key} className="score-item">
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ 
                            width: `${value * 10}%`,
                            backgroundColor: getScoreColor(value)
                          }}
                        ></div>
                      </div>
                      <span className="score-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="score-number">{value}/10</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="feedback-sections">
                <div className="strengths-section">
                  <h3>✅ Strengths</h3>
                  <ul>
                    {aiAnalysis.strengths?.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="improvements-section">
                  <h3>🎯 Areas for Improvement</h3>
                  <ul>
                    {aiAnalysis.improvements?.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>

                <div className="suggestions-section">
                  <h3>💡 Detailed Suggestions</h3>
                  <p>{aiAnalysis.suggestions}</p>
                </div>

                {aiAnalysis.followUpQuestions && (
                  <div className="followup-section">
                    <h3>🔄 Potential Follow-up Questions</h3>
                    <ul>
                      {aiAnalysis.followUpQuestions.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="feedback-actions">
                <button className="next-question-btn" onClick={nextQuestion}>
                  ➡️ Next Question
                </button>
                <button className="end-session-btn" onClick={endSession}>
                  📊 View Session Summary
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PracticeMode;
