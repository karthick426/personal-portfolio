import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const ringRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    // Lerp the ring position towards the cursor for trailing effect
    const lerp = (start, end, factor) => start + (end - start) * factor;
    const animateRing = () => {
      ringRef.current.x = lerp(ringRef.current.x, mousePos.x, 0.12);
      ringRef.current.y = lerp(ringRef.current.y, mousePos.y, 0.12);
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      animFrameRef.current = requestAnimationFrame(animateRing);
    };
    animFrameRef.current = requestAnimationFrame(animateRing);

    // Detect hoverable elements
    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);
    const hoverables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label[for]');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      cancelAnimationFrame(animFrameRef.current);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, [mousePos.x, mousePos.y]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Small snappy dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#10B981] pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 30, mass: 0.05 }}
      />

      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] border-2 border-[#10B981]"
        style={{
          x: ringPos.x - (isHovering ? 20 : 14),
          y: ringPos.y - (isHovering ? 20 : 14),
          width: isHovering ? 40 : 28,
          height: isHovering ? 40 : 28,
          backgroundColor: isHovering ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
          scale: isClicking ? 0.7 : 1,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;
