import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET /api/content
// Fetch all dynamic portfolio content
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT section, content FROM portfolio_content');
    const portfolioContent = {};
    
    rows.forEach(row => {
      // Ensure we parse the JSON content if it's returned as a string
      portfolioContent[row.section] = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;
    });
    
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

  try {
    // Upsert logic using ON DUPLICATE KEY UPDATE
    const query = `
      INSERT INTO portfolio_content (section, content) 
      VALUES (?, ?) 
      ON DUPLICATE KEY UPDATE content = ?
    `;
    const contentString = JSON.stringify(content);
    
    await db.execute(query, [section, contentString, contentString]);
    
    res.json({ message: `${section} content updated successfully` });
  } catch (error) {
    console.error(`Error updating ${section} content:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
