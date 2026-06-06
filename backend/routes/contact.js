import express from 'express';
import nodemailer from 'nodemailer';
import db from '../config/db.js';

const router = express.Router();

// Config transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    // Send email notification (asynchronously in background)
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Portfolio Message: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <div style="background-color: #0f172a; padding: 24px; text-align: center; border-bottom: 2px solid #64ffda;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Message</h2>
          </div>
          <div style="padding: 24px; background-color: #ffffff; color: #333333; line-height: 1.6;">
            <p style="margin-top: 0;">You have received a new message from your portfolio website's contact form.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Subject:</td>
                <td style="padding: 8px 0; color: #0f172a;">${subject}</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-top: 20px;">
              <h4 style="margin: 0 0 10px 0; color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message Details</h4>
              <p style="margin: 0; white-space: pre-wrap; color: #1e293b; font-size: 15px;">${message}</p>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #64748b;">This notification was automatically sent by your personal portfolio backend server.</p>
          </div>
        </div>
      `
    };

    transporter.sendMail(mailOptions).catch(emailErr => {
      console.error('Failed to send contact notification email:', emailErr);
    });

    res.status(201).json({ success: true, message: 'Message sent successfully', id: result.insertId });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/contact
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
