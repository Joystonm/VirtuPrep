// Analytics and performance tracking utilities

export const trackUserProgress = (sessionData) => {
  // Store user progress data
  const progressKey = `virtuprep_progress_${Date.now()}`;
  localStorage.setItem(progressKey, JSON.stringify(sessionData));
  console.log('Progress tracked:', sessionData);
};

export const calculateOverallScore = (metrics) => {
  const weights = {
    clarity: 0.3,
    pace: 0.2,
    confidence: 0.3,
    technical: 0.2
  };
  
  let totalScore = 0;
  let totalWeight = 0;
  
  Object.keys(weights).forEach(key => {
    if (metrics[key] !== undefined) {
      totalScore += metrics[key] * weights[key];
      totalWeight += weights[key];
    }
  });
  
  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
};

export const generatePerformanceReport = (sessionData) => {
  const report = {
    sessionId: sessionData.id,
    timestamp: new Date().toISOString(),
    duration: sessionData.duration,
    scenario: sessionData.scenario,
    metrics: sessionData.metrics,
    overallScore: calculateOverallScore(sessionData.metrics),
    improvements: generateImprovementSuggestions(sessionData.metrics),
    strengths: identifyStrengths(sessionData.metrics)
  };
  
  return report;
};

export const generateImprovementSuggestions = (metrics) => {
  const suggestions = [];
  
  if (metrics.clarity < 75) {
    suggestions.push({
      area: 'Speech Clarity',
      suggestion: 'Practice tongue twisters and speak more slowly',
      priority: 'high'
    });
  }
  
  if (metrics.confidence < 70) {
    suggestions.push({
      area: 'Confidence',
      suggestion: 'Practice power poses and positive self-talk before interviews',
      priority: 'medium'
    });
  }
  
  if (metrics.pace < 120 || metrics.pace > 180) {
    suggestions.push({
      area: 'Speaking Pace',
      suggestion: 'Practice with a metronome to maintain optimal speaking pace',
      priority: 'medium'
    });
  }
  
  return suggestions;
};

export const identifyStrengths = (metrics) => {
  const strengths = [];
  
  if (metrics.clarity >= 85) {
    strengths.push('Excellent speech clarity');
  }
  
  if (metrics.confidence >= 85) {
    strengths.push('Strong confident delivery');
  }
  
  if (metrics.pace >= 120 && metrics.pace <= 160) {
    strengths.push('Optimal speaking pace');
  }
  
  return strengths;
};

export const exportSessionData = (sessionData, format = 'json') => {
  const data = generatePerformanceReport(sessionData);
  
  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }
  
  // Add support for other formats (CSV, PDF) in the future
  return null;
};
