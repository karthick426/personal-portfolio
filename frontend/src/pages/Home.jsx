import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { API_BASE_URL } from '../config';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Terminal from '../components/Terminal';
import BackgroundCanvas from '../components/BackgroundCanvas';
import MagneticButton from '../components/MagneticButton';
import TypewriterText from '../components/TypewriterText';


const DEFAULT_CONTENT = {
  hero: {
    name: 'Karthick V',
    title: 'Full Stack Developer',
    tagline: 'Building digital experiences that combine modern aesthetics with powerful engineering.'
  },
  about: {
    bio: 'I am a passionate Computer Science and Engineering student at Shree Venkateshwara Hi-Tech Engineering College, pursuing my B.E. with a focus on modern web development and software engineering.'
  },
  personal_info: {
    email: 'v.karthick406@gmail.com',
    phone: '+91 8760466232',
    github: 'http://github.com/karthick426',
    linkedin: 'https://www.linkedin.com/in/v-karthick-579535301/',
    location: '1/196G Washington Nagar, Tiruppur',
    location_url: 'https://maps.app.goo.gl/ypn9P8x1QY8N2TdVA'
  },
  projects: []
};

const Home = () => {
  const [content, setContent] = useState(null);
  const [currentTechIndex, setCurrentTechIndex] = useState(0);

  const allTechs = [
    { icon: "fab fa-java text-[#e76f51]", name: "Java" },
    { icon: "fab fa-python text-[#3776ab]", name: "Python" },
    { icon: "fab fa-js text-[#f7df1e]", name: "JavaScript" },
    { icon: "fab fa-react text-[#61dafb]", name: "React" },
    { icon: "fab fa-node-js text-[#68a063]", name: "Node.js" },
    { icon: "fas fa-database text-[#336791]", name: "PostgreSQL" },
    { icon: "fab fa-html5 text-[#e34f26]", name: "HTML5" },
    { icon: "fab fa-css3-alt text-[#1572b6]", name: "CSS3" },
    { icon: "fab fa-git-alt text-[#f05032]", name: "Git" },
    { icon: "fab fa-figma text-[#f24e1e]", name: "Figma" }
  ];

  useEffect(() => {
    // 5-second timeout — show default content if API unreachable
    const timeout = setTimeout(() => {
      setContent(DEFAULT_CONTENT);
    }, 5000);

    fetch(`${API_BASE_URL}/api/content`)
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeout);
        setContent(data);
      })
      .catch(err => {
        console.error('Error fetching content:', err);
        clearTimeout(timeout);
        setContent(DEFAULT_CONTENT);
      });

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % allTechs.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [allTechs.length]);

  const visibleTechs = [
    allTechs[currentTechIndex],
    allTechs[(currentTechIndex + 1) % allTechs.length],
    allTechs[(currentTechIndex + 2) % allTechs.length]
  ];

  if (!content) return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-neonCyan font-mono gap-4">
      <div className="flex gap-2">
        <span className="w-2 h-2 bg-neonCyan rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
        <span className="w-2 h-2 bg-neonCyan rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
        <span className="w-2 h-2 bg-neonCyan rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
      </div>
      <p className="text-sm opacity-60">Loading portfolio...</p>
    </div>
  );

  return (
    <div className="pt-20 relative">
      {/* Background Interactive Particles */}
      <BackgroundCanvas />

      {/* Hero Section */}
      <section id="home" className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonCyan/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neonPurple/15 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-12 py-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left md:w-1/2 w-full"
          >
            {/* Available for work badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-6 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for work
            </div>

            {/* Typewriter Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight font-sans min-h-[1.2em]">
              <TypewriterText
                roles={['Fullstack Developer', 'API Engineer', 'React Developer', 'Problem Solver']}
                typingSpeed={75}
                erasingSpeed={40}
                pauseMs={2000}
              />
            </h1>

            {/* Subtitle / Bio Paragraph */}
            <p className="text-[#A1A1AA] max-w-xl mb-8 text-base md:text-lg leading-relaxed font-sans font-normal">
              Hi, I'm Karthick V, a fullstack developer in India building fast, accessible web experiences. I focus on modern JavaScript frameworks, API engineering, and clean, scalable database architectures.
            </p>
            
            {/* Outline & White Pill Action Buttons */}
            <div className="flex items-center gap-4 mb-8 font-sans text-sm">
              <MagneticButton range={35}>
                <a 
                  href="#projects" 
                  className="px-6 py-3 border border-white/20 hover:border-white text-white font-medium rounded-full transition-all"
                >
                  See my works
                </a>
              </MagneticButton>
              <MagneticButton range={35}>
                <a 
                  href="#contact" 
                  className="px-6 py-3 bg-[#10B981] hover:bg-[#34D399] text-black font-semibold rounded-full flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  Contact Me
                  <i className="fas fa-arrow-right text-xs"></i>
                </a>
              </MagneticButton>
            </div>


            {/* Horizontal Brand Tech stack sliding carousel (shows 3 at a time) */}
            <div className="flex items-center gap-3 overflow-hidden h-16 select-none">
              <AnimatePresence mode="popLayout">
                {visibleTechs.map((tech) => (
                  <motion.div 
                    key={tech.name}
                    initial={{ opacity: 0, x: 30, scale: 0.85 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.85 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex justify-center items-center hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
                  >
                    <i className={`${tech.icon} text-xl`}></i>
                    {/* Floating Tooltip displaying skill name */}
                    <span className="absolute bottom-14 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#080816] text-neonCyan text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border border-neonCyan/20 whitespace-nowrap shadow-[0_4px_12px_rgba(167,139,250,0.15)] pointer-events-none z-20">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Square rounded profile container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex justify-center w-full"
          >
            <div className="relative w-full max-w-[420px] aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <img 
                src="/profile.png" 
                alt="Karthick V" 
                className="w-full h-full object-cover filter brightness-95" 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other sections */}
      <About data={content.about} personalInfo={content.personal_info} />
      <Skills />
      <Education />
      <Projects />
      <Certifications />
      <Resume />
      <Contact />
      <Footer data={content.personal_info} />
    </div>
  );
};

export default Home;
