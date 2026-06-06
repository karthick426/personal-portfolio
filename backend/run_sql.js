import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0426',
    database: 'portfolio_db'
  });
  const sql = `
  INSERT IGNORE INTO portfolio_content (section, content) VALUES 
  ('personal_info', '{
      "location": "India", 
      "email": "karthick@example.com", 
      "phone": "+91 1234567890",
      "degree": "B.E. CSE", 
      "graduation": "May 2027", 
      "github": "https://github.com/Karthick0426", 
      "linkedin": "https://linkedin.com/in/karthick", 
      "twitter": "https://twitter.com/karthick"
  }');`;
  await connection.query(sql);
  console.log('SQL executed successfully');
  process.exit(0);
}
run().catch(console.error);
