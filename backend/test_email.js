import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_TO:', process.env.EMAIL_TO);
console.log('EMAIL_PASS set:', process.env.EMAIL_PASS ? 'YES (' + process.env.EMAIL_PASS.length + ' chars)' : 'NO');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

try {
  await transporter.verify();
  console.log('✅ SMTP connection verified successfully!');
  
  const info = await transporter.sendMail({
    from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'Test Email from Portfolio Backend',
    text: 'This is a test email. If you receive this, email is working!'
  });
  
  console.log('✅ Email sent! Message ID:', info.messageId);
} catch (err) {
  console.error('❌ Email Error:', err.message);
  console.error('Error Code:', err.code);
}
