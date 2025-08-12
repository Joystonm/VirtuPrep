// Configuration settings for VirtuPrep

const config = {
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
    speechAnalysisUrl: process.env.REACT_APP_SPEECH_API_URL || 'http://localhost:3002',
    timeout: 10000,
  },

  // Speech Analysis Settings
  speech: {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    maxRecordingTime: 300000, // 5 minutes in milliseconds
    silenceThreshold: 0.01,
    analysisInterval: 1000, // Analyze every 1 second
  },

  // VR Configuration
  vr: {
    defaultEnvironment: 'office',
    supportedEnvironments: ['office', 'conference', 'casual'],
    renderQuality: process.env.NODE_ENV === 'production' ? 'medium' : 'high',
    frameRate: 60,
    fieldOfView: 75,
  },

  // Analytics Configuration
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    trackingId: process.env.REACT_APP_ANALYTICS_ID,
    sessionTimeout: 1800000, // 30 minutes
  },

  // Performance Thresholds
  performance: {
    speech: {
      excellentClarity: 90,
      goodClarity: 75,
      optimalPaceMin: 120,
      optimalPaceMax: 160,
      highConfidence: 85,
    },
    overall: {
      excellentScore: 90,
      goodScore: 75,
      passingScore: 60,
    }
  },

  // UI Configuration
  ui: {
    theme: 'light',
    animationDuration: 300,
    debounceDelay: 500,
    maxFileSize: 10485760, // 10MB
    supportedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
    supportedAudioFormats: ['mp3', 'wav', 'ogg'],
  },

  // Feature Flags
  features: {
    vrMode: true,
    speechAnalysis: true,
    realTimeFeedback: true,
    exportResults: true,
    multipleLanguages: false, // Future feature
    aiInterviewer: false, // Future feature
  },

  // Development Settings
  development: {
    enableLogging: process.env.NODE_ENV === 'development',
    mockData: process.env.REACT_APP_USE_MOCK_DATA === 'true',
    skipVRCheck: process.env.REACT_APP_SKIP_VR_CHECK === 'true',
  },
};

export default config;
