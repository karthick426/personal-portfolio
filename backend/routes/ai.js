import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECTS_FILE = path.join(__dirname, '..', 'data', 'projects.json');

// Helper to get cached projects context
const getProjectsContext = () => {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
      return data.map(p => `- ${p.name}: ${p.description} (Tech: ${(p.technologies || []).join(', ')})`).join('\n');
    }
  } catch (err) {
    console.error('Failed reading projects for AI prompt context:', err);
  }
  return '- Portfolio Website: Personal developer profile.';
};

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  // Pre-seed system prompt context
  const projectsText = getProjectsContext();
  const systemPrompt = `You are the AI Assistant for Karthick V's personal portfolio. 
Your goal is to friendly, professionally, and concisely answer questions from recruiters or visitors.

About Karthick:
- Name: Karthick V
- Title: Computer Science and Engineering Student & Fullstack Developer
- Education: Pursuing B.E. in Computer Science and Engineering at Shree Venkateshwara Hi-Tech Engineering College (Graduation: May 2027)
- Email: v.karthick406@gmail.com
- Location: Tiruppur, India
- Phone: +91 8760466232
- LinkedIn: https://www.linkedin.com/in/karthick-v-87b649297
- GitHub: https://github.com/karthick426
- Core Skills: Java, Python, HTML5, CSS3, JavaScript, VS Code, Git, GitHub, Figma, Problem Solving, Prompt Engineering, Team Collaboration, Communication, UI/UX Design

Karthick's Current Projects:
${projectsText}

Guidelines:
1. Keep your answers brief, professional, and directly focused on helping recruiters hire Karthick.
2. If asked about contact info, provide his email and LinkedIn.
3. Speak in the third person or as his smart portfolio assistant.
4. If a Gemini API key is missing or calls fail, a fallback response is automatically sent.

User Question: ${message}`;

  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    // Elegant fallback simulation if user has not set key yet
    let fallbackReply = "I am Karthick's portfolio AI assistant! I'd love to help you. Currently, the Gemini API key is not configured in the backend environment variables, but you can contact Karthick directly at v.karthick406@gmail.com or via LinkedIn!";
    
    const msgLower = message.toLowerCase();
    if (msgLower.includes('project')) {
      fallbackReply = `Karthick has developed several projects including: ${fs.existsSync(PROJECTS_FILE) ? JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8')).map(p => p.name).join(', ') : 'AI MCQ Generator, and Portfolio Web Apps'}. Contact him at v.karthick406@gmail.com to discuss them!`;
    } else if (msgLower.includes('skill') || msgLower.includes('tech')) {
      fallbackReply = "Karthick specializes in Java, Python, JavaScript, React, Node.js, Express, and PostgreSQL database development.";
    } else if (msgLower.includes('contact') || msgLower.includes('email') || msgLower.includes('phone')) {
      fallbackReply = "You can contact Karthick at v.karthick406@gmail.com or call him at +91 8760466232. You can also message him directly via the contact form on this page!";
    }
    return res.json({ reply: fallbackReply });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API responded with status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that response right now.";
    return res.json({ reply: reply.trim() });

  } catch (error) {
    console.error('Gemini Chat API Error:', error);
    return res.json({ 
      reply: "Hi there! I encountered an error communicating with the AI model, but you can reach out directly to Karthick at v.karthick406@gmail.com!"
    });
  }
});

export default router;
