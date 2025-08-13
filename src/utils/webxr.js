// WebXR utility functions for VR support detection and management

export class WebXRManager {
  constructor() {
    this.isVRSupported = false;
    this.isVRActive = false;
    this.session = null;
    this.referenceSpace = null;
    this.renderer = null;
    this.camera = null;
    this.scene = null;
  }

  // Check if WebXR is supported
  async checkVRSupport() {
    if (!('xr' in navigator)) {
      console.log('WebXR not supported');
      return false;
    }

    try {
      this.isVRSupported = await navigator.xr.isSessionSupported('immersive-vr');
      console.log('VR Support:', this.isVRSupported);
      return this.isVRSupported;
    } catch (error) {
      console.error('Error checking VR support:', error);
      return false;
    }
  }

  // Initialize VR session
  async startVRSession(renderer, camera, scene) {
    if (!this.isVRSupported) {
      throw new Error('VR not supported');
    }

    try {
      this.renderer = renderer;
      this.camera = camera;
      this.scene = scene;

      // Request VR session
      this.session = await navigator.xr.requestSession('immersive-vr', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking', 'layers']
      });

      // Set up renderer for VR
      await this.renderer.xr.setSession(this.session);
      this.renderer.xr.enabled = true;

      // Get reference space
      this.referenceSpace = await this.session.requestReferenceSpace('local-floor');

      // Set up session event listeners
      this.session.addEventListener('end', this.onSessionEnd.bind(this));
      this.session.addEventListener('inputsourceschange', this.onInputSourcesChange.bind(this));

      this.isVRActive = true;
      console.log('VR session started successfully');

      return this.session;
    } catch (error) {
      console.error('Failed to start VR session:', error);
      throw error;
    }
  }

  // End VR session
  async endVRSession() {
    if (this.session) {
      try {
        await this.session.end();
      } catch (error) {
        console.error('Error ending VR session:', error);
      }
    }
  }

  // Handle session end
  onSessionEnd() {
    this.session = null;
    this.referenceSpace = null;
    this.isVRActive = false;
    
    if (this.renderer) {
      this.renderer.xr.enabled = false;
    }
    
    console.log('VR session ended');
  }

  // Handle input source changes (controllers)
  onInputSourcesChange(event) {
    console.log('Input sources changed:', event);
    // Handle controller connection/disconnection
  }

  // Get VR display information
  getVRDisplayInfo() {
    if (!this.session) return null;

    return {
      isPresenting: this.session.renderState.baseLayer !== null,
      eyeParameters: this.session.renderState.baseLayer ? {
        leftEye: this.session.renderState.baseLayer.getViewport(this.session.renderState.views[0]),
        rightEye: this.session.renderState.baseLayer.getViewport(this.session.renderState.views[1])
      } : null
    };
  }

  // Check if device is mobile
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Get device capabilities
  getDeviceCapabilities() {
    return {
      hasVR: this.isVRSupported,
      isMobile: this.isMobileDevice(),
      hasWebGL: this.checkWebGLSupport(),
      hasWebXR: 'xr' in navigator,
      userAgent: navigator.userAgent
    };
  }

  // Check WebGL support
  checkWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (error) {
      return false;
    }
  }

  // Get recommended VR settings based on device
  getRecommendedSettings() {
    const capabilities = this.getDeviceCapabilities();
    
    if (capabilities.isMobile) {
      return {
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        antialias: false,
        shadows: false,
        maxLights: 3,
        renderScale: 0.8
      };
    } else {
      return {
        pixelRatio: window.devicePixelRatio,
        antialias: true,
        shadows: true,
        maxLights: 8,
        renderScale: 1.0
      };
    }
  }
}

// Utility functions for VR interactions
export const VRUtils = {
  // Convert screen coordinates to VR world coordinates
  screenToVRCoordinates: (x, y, camera, renderer) => {
    const mouse = new THREE.Vector2();
    mouse.x = (x / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(y / renderer.domElement.clientHeight) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    return raycaster.ray.direction;
  },

  // Create VR-friendly UI elements
  createVRUI: (text, position = [0, 2, -2]) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;
    
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = 'white';
    context.font = '32px Arial';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ 
      map: texture, 
      transparent: true 
    });
    const geometry = new THREE.PlaneGeometry(2, 1);
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(...position);
    return mesh;
  },

  // Animate VR transitions
  animateVRTransition: (object, targetPosition, duration = 1000) => {
    return new Promise((resolve) => {
      const startPosition = object.position.clone();
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        object.position.lerpVectors(startPosition, targetPosition, easeProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      
      animate();
    });
  },

  // Handle VR controller input
  handleControllerInput: (session, callback) => {
    if (!session) return;
    
    session.addEventListener('inputsourceschange', (event) => {
      event.added.forEach((inputSource) => {
        if (inputSource.targetRayMode === 'tracked-pointer') {
          inputSource.addEventListener('selectstart', callback);
          inputSource.addEventListener('selectend', callback);
        }
      });
    });
  },

  // Create haptic feedback
  createHapticFeedback: (inputSource, intensity = 1.0, duration = 100) => {
    if (inputSource.gamepad && inputSource.gamepad.hapticActuators) {
      inputSource.gamepad.hapticActuators[0].pulse(intensity, duration);
    }
  }
};

// VR Performance Monitor
export class VRPerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 0;
    this.frameTime = 0;
  }

  update() {
    this.frameCount++;
    const currentTime = performance.now();
    this.frameTime = currentTime - this.lastTime;
    
    if (this.frameCount % 60 === 0) {
      this.fps = Math.round(1000 / (this.frameTime / 60));
    }
    
    this.lastTime = currentTime;
  }

  getMetrics() {
    return {
      fps: this.fps,
      frameTime: this.frameTime,
      isPerformanceGood: this.fps >= 72 // VR typically needs 72+ FPS
    };
  }

  getOptimizationSuggestions() {
    const metrics = this.getMetrics();
    const suggestions = [];
    
    if (metrics.fps < 72) {
      suggestions.push('Reduce polygon count in 3D models');
      suggestions.push('Disable shadows or reduce shadow quality');
      suggestions.push('Reduce texture resolution');
      suggestions.push('Limit number of dynamic lights');
    }
    
    if (metrics.frameTime > 16.67) {
      suggestions.push('Optimize render loop');
      suggestions.push('Use object pooling for frequently created objects');
      suggestions.push('Implement frustum culling');
    }
    
    return suggestions;
  }
}

// Export singleton instance
export const webXRManager = new WebXRManager();
export const vrPerformanceMonitor = new VRPerformanceMonitor();

export default {
  WebXRManager,
  VRUtils,
  VRPerformanceMonitor,
  webXRManager,
  vrPerformanceMonitor
};
