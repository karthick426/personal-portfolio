import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from './config';

// Components
import Navbar from './components/Navbar';
import Intro from './components/Intro';

// Pages
import Home from './pages/Home';
import Admin from './pages/Admin';

const VisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track if not in admin area
    if (!location.pathname.startsWith('/admin')) {
      fetch(`${API_BASE_URL}/api/analytics/visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page_visited: location.pathname })
      }).catch(err => console.error("Failed to log visit:", err));
    }
  }, [location.pathname]);

  return null;
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();

  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Bypass intro if directly loading admin panel
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      setShowIntro(false);
    }
  }, [location.pathname]);

  return (
    <div className="bg-black dark:bg-black bg-white text-gray-900 dark:text-white min-h-screen font-sans selection:bg-teal-600 dark:selection:bg-neonCyan selection:text-white dark:selection:text-black">
      <AnimatePresence mode="wait">
        {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <VisitTracker />
      {!location.pathname.startsWith('/admin') && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
