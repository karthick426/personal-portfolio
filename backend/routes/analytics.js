import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/visit', async (req, res) => {
  const { page_visited } = req.body;
  try {
    await db.query('INSERT INTO visitors (page_visited) VALUES ($1)', [page_visited || '/']);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/download-resume', async (req, res) => {
  const ip_address = req.ip || req.connection.remoteAddress;
  try {
    await db.query('INSERT INTO resume_downloads (ip_address) VALUES ($1)', [ip_address]);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
