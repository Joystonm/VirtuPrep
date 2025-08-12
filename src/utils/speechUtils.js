// Speech analysis utility functions

export const calculateSpeechPace = (transcript, duration) => {
  const words = transcript.split(' ').filter(word => word.length > 0);
  const wordsPerMinute = (words.length / duration) * 60;
  return Math.round(wordsPerMinute);
};

export const analyzeSpeechClarity = (audioData) => {
  // Audio processing logic for clarity analysis
  // This will integrate with Web Audio API or external speech analysis service
  console.log('Analyzing speech clarity...');
  return Math.floor(Math.random() * 100); // Placeholder
};

export const detectFillerWords = (transcript) => {
  const fillerWords = ['um', 'uh', 'like', 'you know', 'so', 'actually'];
  const words = transcript.toLowerCase().split(' ');
  const fillerCount = words.filter(word => fillerWords.includes(word)).length;
  const fillerPercentage = (fillerCount / words.length) * 100;
  
  return {
    count: fillerCount,
    percentage: Math.round(fillerPercentage * 100) / 100,
    words: fillerWords
  };
};

export const calculateConfidenceScore = (audioFeatures, speechPace, fillerWords) => {
  // Confidence scoring algorithm based on multiple factors
  let score = 100;
  
  // Penalize excessive filler words
  score -= fillerWords.percentage * 2;
  
  // Penalize speaking too fast or too slow
  if (speechPace < 120 || speechPace > 180) {
    score -= 10;
  }
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
};

export const generateSpeechFeedback = (metrics) => {
  const feedback = [];
  
  if (metrics.pace < 120) {
    feedback.push('Try speaking a bit faster to maintain engagement');
  } else if (metrics.pace > 180) {
    feedback.push('Slow down your speech pace for better clarity');
  }
  
  if (metrics.clarity < 70) {
    feedback.push('Focus on articulating your words more clearly');
  }
  
  if (metrics.confidence < 70) {
    feedback.push('Practice to build more confidence in your delivery');
  }
  
  return feedback;
};
