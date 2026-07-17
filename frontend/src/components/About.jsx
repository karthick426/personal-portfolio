import React from 'react';
import { motion } from 'framer-motion';
import RevealText from './RevealText';

const About = ({ data, personalInfo }) => {
  return (
    <section id="about" className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              <RevealText text="About Me" />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              A brief overview of my background, focus, and key details
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center md:items-start">

              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
                className="relative mb-8 flex-shrink-0"
              >
                {/* Glowing ring behind image */}
                <div className="absolute inset-0 rounded-full bg-[#10B981] blur-2xl opacity-20 scale-110" />
                <div className="relative w-44 h-44 rounded-full border-2 border-[#10B981]/40 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <img
                    src="/profile.png"
                    alt="Karthick V"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                {/* Online badge */}
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#0A0A0A] animate-pulse" />
              </motion.div>

              {/* Bio text below image */}
              <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap text-center md:text-left">
                {data?.bio || "I am a passionate Computer Science and Engineering student at Shree Venkateshwara Hi-Tech Engineering College, pursuing my B.E. with a focus on modern web development and software engineering. I specialize in building responsive, interactive, and high-performance applications using React, Node.js, Express, and MySQL. With a strong foundation in core concepts like Data Structures, DBMS, and Web Technologies, combined with continuous learning in AI, Cloud Computing, and Prompt Engineering, I am dedicated to crafting clean code and premium digital solutions that solve real-world problems."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.a 
                href={personalInfo?.location_url || `https://www.google.com/maps/place/${encodeURIComponent(personalInfo?.location || "Tiruppur")}`}
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.25)', boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="glass p-6 rounded-lg block cursor-pointer border border-transparent"
              >
                <i className="fas fa-map-marker-alt text-white text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">Location</h3>
                <p className="text-gray-400 hover:text-white transition-colors">{personalInfo?.location || "India"}</p>
              </motion.a>
              <motion.a 
                href={`mailto:${personalInfo?.email || "v.karthick406@gmail.com"}`}
                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.25)', boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="glass p-6 rounded-lg block cursor-pointer border border-transparent"
              >
                <i className="fas fa-envelope text-white text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-gray-400 text-sm break-all hover:text-white transition-colors">{personalInfo?.email || "karthick@example.com"}</p>
              </motion.a>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.25)', boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="glass p-6 rounded-lg border border-transparent"
              >
                <i className="fas fa-graduation-cap text-white text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">Degree</h3>
                <p className="text-gray-400">{personalInfo?.degree || "B.E. CSE"}</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.25)', boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="glass p-6 rounded-lg border border-transparent"
              >
                <i className="fas fa-calendar-alt text-white text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">Graduation</h3>
                <p className="text-gray-400">{personalInfo?.graduation || "May 2027"}</p>
              </motion.div>
              <motion.a 
                href={personalInfo?.github || "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.25)', boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="glass p-6 rounded-lg block cursor-pointer border border-transparent"
              >
                <i className="fab fa-github text-white text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">GitHub</h3>
                <p className="text-gray-400 text-sm truncate hover:text-white transition-colors">View Profile &rarr;</p>
              </motion.a>
              <motion.a 
                href={personalInfo?.linkedin || "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.25)', boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="glass p-6 rounded-lg block cursor-pointer border border-transparent"
              >
                <i className="fab fa-linkedin text-white text-2xl mb-4"></i>
                <h3 className="text-white font-semibold">LinkedIn</h3>
                <p className="text-gray-400 text-sm truncate hover:text-white transition-colors">Connect &rarr;</p>
              </motion.a>
              <motion.a 
                href={`https://wa.me/${(personalInfo?.phone || "8760466232").replace(/[^0-9]/g, "").replace(/^([0-9]{10})$/, "91$1")}`}
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -8, scale: 1.01, borderColor: 'rgba(255, 255, 255, 0.35)', boxShadow: "0 10px 35px -10px rgba(255, 255, 255, 0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="glass p-6 rounded-lg block cursor-pointer sm:col-span-2 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <i className="fab fa-whatsapp text-emerald-400 text-3xl"></i>
                    <div>
                      <h3 className="text-white font-semibold">WhatsApp</h3>
                      <p className="text-gray-400 hover:text-white transition-colors">{personalInfo?.phone || "+91 8760466232"}</p>
                    </div>
                  </div>
                  <span className="text-white text-sm font-mono hover:underline">Chat Now &rarr;</span>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
