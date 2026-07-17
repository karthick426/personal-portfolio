import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../config';
import RevealText from './RevealText';

// Animated field with label slide and emerald focus glow
const AnimatedField = ({ label, id, children }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        animate={{ y: focused ? -2 : 0, color: focused ? '#10B981' : '#9CA3AF', fontSize: focused ? '11px' : '13px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="block font-mono mb-2 origin-top-left"
      >
        {label}
      </motion.label>
      <motion.div
        animate={{
          boxShadow: focused
            ? '0 0 0 2px rgba(16, 185, 129, 0.4), 0 0 18px rgba(16, 185, 129, 0.15)'
            : '0 0 0 1px rgba(75, 85, 99, 0.5)',
        }}
        transition={{ duration: 0.25 }}
        className="rounded-md overflow-hidden"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Ripple click button
const RippleButton = ({ children, disabled, type, className }) => {
  const btnRef = useRef(null);
  const createRipple = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left - 5}px`;
    ripple.style.top = `${e.clientY - rect.top - 5}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  };
  return (
    <motion.button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={createRipple}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`ripple-btn ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              <RevealText text="Get In Touch" />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a project idea, want to collaborate, or just say hi, feel free to drop a message!
            </p>
          </div>

          <div className="glass p-8 md:p-10 rounded-xl text-left max-w-3xl mx-auto">
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-md text-green-400 text-center font-mono"
                >
                  Thank you for contacting me. I will get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-md text-red-400 text-center font-mono"
                >
                  Something went wrong. Please try again later.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedField label="Name" id="name">
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full bg-[#1B1B1B] border-0 rounded-md py-3 px-4 text-white focus:outline-none" />
                </AnimatedField>
                <AnimatedField label="Email" id="email">
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full bg-[#1B1B1B] border-0 rounded-md py-3 px-4 text-white focus:outline-none" />
                </AnimatedField>
              </div>

              <AnimatedField label="Subject" id="subject">
                <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange}
                  className="w-full bg-[#1B1B1B] border-0 rounded-md py-3 px-4 text-white focus:outline-none" />
              </AnimatedField>

              <AnimatedField label="Message" id="message">
                <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange}
                  className="w-full bg-[#1B1B1B] border-0 rounded-md py-3 px-4 text-white focus:outline-none resize-none">
                </textarea>
              </AnimatedField>

              <div className="text-center pt-4">
                <RippleButton
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-8 py-4 border border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10 rounded-md font-mono font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending'
                    ? <span><i className="fas fa-spinner fa-spin mr-2"></i>Sending...</span>
                    : 'Send Message'
                  }
                </RippleButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
