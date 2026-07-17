import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const { rows: admins } = await db.query('SELECT * FROM admins WHERE username = $1', [username]);
    
    if (admins.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = admins[0];
    const match = await bcrypt.compare(password, admin.password);
    
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const { rows: visitorsRows } = await db.query('SELECT COUNT(*)::int as visitors FROM visitors');
    const { rows: messagesRows } = await db.query('SELECT COUNT(*)::int as messages FROM contacts');
    const { rows: downloadsRows } = await db.query('SELECT COUNT(*)::int as downloads FROM resume_downloads');
    const { rows: certificatesRows } = await db.query('SELECT COUNT(*)::int as certificates FROM certificates');
    
    const visitors = visitorsRows[0]?.visitors || 0;
    const messages = messagesRows[0]?.messages || 0;
    const downloads = downloadsRows[0]?.downloads || 0;
    const certificates = certificatesRows[0]?.certificates || 0;

    res.json({
      success: true,
      data: {
        visitors,
        messages,
        downloads,
        certificates
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default router;
