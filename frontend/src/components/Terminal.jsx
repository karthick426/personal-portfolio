import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ data }) => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to Karthick V. Terminal [Version 1.0.0]' },
    { type: 'system', content: 'Type "help" to see available commands.' },
    { type: 'empty', content: '' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', content: cmd }];

    switch (trimmed) {
      case 'help':
        newHistory.push({ type: 'output', content: 'Available commands:\n  whoami    - About me\n  skills    - My tech stack\n  projects  - View projects\n  contact   - Get in touch\n  clear     - Clear terminal' });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', content: `Name: ${data?.hero?.name || 'Karthick V.'}\nRole: ${data?.hero?.title || 'Full Stack Developer'}\nBio: ${data?.hero?.tagline || "I'm a Full Stack Developer and Computer Science Student passionate about creating beautiful, responsive, and user-friendly web applications."}` });
        break;
      case 'skills':
        newHistory.push({ type: 'output', content: 'React, Node.js, Express, TailwindCSS, Python, SQL, C++\n\nCheckout the Skills section for more details!' });
        break;
      case 'projects':
        newHistory.push({ type: 'output', content: 'Scrolling down to the Projects section...' });
        setTimeout(() => window.location.hash = '#projects', 500);
        break;
      case 'contact':
        newHistory.push({ type: 'output', content: 'Scrolling down to the Contact section...' });
        setTimeout(() => window.location.hash = '#contact', 500);
        break;
      case 'sudo':
      case 'su':
        newHistory.push({ type: 'error', content: `Nice try, but you don't have root privileges.` });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case '':
        break;
      default:
        newHistory.push({ type: 'error', content: `Command not found: ${trimmed}. Type "help" for a list of commands.` });
    }

    setHistory([...newHistory, { type: 'empty', content: '' }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#0a0a0a] border border-gray-800 rounded-lg shadow-2xl overflow-hidden font-mono text-sm relative dark:bg-[#0a0a0a] bg-gray-900 group">
      {/* Terminal Header */}
      <div className="bg-[#1a1a1a] px-4 py-2 flex items-center border-b border-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-gray-400 text-xs flex-grow text-center pr-8 font-mono">
          karthick@portfolio: ~
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        className="p-4 h-[350px] md:h-[400px] overflow-y-auto text-gray-300 flex flex-col space-y-2 cursor-text"
        onClick={() => document.getElementById('terminal-input').focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap font-mono leading-relaxed">
            {line.type === 'input' && (
              <div className="flex items-start">
                <span className="text-neonCyan font-bold mr-2">guest@karthick:~$</span>
                <span>{line.content}</span>
              </div>
            )}
            {line.type === 'system' && <div className="text-gray-400">{line.content}</div>}
            {line.type === 'output' && <div className="text-gray-300 ml-4 border-l-2 border-gray-700 pl-4 py-2 my-1">{line.content}</div>}
            {line.type === 'error' && <div className="text-red-400">{line.content}</div>}
            {line.type === 'empty' && <div>&nbsp;</div>}
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex items-center">
          <span className="text-neonCyan font-bold mr-2">guest@karthick:~$</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent outline-none text-white border-none focus:ring-0 p-0 font-mono"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default Terminal;
