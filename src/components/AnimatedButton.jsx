import React, { useRef, useEffect } from 'react';

const AnimatedButton = ({ children, onClick, variant = 'primary' }) => {
  const buttonRef = useRef();

  useEffect(() => {
    // anime.js animations will be implemented here
    const button = buttonRef.current;
    if (button) {
      // Animation setup
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`animated-button ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
