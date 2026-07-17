import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config';

const ProjectCard = ({ project, idx }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (idx % 6) * 0.1 }}
      className="perspective-1000 w-full h-[280px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden glass p-6 rounded-lg flex flex-col justify-between hover:border-neonCyan/40 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all duration-300 select-none border border-transparent">
          <div className="flex justify-between items-center mb-4">
            <i className="far fa-folder text-4xl text-neonCyan"></i>
            <div className="flex items-center space-x-4">
              {project.repository && (
                <a 
                  href={project.repository} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={(e) => e.stopPropagation()} 
                  className="text-gray-400 hover:text-neonCyan transition-colors" 
                  title="View Repository"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
              )}
              {project.live_demo && (
                <a 
                  href={project.live_demo} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={(e) => e.stopPropagation()} 
                  className="text-gray-400 hover:text-neonCyan transition-colors" 
                  title="View Live Demo"
                >
                  <i className="fas fa-external-link-alt text-lg"></i>
                </a>
              )}
            </div>
          </div>
          
          <div className="flex-grow flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-neonCyan transition-colors">
              {project.name}
            </h3>
            <span className="text-neonCyan/50 text-xs font-mono mt-2 flex items-center gap-1.5 animate-pulse">
              <i className="fas fa-sync-alt text-[10px]"></i> Tap / Hover for details
            </span>
          </div>
          
          <div className="h-6"></div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass p-6 rounded-lg flex flex-col justify-between border border-neonCyan/30 shadow-[0_0_25px_rgba(139,92,246,0.15)] select-none">
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-neonCyan">PROJECT DETAILS</span>
                <div className="flex items-center space-x-4">
                  {project.repository && (
                    <a 
                      href={project.repository} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()} 
                      className="text-gray-400 hover:text-neonCyan transition-colors" 
                      title="View Repository"
                    >
                      <i className="fab fa-github text-lg"></i>
                    </a>
                  )}
                  {project.live_demo && (
                    <a 
                      href={project.live_demo} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()} 
                      className="text-gray-400 hover:text-neonCyan transition-colors" 
                      title="View Live Demo"
                    >
                      <i className="fas fa-external-link-alt text-base"></i>
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 text-neon">
                {project.name}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed overflow-y-auto max-h-[110px] pr-1">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-800/50 mt-4">
              {project.technologies && project.technologies.map((tech, tIdx) => (
                <span 
                  key={tIdx} 
                  className="px-2 py-0.5 bg-gray-900 border border-gray-800 text-neonCyan/80 rounded text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const cached = localStorage.getItem('portfolio_projects');
        if (cached) {
          setProjects(JSON.parse(cached));
          setLoading(false);
        }

        const response = await fetch(`${API_BASE_URL}/api/content`);
        if (response.ok) {
          const data = await response.json();
          const p = data.projects || [];
          setProjects(p);
          localStorage.setItem('portfolio_projects', JSON.stringify(p));
        } else if (!cached) {
          // Fallback if backend fails and no cache
          setProjects([{
            id: 1,
            name: 'Emergency_notification',
            description: 'An emergency notification system developed for quick alerting.',
            technologies: ['JavaScript', 'HTML', 'CSS'],
            live_demo: '',
            repository: 'https://github.com/karthick426/Emergency_notification'
          }]);
        }
      } catch (err) {
        console.error('Error fetching projects from backend:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading && projects.length === 0) {
    return (
      <div className="py-20 bg-black flex justify-center items-center">
        <i className="fas fa-spinner fa-spin text-3xl text-neonCyan"></i>
      </div>
    );
  }

  if (!projects || projects.length === 0) return null;

  // Extract all unique technologies for the filter
  const allTechnologies = ['All', ...new Set(projects.flatMap(project => project.technologies || []))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => (project.technologies || []).includes(filter));

  return (
    <section id="projects" className="py-20 bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center flex-1">
              <span className="text-neonCyan font-mono mr-2">04.</span> Projects
              <div className="h-px bg-gray-700 w-full ml-4 max-w-xs"></div>
            </h2>
            <a href="https://github.com/karthick426" target="_blank" rel="noreferrer" className="text-neonCyan hover:underline font-mono text-sm">
              View Full GitHub Profile &rarr;
            </a>
          </div>

          <div className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-hide">
            {allTechnologies.map(tech => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-1.5 rounded-full text-sm font-mono whitespace-nowrap transition-colors ${
                  filter === tech 
                    ? 'bg-neonCyan text-black font-bold' 
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id || idx} project={project} idx={idx} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
