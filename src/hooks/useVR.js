import { useState, useEffect, useCallback, useRef } from 'react';
import { webXRManager, vrPerformanceMonitor } from '../utils/webxr';

// Custom hook for VR functionality
export const useVR = () => {
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [isVRActive, setIsVRActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 0,
    frameTime: 0,
    isPerformanceGood: true
  });

  const sessionRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);

  // Check VR support on mount
  useEffect(() => {
    const checkSupport = async () => {
      try {
        const supported = await webXRManager.checkVRSupport();
        setIsVRSupported(supported);
      } catch (err) {
        console.error('Error checking VR support:', err);
        setError('Failed to check VR support');
      }
    };

    checkSupport();
  }, []);

  // Performance monitoring
  useEffect(() => {
    let animationFrame;
    
    if (isVRActive) {
      const updateMetrics = () => {
        vrPerformanceMonitor.update();
        setPerformanceMetrics(vrPerformanceMonitor.getMetrics());
        animationFrame = requestAnimationFrame(updateMetrics);
      };
      
      updateMetrics();
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVRActive]);

  // Start VR session
  const startVR = useCallback(async (renderer, camera, scene) => {
    if (!isVRSupported) {
      setError('VR not supported on this device');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      rendererRef.current = renderer;
      cameraRef.current = camera;
      sceneRef.current = scene;

      const session = await webXRManager.startVRSession(renderer, camera, scene);
      sessionRef.current = session;
      setIsVRActive(true);
      
      // Set up session end handler
      session.addEventListener('end', () => {
        setIsVRActive(false);
        sessionRef.current = null;
      });

      return true;
    } catch (err) {
      console.error('Failed to start VR:', err);
      setError(err.message || 'Failed to start VR session');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isVRSupported]);

  // End VR session
  const endVR = useCallback(async () => {
    if (sessionRef.current) {
      try {
        await webXRManager.endVRSession();
        setIsVRActive(false);
        sessionRef.current = null;
      } catch (err) {
        console.error('Error ending VR session:', err);
        setError('Failed to end VR session');
      }
    }
  }, []);

  // Toggle VR mode
  const toggleVR = useCallback(async (renderer, camera, scene) => {
    if (isVRActive) {
      await endVR();
    } else {
      await startVR(renderer, camera, scene);
    }
  }, [isVRActive, startVR, endVR]);

  // Get device capabilities
  const getDeviceInfo = useCallback(() => {
    return webXRManager.getDeviceCapabilities();
  }, []);

  // Get recommended settings
  const getRecommendedSettings = useCallback(() => {
    return webXRManager.getRecommendedSettings();
  }, []);

  return {
    // State
    isVRSupported,
    isVRActive,
    isLoading,
    error,
    performanceMetrics,
    
    // Actions
    startVR,
    endVR,
    toggleVR,
    
    // Utilities
    getDeviceInfo,
    getRecommendedSettings,
    
    // Refs for advanced usage
    session: sessionRef.current,
    renderer: rendererRef.current,
    camera: cameraRef.current,
    scene: sceneRef.current
  };
};

// Hook for VR interactions and gestures
export const useVRInteractions = (onInteraction) => {
  const [controllers, setControllers] = useState([]);
  const [handTracking, setHandTracking] = useState(null);
  const [gazeTarget, setGazeTarget] = useState(null);

  const handleControllerInput = useCallback((event) => {
    if (onInteraction) {
      onInteraction({
        type: 'controller',
        action: event.type,
        controller: event.inputSource,
        timestamp: Date.now()
      });
    }
  }, [onInteraction]);

  const handleGazeInteraction = useCallback((target) => {
    setGazeTarget(target);
    if (onInteraction) {
      onInteraction({
        type: 'gaze',
        target: target,
        timestamp: Date.now()
      });
    }
  }, [onInteraction]);

  return {
    controllers,
    handTracking,
    gazeTarget,
    handleControllerInput,
    handleGazeInteraction
  };
};

// Hook for VR audio and spatial sound
export const useVRAudio = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [spatialAudio, setSpatialAudio] = useState(false);

  useEffect(() => {
    // Initialize Web Audio API for spatial audio
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
      setSpatialAudio(true);
    }
  }, []);

  const playPositionalAudio = useCallback((audioBuffer, position) => {
    if (!audioContext || !spatialAudio) return;

    const source = audioContext.createBufferSource();
    const panner = audioContext.createPanner();
    
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;
    
    panner.positionX.setValueAtTime(position.x, audioContext.currentTime);
    panner.positionY.setValueAtTime(position.y, audioContext.currentTime);
    panner.positionZ.setValueAtTime(position.z, audioContext.currentTime);
    
    source.buffer = audioBuffer;
    source.connect(panner);
    panner.connect(audioContext.destination);
    source.start();
    
    return source;
  }, [audioContext, spatialAudio]);

  return {
    audioContext,
    spatialAudio,
    playPositionalAudio
  };
};

// Hook for VR haptic feedback
export const useVRHaptics = () => {
  const [hapticSupported, setHapticSupported] = useState(false);

  useEffect(() => {
    // Check if haptic feedback is supported
    setHapticSupported('vibrate' in navigator);
  }, []);

  const triggerHaptic = useCallback((pattern = [100], inputSource = null) => {
    if (inputSource && inputSource.gamepad && inputSource.gamepad.hapticActuators) {
      // VR controller haptics
      const actuator = inputSource.gamepad.hapticActuators[0];
      if (actuator) {
        actuator.pulse(0.8, 100);
      }
    } else if (hapticSupported) {
      // Mobile device vibration
      navigator.vibrate(pattern);
    }
  }, [hapticSupported]);

  const triggerSuccessHaptic = useCallback((inputSource) => {
    triggerHaptic([50, 50, 50], inputSource);
  }, [triggerHaptic]);

  const triggerErrorHaptic = useCallback((inputSource) => {
    triggerHaptic([200], inputSource);
  }, [triggerHaptic]);

  return {
    hapticSupported,
    triggerHaptic,
    triggerSuccessHaptic,
    triggerErrorHaptic
  };
};

export default useVR;
