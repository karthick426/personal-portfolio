import React from 'react';
import { motion } from 'framer-motion';

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
            <span className="text-neonCyan font-mono mr-2">02.</span> My Skills
            <div className="h-px bg-gray-700 w-full ml-4 max-w-xs"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(167, 139, 250, 0.4)', boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="glass p-8 rounded-xl border border-transparent"
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">{category.title}</h3>
                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-neonCyan text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800/60 rounded-full h-2.5">
                        <motion.div 
                          className="bg-neonCyan h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: sIdx * 0.05 }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
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
