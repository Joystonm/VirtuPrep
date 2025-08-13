import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import anime from 'animejs';

const VirtualInterviewer = ({ isListening }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const avatarRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create avatar
    createAvatar(scene);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (avatarRef.current) {
        // Subtle breathing animation
        avatarRef.current.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.02;
        
        // Gentle head movement
        avatarRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current && renderer && camera) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    // Animate based on listening state
    if (avatarRef.current) {
      if (isListening) {
        // Animate to show active listening
        anime({
          targets: avatarRef.current.rotation,
          x: 0.1,
          duration: 500,
          easing: 'easeOutQuart'
        });
        
        // Change material color to indicate listening
        avatarRef.current.traverse((child) => {
          if (child.isMesh && child.material.name === 'head') {
            anime({
              targets: child.material.color,
              r: 0.3,
              g: 0.8,
              b: 0.3,
              duration: 500
            });
          }
        });
      } else {
        // Return to neutral position
        anime({
          targets: avatarRef.current.rotation,
          x: 0,
          duration: 500,
          easing: 'easeOutQuart'
        });
        
        // Return to normal color
        avatarRef.current.traverse((child) => {
          if (child.isMesh && child.material.name === 'head') {
            anime({
              targets: child.material.color,
              r: 0.8,
              g: 0.7,
              b: 0.6,
              duration: 500
            });
          }
        });
      }
    }
  }, [isListening]);

  const createAvatar = (scene) => {
    const avatarGroup = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const headMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xccb399,
      name: 'head'
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    avatarGroup.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 1.6, 0.6);
    avatarGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 1.6, 0.6);
    avatarGroup.add(rightEye);

    // Mouth
    const mouthGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
    const mouthMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 1.3, 0.6);
    mouth.rotation.x = Math.PI / 2;
    avatarGroup.add(mouth);

    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.8, 2, 16);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x4a90e2 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.5;
    body.castShadow = true;
    avatarGroup.add(body);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 16);
    const armMaterial = new THREE.MeshLambertMaterial({ color: 0xccb399 });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-1, 0, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    avatarGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(1, 0, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.castShadow = true;
    avatarGroup.add(rightArm);

    // Hands
    const handGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const handMaterial = new THREE.MeshLambertMaterial({ color: 0xccb399 });
    
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-1.3, -0.7, 0);
    avatarGroup.add(leftHand);
    
    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(1.3, -0.7, 0);
    avatarGroup.add(rightHand);

    // Add subtle shadow plane
    const shadowGeometry = new THREE.PlaneGeometry(4, 4);
    const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const shadowPlane = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    avatarRef.current = avatarGroup;
    scene.add(avatarGroup);
  };

  return (
    <div className="virtual-interviewer">
      <div className="interviewer-header">
        <h4>🤖 AI Interviewer</h4>
        <div className={`status-indicator ${isListening ? 'listening' : 'waiting'}`}>
          {isListening ? '👂 Listening...' : '💭 Waiting for response'}
        </div>
      </div>
      <div 
        ref={mountRef} 
        className="interviewer-viewport"
        style={{ width: '100%', height: '300px', borderRadius: '10px', overflow: 'hidden' }}
      />
      <div className="interviewer-info">
        <p>Your AI interviewer is ready to evaluate your responses</p>
      </div>
    </div>
  );
};

export default VirtualInterviewer;
