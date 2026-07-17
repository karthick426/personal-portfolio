import React from 'react';
import { motion } from 'framer-motion';
import RevealText from './RevealText';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-[#0A0A0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              <RevealText text="Education" />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              My academic timeline and educational qualifications
            </p>
          </div>

          <div className="relative border-l border-gray-700 ml-4 md:ml-6 py-4 space-y-12">
            <div className="relative pl-8 md:pl-12">
              {/* Timeline dot */}
              <div className="absolute w-4 h-4 bg-neonCyan rounded-full -left-[9px] top-1 shadow-[0_0_10px_#64ffda]"></div>
              
              <div className="glass p-8 rounded-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Bachelor of Engineering</h3>
                    <h4 className="text-lg text-neonCyan font-medium mt-1">Computer Science and Engineering</h4>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <span className="inline-block px-3 py-1 bg-neonCyan/10 text-neonCyan rounded-full text-sm font-mono border border-neonCyan/20">
                      May 2027 (Expected)
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg mb-2">
                  <i className="fas fa-university mr-2 text-gray-500"></i>
                  Shree Venkateshwara Hi-Tech Engineering College
                </p>
                <p className="text-gray-400 font-mono mb-6">CGPA: <span className="text-white font-bold">7.24 / 10</span></p>
                
                <div>
                  <h5 className="text-white font-semibold mb-3">Relevant Coursework:</h5>
                  <div className="flex flex-wrap gap-2">
                    {['Data Structures', 'OOP using Java', 'Web Technologies', 'Database Management Systems'].map((course, idx) => (
                      <span key={idx} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm border border-gray-700">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
