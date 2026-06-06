import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    if (localStorage.theme === 'light') return false;
    return true; 
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 glass py-4 bg-white/80 dark:bg-[#0a192f]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white tracking-wider">
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {['Home', 'About', 'Skills', 'Education', 'Projects', 'Certifications', 'Resume', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-neonCyan px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full glass text-gray-600 dark:text-neonCyan hover:bg-gray-200 dark:hover:bg-neonCyan/10 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <i className="fas fa-sun text-lg"></i>
              ) : (
                <i className="fas fa-moon text-lg"></i>
              )}
            </button>
          </div>
          <div className="-mr-2 flex md:hidden items-center space-x-4">
             <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full glass text-gray-600 dark:text-neonCyan"
            >
              {isDark ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
