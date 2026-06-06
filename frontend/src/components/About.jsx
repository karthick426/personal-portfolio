import React from 'react';
import { motion } from 'framer-motion';

const About = ({ data, personalInfo }) => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center">
            <span className="text-neonCyan font-mono mr-2">01.</span> About Me
            <div className="h-px bg-gray-700 w-full ml-4 max-w-xs"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col">
              <p className="text-gray-400 text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                {data?.bio || "I am a passionate Computer Science and Engineering student at Shree Venkateshwara Hi-Tech Engineering College, pursuing my B.E. with a focus on modern web development and software engineering. I specialize in building responsive, interactive, and high-performance applications using React, Node.js, Express, and MySQL. With a strong foundation in core concepts like Data Structures, DBMS, and Web Technologies, combined with continuous learning in AI, Cloud Computing, and Prompt Engineering, I am dedicated to crafting clean code and premium digital solutions that solve real-world problems."}
              </p>
              
              <div className="max-w-md w-full rounded-xl overflow-hidden border border-gray-800 shadow-2xl group relative hidden md:block mt-6">
                <div className="absolute inset-0 bg-neonCyan/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Developer Setup" 
                  className="w-full h-48 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href={personalInfo?.location_url || `https://www.google.com/maps/place/${encodeURIComponent(personalInfo?.location || "Tiruppur")}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300 block cursor-pointer"
              >
                <i className="fas fa-map-marker-alt text-neonCyan text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">Location</h3>
                <p className="text-gray-400 hover:text-neonCyan transition-colors">{personalInfo?.location || "India"}</p>
              </a>
              <a 
                href={`mailto:${personalInfo?.email || "v.karthick406@gmail.com"}`}
                className="glass p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300 block cursor-pointer"
              >
                <i className="fas fa-envelope text-neonCyan text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-gray-400 text-sm break-all hover:text-neonCyan transition-colors">{personalInfo?.email || "karthick@example.com"}</p>
              </a>
              <div className="glass p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300">
                <i className="fas fa-graduation-cap text-neonCyan text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">Degree</h3>
                <p className="text-gray-400">{personalInfo?.degree || "B.E. CSE"}</p>
              </div>
              <div className="glass p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300">
                <i className="fas fa-calendar-alt text-neonCyan text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">Graduation</h3>
                <p className="text-gray-400">{personalInfo?.graduation || "May 2027"}</p>
              </div>
              <a href={personalInfo?.github || "#"} target="_blank" rel="noopener noreferrer" className="glass p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300 block cursor-pointer">
                <i className="fab fa-github text-neonCyan text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">GitHub</h3>
                <p className="text-gray-400 text-sm truncate hover:text-neonCyan transition-colors">View Profile &rarr;</p>
              </a>
              <a href={personalInfo?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="glass p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300 block cursor-pointer">
                <i className="fab fa-linkedin text-neonCyan text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">LinkedIn</h3>
                <p className="text-gray-400 text-sm truncate hover:text-neonCyan transition-colors">Connect &rarr;</p>
              </a>
              <a 
                href={`https://wa.me/${(personalInfo?.phone || "8760466232").replace(/[^0-9]/g, "").replace(/^([0-9]{10})$/, "91$1")}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300 block cursor-pointer sm:col-span-2 border border-neonCyan/20 hover:border-neonCyan/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <i className="fab fa-whatsapp text-emerald-400 text-3xl"></i>
                    <div>
                      <h3 className="text-white font-semibold">WhatsApp</h3>
                      <p className="text-gray-400 hover:text-neonCyan transition-colors">{personalInfo?.phone || "+91 8760466232"}</p>
                    </div>
                  </div>
                  <span className="text-neonCyan text-sm font-mono">Chat Now &rarr;</span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
