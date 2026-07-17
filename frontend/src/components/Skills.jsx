import React from 'react';
import { motion } from 'framer-motion';

// Colored icon mapper for each technology brand/skill
const skillIcons = {
  // Programming Languages
  "Java": "fab fa-java text-[#e76f51] text-2xl",
  "Python": "fab fa-python text-[#3776ab] text-2xl",
  "HTML5": "fab fa-html5 text-[#e34f26] text-2xl",
  "CSS3": "fab fa-css3-alt text-[#1572b6] text-2xl",
  "JavaScript": "fab fa-js text-[#f7df1e] text-2xl",
  // Tools
  "VS Code": "fas fa-code text-[#007acc] text-xl",
  "Eclipse IDE": "fas fa-laptop-code text-[#2c2255] text-xl",
  "Git": "fab fa-git-alt text-[#f05032] text-2xl",
  "GitHub": "fab fa-github text-[#e2e8f0] text-2xl",
  "Figma": "fab fa-figma text-[#f24e1e] text-2xl",
  // Professional Skills
  "Problem Solving": "fas fa-brain text-[#a78bfa] text-xl",
  "Prompt Engineering": "fas fa-terminal text-[#38bdf8] text-xl",
  "Team Collaboration": "fas fa-users text-[#34d399] text-xl",
  "Communication": "fas fa-comments text-[#fb7185] text-xl",
  "UI/UX Design": "fas fa-paint-brush text-[#f472b6] text-xl"
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Java", level: 85 },
        { name: "Python", level: 80 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "JavaScript", level: 85 }
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: "VS Code", level: 90 },
        { name: "Eclipse IDE", level: 75 },
        { name: "Git", level: 85 },
        { name: "GitHub", level: 85 },
        { name: "Figma", level: 70 }
      ]
    },
    {
      title: "Professional Skills",
      skills: [
        { name: "Problem Solving", level: 90 },
        { name: "Prompt Engineering", level: 85 },
        { name: "Team Collaboration", level: 90 },
        { name: "Communication", level: 85 },
        { name: "UI/UX Design", level: 75 }
      ]
    }
  ];

  // SVG Dial parameters
  const radius = 18;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="py-20 bg-darkNav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
            <span className="text-gray-400 font-mono mr-2">02.</span> My Skills
            <div className="h-px bg-gray-700 w-full ml-4 max-w-xs"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, catIdx) => (
              <motion.div 
                key={catIdx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.15 }}
                className="glass p-6 rounded-xl border border-transparent hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col h-full"
              >
                <h3 className="text-xl font-bold text-white mb-8 text-center border-b border-gray-800/80 pb-4 tracking-wide font-sans">
                  {category.title}
                </h3>
                
                <div className="flex flex-col gap-4 flex-grow justify-center">
                  {category.skills.map((skill, sIdx) => {
                    const strokeDashoffset = circumference - (skill.level / 100) * circumference;
                    const iconClass = skillIcons[skill.name] || "fas fa-check text-white text-xl";

                    return (
                      <motion.div 
                        key={sIdx}
                        whileHover={{ x: 6, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-colors duration-300"
                      >
                        {/* Left: Icon & Name */}
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-lg bg-black/40 flex justify-center items-center shadow-inner">
                            <i className={iconClass}></i>
                          </div>
                          <span className="text-gray-200 font-medium tracking-wide text-sm">{skill.name}</span>
                        </div>

                        {/* Right: Circular Progress Dial */}
                        <div className="relative flex justify-center items-center">
                          <svg className="w-12 h-12 transform -rotate-90">
                            {/* Background Circle */}
                            <circle 
                              cx="24" 
                              cy="24" 
                              r={radius} 
                              className="text-gray-800/50" 
                              strokeWidth={strokeWidth} 
                              stroke="currentColor" 
                              fill="transparent" 
                            />
                            {/* Active Dial */}
                            <motion.circle 
                              cx="24" 
                              cy="24" 
                              r={radius} 
                              className="text-white" 
                              strokeWidth={strokeWidth} 
                              stroke="currentColor" 
                              fill="transparent" 
                              strokeDasharray={circumference}
                              initial={{ strokeDashoffset: circumference }}
                              whileInView={{ strokeDashoffset }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: sIdx * 0.1 }}
                            />
                          </svg>
                          <span className="absolute text-[10px] font-mono text-gray-200 font-bold">{skill.level}%</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
