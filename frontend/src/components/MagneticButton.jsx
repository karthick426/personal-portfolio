import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className = "", range = 50 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Middle center coordinates of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Delta between cursor and button center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Distance formula
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < range) {
      // Attract button coordinates slightly towards cursor
      setPosition({ x: deltaX * 0.38, y: deltaY * 0.38 });
    } else {
      // Revert back
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
