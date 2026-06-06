import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onComplete }) => {
  useEffect(() => {
    // Prevent scrolling during intro animation
    document.body.style.overflow = 'hidden';

    // End the intro animation after 3.2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Framer motion variants
  const containerVariants = {
    exit: {
      y: '-100%',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2
      }
    }
  };

  const lineVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { 
      width: '180px', 
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
    exit: { 
      width: 0, 
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    }
  };

  const textVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.6 }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    }
  };

  const subtitleVariants = {
    initial: { opacity: 0, letterSpacing: '0.1em' },
    animate: { 
      opacity: 1, 
      letterSpacing: '0.3em',
      transition: { duration: 1, ease: 'easeOut', delay: 1.2 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-black z-[9999] flex flex-col justify-center items-center select-none overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Glow effect background */}
        <div className="absolute w-48 h-48 bg-neonCyan/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

        {/* Animated Name */}
        <motion.h1 
          variants={textVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans tracking-wide mb-3 text-center"
        >
          Karthick V
        </motion.h1>

        {/* Dynamic central dividing line */}
        <motion.div 
          variants={lineVariants}
          className="h-[2px] bg-neonCyan shadow-[0_0_8px_#64ffda] my-2"
        />

        {/* Animated Subtitle */}
        <motion.p 
          variants={subtitleVariants}
          className="text-neonCyan text-xs md:text-sm uppercase font-mono font-medium tracking-[0.3em] text-center mt-3"
        >
          Fullstack Developer
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Intro;
