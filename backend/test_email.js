import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_TO:', process.env.EMAIL_TO);
console.log('EMAIL_PASS set:', process.env.EMAIL_PASS ? 'YES (' + process.env.EMAIL_PASS.length + ' chars)' : 'NO');

// Test with port 587 STARTTLS (same as Railway config)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: { rejectUnauthorized: false }
});

try {
  await transporter.verify();
  console.log('✅ SMTP port 587 connection verified!');
  
  const info = await transporter.sendMail({
    from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'Test Email - Port 587 (STARTTLS)',
    text: 'This is a test using port 587. If you receive this, email will work on Railway too!'
  });
  
  console.log('✅ Email sent! Message ID:', info.messageId);
} catch (err) {
  console.error('❌ Email Error:', err.message);
  console.error('Error Code:', err.code);
}
