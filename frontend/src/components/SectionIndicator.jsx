import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const SectionIndicator = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
      for (const section of [...SECTIONS].reverse()) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
      transition={{ duration: 0.4 }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[9000] hidden lg:flex flex-col items-center gap-3"
    >
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            title={section.label}
            className="group relative flex items-center justify-end"
          >
            {/* Label tooltip */}
            <span className="absolute right-6 text-xs text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pr-1 font-mono">
              {section.label}
            </span>
            {/* Dot */}
            <motion.span
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive ? '#10B981' : '#3f3f3f',
                boxShadow: isActive ? '0 0 8px rgba(16, 185, 129, 0.7)' : 'none',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-2.5 h-2.5 rounded-full block"
            />
          </button>
        );
      })}
    </motion.div>
  );
};

export default SectionIndicator;
