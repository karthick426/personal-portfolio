import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Terminal from '../components/Terminal';

const Home = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Error fetching content:', err));
  }, []);

  if (!content) return <div className="min-h-screen bg-black flex items-center justify-center text-neonCyan font-mono">Loading...</div>;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonCyan/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between w-full">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left md:w-1/2 w-full"
          >
            <p className="text-neonCyan font-mono mb-4">Hi, my name is</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {content.hero?.name || 'Karthick V'}
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-400 mb-6">
              {content.hero?.title || 'I build things for the web.'}
            </h2>
            <p className="text-gray-400 max-w-xl mb-10 text-lg leading-relaxed">
              {content.hero?.tagline || 'I am a software engineer specializing in building exceptional digital experiences. Currently, I am focused on building accessible, human-centered products.'}
            </p>
            <a href="#contact" className="inline-block px-8 py-4 border-2 border-neonCyan text-neonCyan hover:bg-neonCyan/10 rounded font-mono transition-colors">
              Get In Touch
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 border-2 border-neonCyan/50 hover:border-neonCyan transition-colors duration-300">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src="/profile.png" alt="Karthick V" className="w-full h-full object-cover filter hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
