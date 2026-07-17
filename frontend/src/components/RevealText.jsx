import React from 'react';
import { motion } from 'framer-motion';

const RevealText = ({ text, className = "" }) => {
  // Split string into words
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.05
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 14
      }
    }
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex overflow-hidden mr-[0.25em] py-0.5">
          {Array.from(word).map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={charVariants}
              className="inline-block origin-bottom font-sans"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

export default RevealText;
