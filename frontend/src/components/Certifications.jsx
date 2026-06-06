import React from 'react';
import { motion } from 'framer-motion';

const Certifications = () => {
  const certs = [
    { title: "Prompt Engineering", issuer: "Coursera", date: "Jan 2024", icon: "fa-robot" },
    { title: "Web Development Bootcamp", issuer: "Udemy", date: "Nov 2023", icon: "fa-code" },
    { title: "AI/ML Workshop", issuer: "IIT Madras", date: "Sep 2023", icon: "fa-brain" },
    { title: "Cloud Computing", issuer: "AWS Educate", date: "Jul 2023", icon: "fa-cloud" }
  ];

  return (
    <section id="certifications" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
            <span className="text-neonCyan font-mono mr-2">05.</span> Certifications
            <div className="h-px bg-gray-700 w-full ml-4 max-w-xs"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((cert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass p-6 rounded-lg text-center hover:-translate-y-2 hover:border-neonCyan/50 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <i className={`fas ${cert.icon} text-2xl text-neonCyan`}></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
                <span className="inline-block px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded font-mono">
                  {cert.date}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
