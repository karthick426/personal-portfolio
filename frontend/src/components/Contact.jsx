import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-neonCyan font-mono mb-4 text-sm">07. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="glass p-8 md:p-10 rounded-xl text-left max-w-3xl mx-auto">
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-md text-green-400 text-center font-mono">
                Thank you for contacting me. I will get back to you soon.
              </div>
            )}
            
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-md text-red-400 text-center font-mono">
                Something went wrong. Please try again later.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 text-sm font-mono mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-neonCyan transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 text-sm font-mono mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-neonCyan transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-400 text-sm font-mono mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-neonCyan transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-400 text-sm font-mono mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-neonCyan transition-colors resize-none"
                ></textarea>
              </div>
              
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-8 py-4 border border-neonCyan text-neonCyan hover:bg-neonCyan/10 rounded-md transition-all font-mono font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <span><i className="fas fa-spinner fa-spin mr-2"></i> Sending...</span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
