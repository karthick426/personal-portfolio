import React, { useState, useEffect } from 'react';

const TypewriterText = ({ roles = [], typingSpeed = 80, erasingSpeed = 45, pauseMs = 1800 }) => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pausing' | 'erasing'

  useEffect(() => {
    if (!roles.length) return;
    const currentRole = roles[roleIndex];

    if (phase === 'typing') {
      if (displayText.length < currentRole.length) {
        const t = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('erasing'), pauseMs);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'erasing') {
      if (displayText.length > 0) {
        const t = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, erasingSpeed);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((roleIndex + 1) % roles.length);
        setPhase('typing');
      }
    }
  }, [displayText, phase, roleIndex, roles, typingSpeed, erasingSpeed, pauseMs]);

  return (
    <span className="inline-flex items-center gap-0">
      <span>{displayText}</span>
      {/* Blinking emerald cursor */}
      <span
        className="inline-block w-[3px] h-[1em] bg-[#10B981] ml-1 align-middle"
        style={{ animation: 'cursorBlink 1s step-end infinite' }}
      />
    </span>
  );
};

export default TypewriterText;
