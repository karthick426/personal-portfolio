import React from 'react';
import { motion } from 'framer-motion';

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

  return (
    <section id="skills" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Section title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Tools I Build With
          </h2>
          {/* Section subtitle */}
          <p className="text-gray-400 max-w-xl mx-auto mb-14 text-sm md:text-base leading-relaxed">
            A curated set of technologies I rely on to build modern web experiences
          </p>

          {/* Centered Pill Grid List */}
          <div className="flex flex-wrap justify-center gap-3.5 max-w-4xl mx-auto">
            {allSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm md:text-base cursor-pointer select-none transition-all duration-150"
              >
                <i className={`${skill.icon} text-lg md:text-xl`}></i>
                <span className="font-sans text-gray-200 font-normal">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
