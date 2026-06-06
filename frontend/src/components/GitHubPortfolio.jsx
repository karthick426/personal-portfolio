import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GitHubPortfolio = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/karthick426/repos?sort=updated&per_page=100');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-20 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
              <span className="text-neonCyan font-mono mr-2">05.</span> Other GitHub Projects
              <div className="h-px bg-gray-700 w-full ml-4 max-w-[100px] md:max-w-xs"></div>
            </h2>
            <a href="https://github.com/karthick426" target="_blank" rel="noreferrer" className="text-neonCyan hover:underline font-mono hidden md:block text-sm">
              View Full Profile &rarr;
            </a>
          </div>

          {loading && <div className="text-center text-neonCyan py-10"><i className="fas fa-spinner fa-spin text-3xl"></i></div>}
          {error && <div className="text-center text-red-400 py-10">Error: {error}</div>}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, idx) => (
                <motion.div 
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass p-6 rounded-lg flex flex-col h-full hover:-translate-y-2 hover:border-neonCyan/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => window.open(repo.html_url, '_blank')}
                >
                  <div className="flex justify-between items-start mb-4">
                    <i className="far fa-folder text-4xl text-neonCyan"></i>
                    <div className="flex space-x-3">
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-neonCyan transition-colors" onClick={(e) => e.stopPropagation()}>
                        <i className="fab fa-github text-xl"></i>
                      </a>
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-neonCyan transition-colors" onClick={(e) => e.stopPropagation()}>
                          <i className="fas fa-external-link-alt text-xl"></i>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neonCyan transition-colors">{repo.name}</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">{repo.description || "No description provided."}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-500 mt-auto">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="flex items-center"><i className="fas fa-star mr-1"></i> {repo.stargazers_count}</span>
                    <span className="flex items-center"><i className="fas fa-code-branch mr-1"></i> {repo.forks_count}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <a href="https://github.com/karthick426" target="_blank" rel="noreferrer" className="px-6 py-3 border border-neonCyan text-neonCyan hover:bg-neonCyan/10 rounded-md transition-all font-mono text-sm inline-block">
              View Full Profile
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubPortfolio;
