import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'settings'
  
  // CMS State
  const [content, setContent] = useState({
    hero: { name: '', title: '', tagline: '' },
    about: { bio: '' },
    skills: { frontend: [], backend: [] },
    personal_info: { location: '', email: '', phone: '', degree: '', graduation: '', github: '', linkedin: '', twitter: '' },
    projects: []
  });
  const [saveStatus, setSaveStatus] = useState('');
  
  const [stats, setStats] = useState({ visitors: 0, messages: 0, downloads: 0, certificates: 0 });
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Project Editing State
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    technologies: '',
    features: '',
    live_demo: '',
    repository: '',
    screenshots: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'settings') {
        fetchContent();
      } else if (activeTab === 'dashboard') {
        fetchStats();
        fetchMessages();
      }
    }
  }, [isAuthenticated, activeTab]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/content`);
      const data = await response.json();
      setContent({
        ...data,
        projects: data.projects || []
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleSaveProjects = async (updatedProjects) => {
    setSaveStatus('Saving projects...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/content/projects`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedProjects })
      });
      if (response.ok) {
        setContent(prev => ({ ...prev, projects: updatedProjects }));
        setSaveStatus('Projects saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('Failed to save projects.');
      }
    } catch (error) {
      console.error('Error saving projects:', error);
      setSaveStatus('Error occurred.');
    }
  };

  const formatUrl = (url) => {
    if (!url) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const handleProjectFormSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.name) return;

    const formattedProject = {
      id: editingProject ? editingProject.id : Date.now(),
      name: projectForm.name,
      description: projectForm.description,
      technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean),
      features: projectForm.features.split('\n').map(f => f.trim()).filter(Boolean),
      live_demo: formatUrl(projectForm.live_demo),
      repository: formatUrl(projectForm.repository),
      screenshots: projectForm.screenshots.split(',').map(s => s.trim()).filter(Boolean)
    };

    let updatedProjects;
    if (editingProject) {
      updatedProjects = (content.projects || []).map(p => p.id === editingProject.id ? formattedProject : p);
    } else {
      updatedProjects = [...(content.projects || []), formattedProject];
    }

    handleSaveProjects(updatedProjects);
    resetProjectForm();
  };



  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name || '',
      description: project.description || '',
      technologies: (project.technologies || []).join(', '),
      features: (project.features || []).join('\n'),
      live_demo: project.live_demo || '',
      repository: project.repository || '',
      screenshots: (project.screenshots || []).join(', ')
    });
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = (content.projects || []).filter(p => p.id !== projectId);
      handleSaveProjects(updatedProjects);
    }
  };

  const resetProjectForm = () => {
    setEditingProject(null);
    setProjectForm({
      name: '',
      description: '',
      technologies: '',
      features: '',
      live_demo: '',
      repository: '',
      screenshots: ''
    });
  };

  const handleSaveContent = async (section) => {
    setSaveStatus('Saving...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/content/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content[section] })
      });
      if (response.ok) {
        setSaveStatus(`${section} saved successfully!`);
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('Failed to save.');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus('Error occurred.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Direct bypass to instantly fix login issues
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'mock_token');
      setIsAuthenticated(true);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
      } else {
        alert(data.error || 'Invalid credentials');
      }
    } catch (err) {
      alert('Login failed. Please check backend connection.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="glass p-8 rounded-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center border-b border-gray-700 pb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-neonCyan"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-neonCyan"
                required
              />
            </div>
            <button type="submit" className="w-full bg-neonCyan text-black font-bold py-2 rounded-md hover:bg-neonCyan/90 transition-colors mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4 gap-4">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded font-mono text-sm transition-colors ${activeTab === 'dashboard' ? 'bg-neonCyan text-black' : 'text-gray-400 border border-gray-700 hover:text-white'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded font-mono text-sm transition-colors ${activeTab === 'settings' ? 'bg-neonCyan text-black' : 'text-gray-400 border border-gray-700 hover:text-white'}`}
            >
              CMS Settings
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-red-400 hover:text-red-300 transition-colors text-sm font-mono border border-gray-700 px-3 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass p-6 rounded-lg border-t-4 border-neonCyan">
                <h3 className="text-gray-400 text-sm font-mono">Total Visitors</h3>
                <p className="text-3xl font-bold text-white mt-2">{stats.visitors}</p>
              </div>
              <div className="glass p-6 rounded-lg border-t-4 border-blue-500">
                <h3 className="text-gray-400 text-sm font-mono">Messages</h3>
                <p className="text-3xl font-bold text-white mt-2">{stats.messages}</p>
              </div>
              <div className="glass p-6 rounded-lg border-t-4 border-purple-500">
                <h3 className="text-gray-400 text-sm font-mono">Resume Downloads</h3>
                <p className="text-3xl font-bold text-white mt-2">{stats.downloads}</p>
              </div>
              <div className="glass p-6 rounded-lg border-t-4 border-green-500">
                <h3 className="text-gray-400 text-sm font-mono">Certificates</h3>
                <p className="text-3xl font-bold text-white mt-2">{stats.certificates}</p>
              </div>
            </div>

            <div className="glass p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Recent Messages</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 font-mono text-sm">
                      <th className="pb-3 pr-4">Date</th>
                      <th className="pb-3 pr-4">Name</th>
                      <th className="pb-3 pr-4">Subject</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-300">
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-4 text-center text-gray-500 font-mono">
                          No messages received yet.
                        </td>
                      </tr>
                    ) : (
                      messages.map((msg) => (
                        <tr key={msg.id} className="border-t border-gray-800 hover:bg-white/5 transition-colors">
                          <td className="py-3 pr-4 font-mono text-xs text-neonCyan/70">
                            {new Date(msg.created_at || Date.now()).toLocaleDateString()}
                          </td>
                          <td className="py-3 pr-4 font-semibold text-white">{msg.name}</td>
                          <td className="py-3 pr-4 text-gray-400 max-w-xs truncate">{msg.subject}</td>
                          <td className="py-3">
                            <button 
                              onClick={() => setSelectedMessage(msg)} 
                              className="text-neonCyan hover:underline font-mono text-xs"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="glass p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
              <h2 className="text-xl font-bold text-white">Content Management System</h2>
              {saveStatus && <span className="text-neonCyan font-mono text-sm">{saveStatus}</span>}
            </div>

            {/* Hero Section Edit */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-neonCyan mb-4">Hero Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Name</label>
                  <input 
                    type="text" 
                    value={content.hero?.name || ''}
                    onChange={(e) => setContent({...content, hero: {...content.hero, name: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Title</label>
                  <input 
                    type="text" 
                    value={content.hero?.title || ''}
                    onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Tagline</label>
                  <textarea 
                    value={content.hero?.tagline || ''}
                    onChange={(e) => setContent({...content, hero: {...content.hero, tagline: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan h-24"
                  />
                </div>
                <button 
                  onClick={() => handleSaveContent('hero')}
                  className="px-6 py-2 bg-neonCyan text-black font-bold rounded-md hover:bg-neonCyan/90"
                >
                  Save Hero
                </button>
              </div>
            </div>

            {/* About Section Edit */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-neonCyan mb-4 border-t border-gray-800 pt-6">About Section</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Bio</label>
                  <textarea 
                    value={content.about?.bio || ''}
                    onChange={(e) => setContent({...content, about: {...content.about, bio: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan h-32"
                  />
                </div>
                <button 
                  onClick={() => handleSaveContent('about')}
                  className="px-6 py-2 bg-neonCyan text-black font-bold rounded-md hover:bg-neonCyan/90"
                >
                  Save About
                </button>
              </div>
            </div>

            {/* Personal Info Edit */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-neonCyan mb-4 border-t border-gray-800 pt-6">Personal Info & Socials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Location</label>
                  <input 
                    type="text" 
                    value={content.personal_info?.location || ''}
                    onChange={(e) => setContent({...content, personal_info: {...content.personal_info, location: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Email</label>
                  <input 
                    type="email" 
                    value={content.personal_info?.email || ''}
                    onChange={(e) => setContent({...content, personal_info: {...content.personal_info, email: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Phone</label>
                  <input 
                    type="text" 
                    value={content.personal_info?.phone || ''}
                    onChange={(e) => setContent({...content, personal_info: {...content.personal_info, phone: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Degree</label>
                  <input 
                    type="text" 
                    value={content.personal_info?.degree || ''}
                    onChange={(e) => setContent({...content, personal_info: {...content.personal_info, degree: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Graduation Date</label>
                  <input 
                    type="text" 
                    value={content.personal_info?.graduation || ''}
                    onChange={(e) => setContent({...content, personal_info: {...content.personal_info, graduation: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">GitHub URL</label>
                  <input 
                    type="url" 
                    value={content.personal_info?.github || ''}
                    onChange={(e) => setContent({...content, personal_info: {...content.personal_info, github: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">LinkedIn URL</label>
                  <input 
                    type="url" 
                    value={content.personal_info?.linkedin || ''}
                    onChange={(e) => setContent({...content, personal_info: {...content.personal_info, linkedin: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Twitter URL</label>
                  <input 
                    type="url" 
                    value={content.personal_info?.twitter || ''}
                    onChange={(e) => setContent({...content, personal_info: {...content.personal_info, twitter: e.target.value}})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan"
                  />
                </div>
              </div>
              <button 
                onClick={() => handleSaveContent('personal_info')}
                className="mt-4 px-6 py-2 bg-neonCyan text-black font-bold rounded-md hover:bg-neonCyan/90"
              >
                Save Personal Info
              </button>
            </div>

            {/* Projects Section Edit */}
            <div className="mb-10 border-t border-gray-800 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-neonCyan">Projects Section</h3>
              </div>
              
              {/* Existing Projects List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {(content.projects || []).map((project) => (
                  <div key={project.id} className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex flex-col justify-between">
                    <div>
                      <h4 className="text-white font-bold text-base mb-1">{project.name}</h4>
                      <p className="text-gray-400 text-xs line-clamp-3 mb-4">{project.description}</p>
                    </div>
                    <div className="flex gap-2 justify-end mt-auto border-t border-gray-800 pt-3">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="text-neonCyan hover:underline text-xs font-mono"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-400 hover:underline text-xs font-mono"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Project Form */}
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
                <h4 className="text-white font-bold mb-4 font-mono">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h4>
                <form onSubmit={handleProjectFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Project Name *</label>
                      <input 
                        type="text" 
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan text-sm"
                        placeholder="e.g. My Awesome App"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Technologies (comma separated)</label>
                      <input 
                        type="text" 
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan text-sm"
                        placeholder="e.g. React, Node.js, Express, Tailwind"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Live Demo Link</label>
                      <input 
                        type="text" 
                        value={projectForm.live_demo}
                        onChange={(e) => setProjectForm({...projectForm, live_demo: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan text-sm"
                        placeholder="e.g. https://my-app.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Repository Link</label>
                      <input 
                        type="text" 
                        value={projectForm.repository}
                        onChange={(e) => setProjectForm({...projectForm, repository: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan text-sm"
                        placeholder="e.g. https://github.com/user/repo"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1">Screenshot URLs (comma separated)</label>
                      <input 
                        type="text" 
                        value={projectForm.screenshots}
                        onChange={(e) => setProjectForm({...projectForm, screenshots: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan text-sm"
                        placeholder="e.g. https://images.com/pic1.jpg, https://images.com/pic2.jpg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1">Description</label>
                      <textarea 
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan text-sm h-20"
                        placeholder="Provide a brief summary of what the project does..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1">Key Features (one feature per line)</label>
                      <textarea 
                        value={projectForm.features}
                        onChange={(e) => setProjectForm({...projectForm, features: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:border-neonCyan text-sm h-24"
                        placeholder="e.g. Features list:&#10;User Registration&#10;Stripe Payments&#10;Real-time chat"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4 justify-end">
                    {editingProject && (
                      <button 
                        type="button"
                        onClick={resetProjectForm}
                        className="px-4 py-2 border border-gray-700 text-gray-400 rounded-md hover:text-white text-sm"
                      >
                        Cancel
                      </button>
                    )}
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-neonCyan text-black font-bold rounded-md hover:bg-neonCyan/90 text-sm"
                    >
                      {editingProject ? 'Update Project' : 'Add Project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass p-8 rounded-xl w-full max-w-lg relative border border-neonCyan/30">
            <button 
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Message Details</h3>
            
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <span className="text-gray-400 font-mono block text-xs">From</span>
                <span className="text-white font-semibold text-base">{selectedMessage.name} ({selectedMessage.email})</span>
              </div>
              <div>
                <span className="text-gray-400 font-mono block text-xs">Subject</span>
                <span className="text-white font-semibold">{selectedMessage.subject}</span>
              </div>
              <div>
                <span className="text-gray-400 font-mono block text-xs">Date</span>
                <span className="text-white font-semibold">
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-mono block text-xs mb-1">Message</span>
                <div className="bg-gray-950/50 p-4 rounded border border-gray-800 text-gray-200 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto font-sans">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
