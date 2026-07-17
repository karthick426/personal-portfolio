import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchUserRepos } from '../utils/githubApi.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');

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

/**
 * Performs synchronization of GitHub repositories and stores the formatted
 * projects list to backend/data/projects.json.
 */
export async function syncGitHubProjects() {
  const syncTime = new Date().toISOString();
  console.log(`[GitHub Sync] Current Sync Time: ${syncTime}`);
  
  const username = process.env.GITHUB_USERNAME || 'karthick426';
  const token = process.env.GITHUB_TOKEN;

  try {
    const repos = await fetchUserRepos(username, token);
    
    // Filter out forks and archived repositories
    const ownRepos = repos.filter(repo => !repo.fork && !repo.archived);

    // Map to required project schema
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

    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Compare with current projects.json to see if any updates happened
    let currentProjects = [];
    try {
      const fileData = await fs.readFile(PROJECTS_FILE, 'utf8');
      currentProjects = JSON.parse(fileData);
    } catch (e) {
      // If file doesn't exist or is invalid JSON, keep empty array
    }

    const projectsStringNew = JSON.stringify(formattedProjects, null, 2);
    const projectsStringOld = JSON.stringify(currentProjects, null, 2);

    if (projectsStringNew !== projectsStringOld) {
      await fs.writeFile(PROJECTS_FILE, projectsStringNew, 'utf8');
      console.log(`[GitHub Sync] Projects Updated: Saved ${formattedProjects.length} projects to cache.`);
    }

    console.log(`[GitHub Sync] Projects Synced Successfully. Total: ${formattedProjects.length}`);
    return true;
  } catch (error) {
    console.error(`[GitHub Sync] GitHub API Error: ${error.message}`);
    
    // Log rate limit info if present on the error object
    if (error.statusCode) {
      console.error(`[GitHub Sync] HTTP Status: ${error.statusCode}`);
      const remaining = error.headers ? error.headers['x-ratelimit-remaining'] : undefined;
      const reset = error.headers ? error.headers['x-ratelimit-reset'] : undefined;
      if (remaining !== undefined) {
        const resetDate = new Date(parseInt(reset) * 1000).toISOString();
        console.warn(`[GitHub Sync] Rate limit remaining: ${remaining}, resets at ${resetDate}`);
      }
    }
    return false;
  }
}

/**
 * Starts the background periodic scheduler for GitHub sync.
 */
export function startGitHubSyncScheduler() {
  console.log('[GitHub Sync] Server Started');

  // Load configuration for sync interval (default to 5 minutes / 300000ms)
  const syncInterval = Number(process.env.PROJECT_SYNC_INTERVAL || 300000);
  console.log(`[GitHub Sync] Scheduler started — syncing every ${syncInterval / 1000} seconds.`);

  // Run immediately on startup
  syncGitHubProjects().catch((err) =>
    console.error('[GitHub Sync] Startup sync failed:', err)
  );

  // Periodic interval execution
  const intervalId = setInterval(async () => {
    await syncGitHubProjects().catch((err) =>
      console.error('[GitHub Sync] Scheduled sync failed:', err)
    );
  }, syncInterval);

  if (intervalId.unref) {
    intervalId.unref();
  }

  return intervalId;
}
