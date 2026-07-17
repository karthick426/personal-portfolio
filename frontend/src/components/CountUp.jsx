import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const CountUp = ({ target, suffix = '', duration = 2000 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const tick = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export default CountUp;
