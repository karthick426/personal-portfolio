import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECTS_FILE = path.join(__dirname, '..', 'data', 'projects.json');

const router = express.Router();

// Helper to read local projects cache
async function getCachedProjects() {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cached projects:', error.message);
    return [];
  }
}

// GET /api/projects
// Fetch automated projects directly
router.get('/projects', async (req, res) => {
  try {
    const projects = await getCachedProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error serving projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/content
// Fetch all dynamic portfolio content
router.get('/', async (req, res) => {
  try {
    // Query other sections from PostgreSQL (filtering out projects if it exists in DB)
    const { rows } = await db.query("SELECT section, content FROM portfolio_content WHERE section != 'projects'");
    const portfolioContent = {};
    
    rows.forEach(row => {
      portfolioContent[row.section] = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;
    });

    // Merge in automated projects from projects.json cache
    portfolioContent.projects = await getCachedProjects();
    
    res.json(portfolioContent);
  } catch (error) {
    console.error('Error fetching portfolio content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/content/:section
// Update a specific section's content (In a real app, this should be protected with JWT auth middleware)
router.put('/:section', async (req, res) => {
  const { section } = req.params;
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  // Handle projects updates separately (bypass PostgreSQL completely)
  if (section === 'projects') {
    try {
      await fs.mkdir(path.dirname(PROJECTS_FILE), { recursive: true });
      await fs.writeFile(PROJECTS_FILE, JSON.stringify(content, null, 2), 'utf8');
      return res.json({ message: 'Projects content updated successfully (cached locally)' });
    } catch (error) {
      console.error('Error updating projects cache:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  try {
    // For other sections, upsert into PostgreSQL using ON CONFLICT (PostgreSQL syntax) or direct check.
    // Since we are using PostgreSQL, we must use ON CONFLICT (section) DO UPDATE SET content = EXCLUDED.content
    const query = `
      INSERT INTO portfolio_content (section, content) 
      VALUES ($1, $2) 
      ON CONFLICT (section) 
      DO UPDATE SET content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP
    `;
    const contentString = JSON.stringify(content);
    
    await db.query(query, [section, contentString]);
    
    res.json({ message: `${section} content updated successfully` });
  } catch (error) {
    console.error(`Error updating ${section} content:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
