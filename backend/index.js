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

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173'
    ],
    credentials: true
  })
);

app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend Running'
  });
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/content', contentRoutes);

const projectEnhancements = {
  sk_escapes: {
    description:
      'A dynamic travel planning and escape room booking web application featuring interactive travel cards, customizable itineraries, and a fully responsive client interface.',
    features: [
      'Dynamic Booking System',
      'Interactive Travel Cards',
      'Responsive Booking Form',
      'Modern UI Animations'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel']
  },

  snake_game: {
    description:
      'A retro browser-based classic Snake Game built with HTML5 Canvas and JavaScript.',
    features: [
      'Classic Grid Movement',
      'Real-time Score Counter',
      'Dynamic Difficulty Progression',
      'Responsive Layout'
    ],
    technologies: ['HTML5 Canvas', 'CSS3', 'JavaScript']
  },

  training_program: {
    description:
      'A comprehensive training curriculum and scheduling web application.',
    features: [
      'Visual Curriculum Timeline',
      'Interactive Course Details',
      'Modern CSS Layouts',
      'Responsive Timetable'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript']
  },

  Emergency_notification: {
    description:
      'An emergency notification system developed for quick alerting and real-time broadcasts.',
    features: [
      'Real-time Push Alerts',
      'Geotargeted Broadcasts',
      'User Status Verification',
      'Admin Alert Control Panel'
    ],
    technologies: ['JavaScript', 'HTML5', 'CSS3']
  }
};

// Start const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

  try {
    console.log('Skipping admin password update.');

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

    https
      .get(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', async () => {
          try {
            if (res.statusCode === 200) {
              const repos = JSON.parse(data);

              const formattedProjects = repos.map((repo, idx) => {
                const enhancement =
                  projectEnhancements[repo.name] || {};

                return {
                  id: idx + 1,
                  name: repo.name,
                  description:
                    enhancement.description ||
                    repo.description ||
                    'A personal development project showcasing clean code and modern web practices.',
                  technologies:
                    enhancement.technologies ||
                    (repo.topics && repo.topics.length > 0
                      ? repo.topics
                      : repo.language
                      ? [repo.language]
                      : ['JavaScript']),
                  features: enhancement.features || [],
                  live_demo:
                    repo.homepage ||
                    enhancement.live_demo ||
                    '',
                  repository: repo.html_url,
                  screenshots: []
                };
              });

              const [rows] = await db.execute(
                "SELECT * FROM portfolio_content WHERE section='projects'"
              );

              if (rows.length === 0) {
                await db.execute(
                  "INSERT INTO portfolio_content (section, content) VALUES ('projects', ?)",
                  [JSON.stringify(formattedProjects)]
                );
              } else {
                await db.execute(
                  "UPDATE portfolio_content SET content=? WHERE section='projects'",
                  [JSON.stringify(formattedProjects)]
                );
              }

              console.log(
                'Successfully synced GitHub projects to database!'
              );
            } else {
              console.error(
                'Failed to fetch GitHub repos:',
                res.statusCode
              );
            }
          } catch (err) {
            console.error('GitHub Sync Error:', err);
          }
        });
      })
      .on('error', (err) => {
        console.error('GitHub Request Error:', err);
      });
  } catch (err) {
    console.error('Error during startup logic:', err);
  }
});