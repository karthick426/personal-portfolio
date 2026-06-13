import https from 'https';
import db from './db.js';

// ─── Project metadata enhancements ────────────────────────────────────────────
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
  },
  task_management: {
    description:
      'A full-featured task management application for organizing and tracking personal or team tasks.',
    features: [
      'Task Creation & Assignment',
      'Priority Levels',
      'Status Tracking',
      'Deadline Management'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MySQL']
  },
  'personal-portfolio': {
    description:
      'A modern, responsive developer portfolio built with React, Vite, and TailwindCSS, deployed on Vercel.',
    features: [
      'Dynamic GitHub Sync',
      'Admin CMS Panel',
      'Contact Form with Email',
      'Dark Aesthetic Design'
    ],
    technologies: ['React', 'Node.js', 'MySQL', 'Vercel', 'Railway']
  }
};

// ─── Core sync function ────────────────────────────────────────────────────────
export async function syncGitHubProjects() {
  return new Promise((resolve, reject) => {
    console.log('[GitHub Sync] Fetching repos from GitHub API...');

    const options = {
      hostname: 'api.github.com',
      path: '/users/karthick426/repos?sort=updated&per_page=20',
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js-Portfolio-Sync'
      }
    };

    // Optionally use a GitHub token to increase rate limit (60 → 5000 req/hr)
    if (process.env.GITHUB_TOKEN) {
      options.headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    https
      .get(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', async () => {
          try {
            if (res.statusCode !== 200) {
              console.error(`[GitHub Sync] API returned status ${res.statusCode}`);
              // Log rate limit info if available
              const remaining = res.headers['x-ratelimit-remaining'];
              const reset = res.headers['x-ratelimit-reset'];
              if (remaining !== undefined) {
                const resetDate = new Date(parseInt(reset) * 1000).toISOString();
                console.warn(`[GitHub Sync] Rate limit remaining: ${remaining}, resets at ${resetDate}`);
              }
              return resolve(false);
            }

            const repos = JSON.parse(data);

            // Filter out forked repos (optional: remove this line to include forks)
            const ownRepos = repos.filter((r) => !r.fork);

            const formattedProjects = ownRepos.map((repo, idx) => {
              const enhancement = projectEnhancements[repo.name] || {};
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
                live_demo: repo.homepage || enhancement.live_demo || '',
                repository: repo.html_url,
                screenshots: [],
                stars: repo.stargazers_count,
                updated_at: repo.updated_at
              };
            });

            // Upsert into database
            const [rows] = await db.execute(
              "SELECT id FROM portfolio_content WHERE section='projects'"
            );

            if (rows.length === 0) {
              await db.execute(
                "INSERT INTO portfolio_content (section, content) VALUES ('projects', ?)",
                [JSON.stringify(formattedProjects)]
              );
            } else {
              await db.execute(
                "UPDATE portfolio_content SET content=?, updated_at=NOW() WHERE section='projects'",
                [JSON.stringify(formattedProjects)]
              );
            }

            console.log(
              `[GitHub Sync] ✅ Synced ${formattedProjects.length} projects to database.`
            );
            resolve(true);
          } catch (err) {
            console.error('[GitHub Sync] ❌ Error processing response:', err.message);
            resolve(false);
          }
        });
      })
      .on('error', (err) => {
        console.error('[GitHub Sync] ❌ Network error:', err.message);
        resolve(false);
      });
  });
}

// ─── Periodic scheduler ────────────────────────────────────────────────────────
const SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export function startGitHubSyncScheduler() {
  console.log(`[GitHub Sync] Scheduler started — syncing every ${SYNC_INTERVAL_MS / 60000} minutes.`);

  // Run immediately on startup
  syncGitHubProjects().catch((err) =>
    console.error('[GitHub Sync] Startup sync failed:', err)
  );

  // Then repeat on interval
  const intervalId = setInterval(async () => {
    await syncGitHubProjects().catch((err) =>
      console.error('[GitHub Sync] Scheduled sync failed:', err)
    );
  }, SYNC_INTERVAL_MS);

  // Allow Node.js to exit even if interval is running (don't block shutdown)
  if (intervalId.unref) intervalId.unref();

  return intervalId;
}
