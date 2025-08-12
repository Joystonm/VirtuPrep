import { useState, useEffect, useRef } from 'react';

const useVRControls = () => {
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [isVRActive, setIsVRActive] = useState(false);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 1.6, z: 3 });
  const [currentScene, setCurrentScene] = useState('office');
  
  const sceneRef = useRef(null);

  useEffect(() => {
    // Check VR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        setIsVRSupported(supported);
      });
    }
  }, []);

  const enterVR = async () => {
    try {
      // VR session initialization logic will be implemented here
      setIsVRActive(true);
      console.log('Entering VR mode...');
    } catch (error) {
      console.error('Failed to enter VR:', error);
    }
  };

  const exitVR = () => {
    setIsVRActive(false);
    console.log('Exiting VR mode...');
  };

  const changeScene = (sceneName) => {
    setCurrentScene(sceneName);
    console.log('Changing scene to:', sceneName);
  };

  const updateCameraPosition = (position) => {
    setCameraPosition(position);
  };

  return {
    isVRSupported,
    isVRActive,
    cameraPosition,
    currentScene,
    sceneRef,
    enterVR,
    exitVR,
    changeScene,
    updateCameraPosition
  };
};

export default useVRControls;
