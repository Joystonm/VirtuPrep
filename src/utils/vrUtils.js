// VR and 3D scene utility functions

export const checkVRSupport = async () => {
  if (!navigator.xr) {
    return { supported: false, reason: 'WebXR not available' };
  }
  
  try {
    const isSupported = await navigator.xr.isSessionSupported('immersive-vr');
    return { supported: isSupported, reason: isSupported ? null : 'VR not supported' };
  } catch (error) {
    return { supported: false, reason: error.message };
  }
};

export const initializeVRSession = async () => {
  try {
    const session = await navigator.xr.requestSession('immersive-vr');
    return { success: true, session };
  } catch (error) {
    console.error('Failed to initialize VR session:', error);
    return { success: false, error: error.message };
  }
};

export const createInterviewEnvironment = (sceneName) => {
  const environments = {
    office: {
      lighting: { intensity: 0.8, color: '#ffffff' },
      background: '#f0f0f0',
      furniture: ['desk', 'chair', 'bookshelf'],
      atmosphere: 'professional'
    },
    conference: {
      lighting: { intensity: 0.9, color: '#ffffff' },
      background: '#e8e8e8',
      furniture: ['table', 'chairs', 'projector'],
      atmosphere: 'formal'
    },
    casual: {
      lighting: { intensity: 0.7, color: '#fff8dc' },
      background: '#f5f5dc',
      furniture: ['couch', 'coffee_table', 'plants'],
      atmosphere: 'relaxed'
    }
  };
  
  return environments[sceneName] || environments.office;
};

export const calculateOptimalCameraPosition = (sceneType, userHeight = 1.7) => {
  const positions = {
    office: { x: 0, y: userHeight, z: 2.5 },
    conference: { x: 0, y: userHeight, z: 3.0 },
    casual: { x: 0, y: userHeight, z: 2.0 }
  };
  
  return positions[sceneType] || positions.office;
};

export const createVirtualInterviewer = (personality = 'professional') => {
  const personalities = {
    professional: {
      appearance: 'business_suit',
      behavior: 'formal',
      questionStyle: 'structured',
      reactions: 'measured'
    },
    friendly: {
      appearance: 'casual_professional',
      behavior: 'warm',
      questionStyle: 'conversational',
      reactions: 'encouraging'
    },
    technical: {
      appearance: 'tech_casual',
      behavior: 'analytical',
      questionStyle: 'problem_solving',
      reactions: 'focused'
    }
  };
  
  return personalities[personality] || personalities.professional;
};

export const trackEyeContact = (headPosition, interviewerPosition) => {
  // Calculate if user is maintaining appropriate eye contact
  const distance = Math.sqrt(
    Math.pow(headPosition.x - interviewerPosition.x, 2) +
    Math.pow(headPosition.y - interviewerPosition.y, 2) +
    Math.pow(headPosition.z - interviewerPosition.z, 2)
  );
  
  const angle = Math.atan2(
    interviewerPosition.y - headPosition.y,
    interviewerPosition.z - headPosition.z
  );
  
  // Determine if looking at interviewer (within acceptable range)
  const isLookingAtInterviewer = Math.abs(angle) < 0.3; // ~17 degrees
  
  return {
    distance,
    angle,
    isLookingAtInterviewer,
    eyeContactQuality: isLookingAtInterviewer ? 'good' : 'poor'
  };
};

export const animateSceneTransition = (fromScene, toScene, duration = 1000) => {
  // Scene transition animation logic
  return new Promise((resolve) => {
    console.log(`Transitioning from ${fromScene} to ${toScene}`);
    
    // Fade out current scene
    setTimeout(() => {
      // Load new scene
      setTimeout(() => {
        // Fade in new scene
        resolve();
      }, duration / 2);
    }, duration / 2);
  });
};

export const optimizePerformance = (sceneComplexity) => {
  // Adjust rendering quality based on device capabilities
  const settings = {
    low: {
      shadows: false,
      antialiasing: false,
      textureQuality: 'low',
      particleCount: 50
    },
    medium: {
      shadows: true,
      antialiasing: false,
      textureQuality: 'medium',
      particleCount: 100
    },
    high: {
      shadows: true,
      antialiasing: true,
      textureQuality: 'high',
      particleCount: 200
    }
  };
  
  return settings[sceneComplexity] || settings.medium;
};
