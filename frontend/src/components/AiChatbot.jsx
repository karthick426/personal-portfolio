import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../config';

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I am Karthick's AI Assistant. Ask me anything about his projects, skills, education, or how to contact him!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Tell me about Karthick",
    "Show his top projects",
    "How can I contact him?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) throw new Error("Chat request failed");

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm having trouble connecting to my brain right now. Please try again or email Karthick at v.karthick406@gmail.com!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-neonCyan text-black flex justify-center items-center shadow-[0_0_20px_rgba(167,139,250,0.5)] border border-neonCyan/40 outline-none"
      >
        {isOpen ? (
          <i className="fas fa-times text-xl"></i>
        ) : (
          <i className="fas fa-robot text-xl"></i>
        )}
      </motion.button>

      {/* Expandable Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-18 right-0 w-[330px] sm:w-[380px] h-[480px] glass rounded-2xl border border-neonCyan/25 shadow-[0_20px_50px_rgba(139,92,246,0.25)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[#080816]/90 border-b border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-neonCyan/20 flex justify-center items-center">
                <i className="fas fa-robot text-neonCyan"></i>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Portfolio Assistant</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-gray-400 font-medium">Online</span>
                </div>
              </div>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-neonCyan text-black font-medium rounded-tr-none'
                        : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-gray-200 border border-white/10 rounded-2xl rounded-tl-none p-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-neonCyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-neonCyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-neonCyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-col gap-2">
                <span className="text-[10px] text-gray-500 font-mono">SUGGESTED QUESTIONS:</span>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-2.5 py-1 text-xs text-neonCyan bg-neonCyan/5 border border-neonCyan/20 rounded-full hover:bg-neonCyan/20 hover:border-neonCyan/40 transition-all font-mono"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-white/5 bg-[#040409]/60 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about my skills, projects..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-neonCyan/50 transition-colors placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-neonCyan text-black flex justify-center items-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-transform"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiChatbot;
