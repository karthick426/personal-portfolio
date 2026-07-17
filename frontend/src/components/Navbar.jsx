import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Viewport scroll progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#38bdf8] origin-left z-[9999]" 
        style={{ scaleX }} 
      />

      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-[#030712]/90 border-b border-white/5 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo Section: circular avatar + name */}
            <Link to="/" className="flex items-center gap-3 select-none">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shadow-inner">
                <img 
                  src="/profile.png" 
                  alt="Karthick V" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
              <span className="text-white font-semibold text-base tracking-wide font-sans">
                Karthick V
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-8">
                {[
                  { name: 'Skills', href: '#skills' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Education', href: '#education' },
                  { name: 'Certifications', href: '#certifications' }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white text-sm font-medium transition-colors tracking-wide font-sans"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              
              {/* Pill shaped Contact Me Button wrapped with magnetic force */}
              <MagneticButton range={35}>
                <a 
                  href="#contact" 
                  className="px-5 py-2.5 bg-white hover:bg-white/95 text-black font-semibold text-sm rounded-full flex items-center gap-2 shadow-lg transition-transform transform active:scale-95 tracking-wide font-sans"
                >
                  Contact Me
                  <i className="fas fa-arrow-right text-xs"></i>
                </a>
              </MagneticButton>
            </div>

            {/* Mobile Contact Toggle */}
            <div className="md:hidden flex items-center">
              <MagneticButton range={20}>
                <a 
                  href="#contact" 
                  className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-full flex items-center gap-1.5 shadow-md"
                >
                  Contact
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </a>
              </MagneticButton>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
