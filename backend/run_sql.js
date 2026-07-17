import pg from 'pg';
const { Client } = pg;

async function run() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '0426',
    database: 'portfolio_db'
  });
  
  await client.connect();

  const sql = `
  INSERT INTO portfolio_content (section, content) VALUES 
  ($1, $2)
  ON CONFLICT (section) DO NOTHING;`;
  
  const content = JSON.stringify({
    location: "India", 
    email: "karthick@example.com", 
    phone: "+91 1234567890",
    degree: "B.E. CSE", 
    graduation: "May 2027", 
    github: "https://github.com/Karthick0426", 
    linkedin: "https://linkedin.com/in/karthick", 
    twitter: "https://twitter.com/karthick"
  });

  await client.query(sql, ['personal_info', content]);
  console.log('SQL executed successfully');
  await client.end();
  process.exit(0);
}

run().catch(console.error);
