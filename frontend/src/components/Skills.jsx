import React from 'react';
import { motion } from 'framer-motion';
import RevealText from './RevealText';

const Skills = () => {
  const allSkills = [
    { name: "HTML5", icon: "fab fa-html5 text-[#e34f26]" },
    { name: "CSS3", icon: "fab fa-css3-alt text-[#1572b6]" },
    { name: "JavaScript", icon: "fab fa-js text-[#f7df1e]" },
    { name: "React", icon: "fab fa-react text-[#61dafb]" },
    { name: "Node.js", icon: "fab fa-node-js text-[#68a063]" },
    { name: "PostgreSQL", icon: "fas fa-database text-[#336791]" },
    { name: "Java", icon: "fab fa-java text-[#e76f51]" },
    { name: "Python", icon: "fab fa-python text-[#3776ab]" },
    { name: "Git", icon: "fab fa-git-alt text-[#f05032]" },
    { name: "GitHub", icon: "fab fa-github text-white" },
    { name: "VS Code", icon: "fas fa-code text-[#007acc]" },
    { name: "Figma", icon: "fab fa-figma text-[#f24e1e]" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 16
      }
    }
  };

  return (
    <section id="skills" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative">
          {/* Section title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            <RevealText text="Skills" />
          </h2>
          {/* Section subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-400 max-w-xl mx-auto mb-14 text-sm md:text-base leading-relaxed"
          >
            A curated set of technologies I rely on to build modern web experiences
          </motion.p>

          {/* Centered Pill Grid List with Staggered Entrance */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-3.5 max-w-4xl mx-auto"
          >
            {allSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ 
                  y: -6, 
                  scale: 1.05, 
                  borderColor: "rgba(255, 255, 255, 0.35)", 
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 12px 24px -10px rgba(255, 255, 255, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm md:text-base cursor-pointer select-none transition-colors duration-200"
              >
                <i className={`${skill.icon} text-lg md:text-xl`}></i>
                <span className="font-sans text-gray-200 font-normal">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
