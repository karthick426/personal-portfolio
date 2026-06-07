import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';

// Import Routes
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import analyticsRoutes from './routes/analytics.js';
import contentRoutes from './routes/content.js';

dotenv.config();

const app = express();
app.use('/api/contact', contactRoutes);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true
  })
);
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/content', contentRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Backend Running"
  });
});
//app.get('/api/force-sync', async (req, res) => {
  try {
    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.default.hash('admin123', 10);
    //await db.execute('UPDATE admins SET password = ? WHERE username = ?', [hashedPassword, 'admin']);

    const formattedProjects = [
      {
        id: 1,
        name: 'Emergency_notification',
        description: 'An emergency notification system developed for quick alerting.',
        technologies: ['JavaScript', 'HTML', 'CSS'],
        features: [],
        live_demo: '',
        repository: 'https://github.com/karthick426/Emergency_notification',
        screenshots: []
      }
    ];
    
    const [rows] = await db.execute("SELECT * FROM portfolio_content WHERE section = 'projects'");
    if (rows.length === 0) {
      await db.execute("INSERT INTO portfolio_content (section, content) VALUES ('projects', ?)", [JSON.stringify(formattedProjects)]);
    } else {
      await db.execute("UPDATE portfolio_content SET content = ? WHERE section = 'projects'", [JSON.stringify(formattedProjects)]);
    }
    res.json({ success: true, count: formattedProjects.length, repos: formattedProjects });
  } catch (e) {
    res.json({ success: false, error: e.message, stack: e.stack });
  }
});

const projectEnhancements = {
  'sk_escapes': {
    description: 'A dynamic travel planning and escape room booking web application featuring interactive travel cards, customizable itineraries, and a fully responsive client interface.',
    features: ['Dynamic Booking System', 'Interactive Travel Cards', 'Responsive Booking Form', 'Modern UI Animations'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel']
  },
  'snake_game': {
    description: 'A retro browser-based classic Snake Game built with HTML5 Canvas and JavaScript, featuring smooth grid-based controls, real-time score keeping, and dynamic speed increments.',
    features: ['Classic Grid Movement', 'Real-time Score Counter', 'Dynamic Difficulty/Speed Progression', 'Mobile & Desktop Responsive Layout'],
    technologies: ['HTML5 Canvas', 'CSS3', 'JavaScript']
  },
  'training_program': {
    description: 'A comprehensive training curriculum and scheduling web application displaying a visual timeline of courses, training modules, and registration details with custom-styled elements.',
    features: ['Visual Curriculum Timeline', 'Interactive Course Details', 'Modern CSS Layouts', 'Responsive Timetable'],
    technologies: ['HTML5', 'CSS3', 'JavaScript']
  },
  'Emergency_notification': {
    description: 'An emergency notification system developed for quick alerting and real-time broadcasts during critical events.',
    features: ['Real-time Push Alerts', 'Geotargeted Broadcasts', 'User Status Verification', 'Admin Alert Control Panel'],
    technologies: ['JavaScript', 'HTML5', 'CSS3']
  }
};

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // Fix Admin Password and Sync GitHub Projects
  try {
    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.default.hash('admin123', 10);
    await db.execute('UPDATE admins SET password = ? WHERE username = ?', [hashedPassword, 'admin']);
    console.log('Admin password verified and updated.');

    console.log('Syncing GitHub projects...');
    const https = await import('https');
    
    const options = {
      hostname: 'api.github.com',
      path: '/users/karthick426/repos?sort=updated&per_page=12',
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', async () => {
        if (res.statusCode === 200) {
          const repos = JSON.parse(data);
          const formattedProjects = repos.map((repo, idx) => {
            const enhancement = projectEnhancements[repo.name] || {};
            return {
              id: idx + 1,
              name: repo.name,
              description: enhancement.description || repo.description || "A personal development project showcasing clean code and modern web practices.",
              technologies: enhancement.technologies || (repo.topics && repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : ['JavaScript'])),
              features: enhancement.features || [],
              live_demo: repo.homepage || enhancement.live_demo || "",
              repository: repo.html_url,
              screenshots: []
            };
          });
          
          const [rows] = await db.execute("SELECT * FROM portfolio_content WHERE section = 'projects'");
          if (rows.length === 0) {
            await db.execute(
              "INSERT INTO portfolio_content (section, content) VALUES ('projects', ?)",
              [JSON.stringify(formattedProjects)]
            );
          } else {
            await db.execute(
              "UPDATE portfolio_content SET content = ? WHERE section = 'projects'",
              [JSON.stringify(formattedProjects)]
            );
          }
          console.log('Successfully synced GitHub projects to database!');
        } else {
          console.error('Failed to fetch from GitHub API:', res.statusCode, data);
        }
      });
    }).on('error', (e) => {
      console.error('Error with GitHub request:', e);
    });

  } catch (err) {
    console.error('Error during startup logic:', err);
  }
});
