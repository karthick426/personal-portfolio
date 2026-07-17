import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import Stats from '../components/Stats';
import AiChatbot from '../components/AiChatbot';

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

  if (!content) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-neonCyan font-mono gap-4">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-12 py-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left md:w-1/2 w-full"
          >
            <p className="text-neonCyan font-mono mb-4 tracking-wider">Hi, my name is</p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
              {content.hero?.name || 'Karthick V'}
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-neonPurple to-neonPink mb-6 leading-tight">
              Building AI-powered Web Applications that solve real-world problems.
            </h2>
            <p className="text-gray-400 max-w-xl mb-10 text-base md:text-lg leading-relaxed font-sans font-normal">
              Computer Science Engineering Student specializing in Full Stack Development, AI Integration and Cloud Deployment. Dedicated to crafting clean code and premium digital solutions.
            </p>
            
            {/* Two Action CTA Buttons */}
            <div className="flex flex-wrap gap-4 font-mono text-sm">
              <a 
                href="#projects" 
                className="px-6 py-3.5 bg-neonCyan hover:bg-neonCyan/90 text-black font-bold rounded shadow-[0_0_15px_rgba(167,139,250,0.4)] transition-all transform hover:-translate-y-1"
              >
                View Projects
              </a>
              <a 
                href="#resume" 
                className="px-6 py-3.5 border border-neonCyan/40 text-neonCyan hover:bg-neonCyan/10 hover:border-neonCyan/80 font-semibold rounded transition-all transform hover:-translate-y-1"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 flex justify-center relative"
          >
            {/* Floating and interactive profile wrapper */}
            <motion.div 
              animate={{ 
                y: [0, -12, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.03 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex justify-center items-center cursor-grab active:cursor-grabbing"
            >
              {/* Rotating Dashed outer border */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-dashed border-neonCyan/30 animate-spin" 
                style={{ animationDuration: '24s' }}
              ></div>

              {/* Glass background backing glow */}
              <div className="absolute inset-4 bg-neonCyan/10 rounded-full blur-2xl -z-10 animate-pulse"></div>

              {/* Profile Image container */}
              <div className="w-[92%] h-[92%] rounded-full overflow-hidden border-2 border-neonCyan/45 shadow-[0_0_35px_rgba(139,92,246,0.3)]">
                <img 
                  src="/profile.png" 
                  alt="Karthick V" 
                  className="w-full h-full object-cover filter brightness-95 hover:brightness-105 transition-all duration-300" 
                  onError={(e) => {
                    // Fallback to a placeholder developer illustration if local profile.png fails
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <Stats />

      {/* Other sections */}
      <About data={content.about} personalInfo={content.personal_info} />
      <Skills />
      <Education />
      <Projects />
      <Certifications />
      <Resume />
      <Contact />
      <Footer data={content.personal_info} />

      {/* Floating AI portfolio assistant chatbot */}
      <AiChatbot />
    </div>
  );
};

export default Home;
