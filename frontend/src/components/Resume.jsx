import React from 'react';
import { motion } from 'framer-motion';
import RevealText from './RevealText';

const Resume = () => {
  return (
    <section id="resume" className="py-20 bg-[#020617] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              <RevealText text="Resume" />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Interested in working together? Download my resume to see my detailed academic background, skill mappings, and qualifications.
            </p>
          </div>
          
          <div className="glass p-8 md:p-12 rounded-2xl max-w-2xl mx-auto border border-neonCyan/20">
            <i className="far fa-file-pdf text-6xl text-neonCyan mb-6"></i>
            <h3 className="text-2xl font-bold text-white mb-2">Karthick V - Resume</h3>
            <p className="text-gray-400 mb-8">PDF Format • ~2MB</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-3 bg-neonCyan text-black hover:bg-neonCyan/90 rounded-md transition-all font-mono font-semibold flex items-center justify-center"
              >
                <i className="fas fa-eye mr-2"></i> Preview Resume
              </a>
              <a 
                href="/resume.pdf" 
                download
                className="px-8 py-3 border border-neonCyan text-neonCyan hover:bg-neonCyan/10 rounded-md transition-all font-mono font-semibold flex items-center justify-center"
                onClick={() => {
                  // In a real app, this would call our backend API to log the download
                  console.log('Resume downloaded');
                }}
              >
                <i className="fas fa-download mr-2"></i> Download PDF
              </a>
            </div>
            
            <p className="text-gray-500 text-sm mt-6 font-mono">
              Downloads will be tracked for analytics purposes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
