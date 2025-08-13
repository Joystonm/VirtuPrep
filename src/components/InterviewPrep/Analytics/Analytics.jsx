import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import anime from 'animejs';
import './Analytics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Analytics = ({ userProgress }) => {
  const statsRef = useRef(null);

  useEffect(() => {
    // Animate stats cards
    anime({
      targets: '.stat-card',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutQuart'
    });

    // Animate progress bars
    anime({
      targets: '.progress-bar-fill',
      width: (el) => el.dataset.width,
      delay: 800,
      duration: 1000,
      easing: 'easeOutQuart'
    });
  }, []);

  const mockSessionData = [
    { date: '2024-01-15', score: 6.5, questionsAnswered: 5, category: 'behavioral' },
    { date: '2024-01-16', score: 7.2, questionsAnswered: 4, category: 'technical' },
    { date: '2024-01-17', score: 7.8, questionsAnswered: 6, category: 'behavioral' },
    { date: '2024-01-18', score: 8.1, questionsAnswered: 5, category: 'situational' },
    { date: '2024-01-19', score: 8.5, questionsAnswered: 7, category: 'behavioral' },
    { date: '2024-01-20', score: 8.9, questionsAnswered: 6, category: 'technical' },
    { date: '2024-01-21', score: 9.2, questionsAnswered: 8, category: 'personal' }
  ];

  const progressData = {
    labels: mockSessionData.map(session => new Date(session.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Interview Score',
        data: mockSessionData.map(session => session.score),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }
    ]
  };

  const categoryData = {
    labels: ['Behavioral', 'Technical', 'Situational', 'Personal', 'Company'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#9b59b6',
          '#3498db',
          '#e67e22',
          '#1abc9c',
          '#34495e'
        ],
        borderWidth: 0,
        hoverOffset: 10
      }
    ]
  };

  const skillsData = {
    labels: ['Content Quality', 'Structure', 'Clarity', 'Confidence', 'Completeness'],
    datasets: [
      {
        label: 'Current Level',
        data: [8.2, 7.8, 8.5, 7.2, 8.0],
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: '#667eea',
        borderWidth: 2
      },
      {
        label: 'Target Level',
        data: [9.0, 9.0, 9.0, 9.0, 9.0],
        backgroundColor: 'rgba(39, 174, 96, 0.3)',
        borderColor: '#27ae60',
        borderWidth: 2,
        borderDash: [5, 5]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#27ae60';
    if (score >= 6) return '#f39c12';
    return '#e74c3c';
  };

  const getImprovementTrend = () => {
    if (mockSessionData.length < 2) return 'neutral';
    const recent = mockSessionData.slice(-3);
    const average = recent.reduce((sum, session) => sum + session.score, 0) / recent.length;
    const previous = mockSessionData.slice(-6, -3);
    const previousAverage = previous.length > 0 ? previous.reduce((sum, session) => sum + session.score, 0) / previous.length : average;
    
    if (average > previousAverage + 0.3) return 'improving';
    if (average < previousAverage - 0.3) return 'declining';
    return 'stable';
  };

  const improvementTrend = getImprovementTrend();

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>📊 Your Progress Analytics</h2>
        <p>Track your interview performance and identify areas for improvement</p>
      </div>

      <div className="stats-overview" ref={statsRef}>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{userProgress.practiceStats.totalQuestions || 42}</div>
            <div className="stat-label">Questions Practiced</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value" style={{ color: getScoreColor(userProgress.practiceStats.averageScore || 8.2) }}>
              {userProgress.practiceStats.averageScore || 8.2}/10
            </div>
            <div className="stat-label">Average Score</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value">7</div>
            <div className="stat-label">Practice Sessions</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            {improvementTrend === 'improving' ? '📈' : 
             improvementTrend === 'declining' ? '📉' : '➡️'}
          </div>
          <div className="stat-content">
            <div className="stat-value" style={{ 
              color: improvementTrend === 'improving' ? '#27ae60' : 
                     improvementTrend === 'declining' ? '#e74c3c' : '#3498db'
            }}>
              {improvementTrend === 'improving' ? '+12%' : 
               improvementTrend === 'declining' ? '-5%' : 'Stable'}
            </div>
            <div className="stat-label">Trend</div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>📈 Progress Over Time</h3>
            <p>Your interview scores across recent sessions</p>
          </div>
          <div className="chart-container">
            <Line data={progressData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>📊 Skills Breakdown</h3>
          <p>Current performance vs target levels</p>
          <div className="chart-container">
            <Bar data={skillsData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>🎯 Question Categories</h3>
          <p>Distribution of questions you've practiced</p>
          <div className="chart-container">
            <Doughnut data={categoryData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h3>💡 AI-Powered Insights</h3>
        <div className="insights-grid">
          <div className="insight-card strength">
            <div className="insight-icon">✅</div>
            <div className="insight-content">
              <h4>Top Strength</h4>
              <p>Your clarity and articulation have improved by 15% over the last week. Keep up the excellent work!</p>
            </div>
          </div>

          <div className="insight-card improvement">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <h4>Focus Area</h4>
              <p>Work on structuring your behavioral answers using the STAR method. This could boost your scores by 10-15%.</p>
            </div>
          </div>

          <div className="insight-card recommendation">
            <div className="insight-icon">💡</div>
            <div className="insight-content">
              <h4>Recommendation</h4>
              <p>Practice more technical questions. You've only covered 25% of technical topics compared to 35% behavioral.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="detailed-metrics">
        <h3>📋 Detailed Performance Metrics</h3>
        <div className="metrics-table">
          <div className="metric-row header">
            <div>Skill Area</div>
            <div>Current Score</div>
            <div>Progress</div>
            <div>Target</div>
          </div>
          
          {[
            { skill: 'Content Quality', current: 8.2, progress: 85, target: 9.0 },
            { skill: 'Structure & Organization', current: 7.8, progress: 78, target: 9.0 },
            { skill: 'Clarity & Articulation', current: 8.5, progress: 92, target: 9.0 },
            { skill: 'Confidence Level', current: 7.2, progress: 68, target: 9.0 },
            { skill: 'Answer Completeness', current: 8.0, progress: 80, target: 9.0 }
          ].map((metric, index) => (
            <div key={index} className="metric-row">
              <div className="metric-skill">{metric.skill}</div>
              <div className="metric-score" style={{ color: getScoreColor(metric.current) }}>
                {metric.current}/10
              </div>
              <div className="metric-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    data-width={`${metric.progress}%`}
                    style={{ backgroundColor: getScoreColor(metric.current) }}
                  ></div>
                </div>
                <span>{metric.progress}%</span>
              </div>
              <div className="metric-target">{metric.target}/10</div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-items">
        <h3>🎯 Recommended Actions</h3>
        <div className="action-list">
          <div className="action-item">
            <div className="action-priority high">High</div>
            <div className="action-content">
              <h4>Practice STAR Method</h4>
              <p>Complete 5 behavioral questions using the STAR framework to improve structure scores</p>
            </div>
            <div className="action-impact">+1.2 points</div>
          </div>

          <div className="action-item">
            <div className="action-priority medium">Medium</div>
            <div className="action-content">
              <h4>Technical Question Focus</h4>
              <p>Spend 30 minutes practicing technical questions to balance your preparation</p>
            </div>
            <div className="action-impact">+0.8 points</div>
          </div>

          <div className="action-item">
            <div className="action-priority low">Low</div>
            <div className="action-content">
              <h4>Confidence Building</h4>
              <p>Record yourself answering questions to improve confidence and reduce filler words</p>
            </div>
            <div className="action-impact">+0.5 points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
