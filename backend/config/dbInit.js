import db from './db.js';

export async function initializeDatabase() {
  console.log('Initializing database tables...');
  try {
    // 1. Create Admins Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert Default Admin (username: admin, password: admin123)
    await db.query(`
      INSERT INTO admins (username, email, password) 
      VALUES ('admin', 'admin@example.com', '$2b$10$QO0R8S5K3ZgXWd5.sOq92uL5Y2z/r8u6Q5.O5Y2z/r8u6Q5.O5Y2z/r8u6Q5')
      ON CONFLICT (username) DO NOTHING
    `);

    // 2. Create Contacts Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create Certificates Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        issuer VARCHAR(100) NOT NULL,
        issue_date VARCHAR(50) NOT NULL,
        certificate_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Create Resume Downloads Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS resume_downloads (
        id SERIAL PRIMARY KEY,
        download_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45)
      )
    `);

    // 5. Create Visitors Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        page_visited VARCHAR(255)
      )
    `);

    // 6. Create Portfolio Content Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS portfolio_content (
        id SERIAL PRIMARY KEY,
        section VARCHAR(50) NOT NULL UNIQUE,
        content JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Seed Default Portfolio Content
    const seedSections = [
      {
        section: 'hero',
        content: {
          name: 'Karthick V',
          title: 'Full Stack Developer',
          tagline: 'Building digital experiences that combine modern aesthetics with powerful engineering.'
        }
      },
      {
        section: 'about',
        content: {
          bio: 'I am a passionate Computer Science and Engineering student at Shree Venkateshwara Hi-Tech Engineering College, pursuing my B.E. with a focus on modern web development and software engineering. I specialize in building responsive, interactive, and high-performance applications using React, Node.js, Express, and MySQL. With a strong foundation in core concepts like Data Structures, DBMS, and Web Technologies, combined with continuous learning in AI, Cloud Computing, and Prompt Engineering, I am dedicated to crafting clean code and premium digital solutions that solve real-world problems.'
        }
      },
      {
        section: 'skills',
        content: {
          frontend: ['React', 'JavaScript', 'Tailwind CSS'],
          backend: ['Node.js', 'Express', 'MySQL']
        }
      },
      {
        section: 'education',
        content: [
          {
            degree: 'Bachelor of Engineering',
            major: 'Computer Science and Engineering',
            date: 'May 2027 (Expected)',
            university: 'Shree Venkateshwara Hi-Tech Engineering College',
            cgpa: '7.24 / 10',
            coursework: ['Data Structures', 'OOP using Java', 'Web Technologies', 'Database Management Systems']
          }
        ]
      },
      {
        section: 'certifications',
        content: [
          { title: 'Prompt Engineering', issuer: 'Coursera', date: 'Jan 2024', icon: 'fa-robot' },
          { title: 'Web Development Bootcamp', issuer: 'Udemy', date: 'Nov 2023', icon: 'fa-code' },
          { title: 'AI/ML Workshop', issuer: 'IIT Madras', date: 'Sep 2023', icon: 'fa-brain' },
          { title: 'Cloud Computing', issuer: 'AWS Educate', date: 'Jul 2023', icon: 'fa-cloud' }
        ]
      },
      {
        section: 'personal_info',
        content: {
          location: '1/196G Washington Nagar, Tiruppur',
          location_url: 'https://maps.app.goo.gl/ypn9P8x1QY8N2TdVA',
          email: 'v.karthick406@gmail.com',
          phone: '+91 8760466232',
          degree: 'B.E. CSE',
          graduation: 'May 2027',
          github: 'https://github.com/Karthick0426',
          linkedin: 'https://www.linkedin.com/in/v-karthick-579535301/',
          twitter: 'https://twitter.com/karthick'
        }
      }
    ];

    for (const item of seedSections) {
      await db.query(
        `INSERT INTO portfolio_content (section, content) VALUES ($1, $2) ON CONFLICT (section) DO NOTHING`,
        [item.section, JSON.stringify(item.content)]
      );
    }

    // 8. Sync sequences to prevent duplicate key errors after manual inserts/imports
    const tables = ['admins', 'contacts', 'certificates', 'resume_downloads', 'visitors', 'portfolio_content'];
    for (const table of tables) {
      try {
        const seqCheck = await db.query(`
          SELECT c.relname FROM pg_class c 
          JOIN pg_namespace n ON n.oid = c.relnamespace 
          WHERE c.relkind = 'S' AND c.relname = $1
        `, [`${table}_id_seq`]);
        
        if (seqCheck.rows.length > 0) {
          await db.query(`SELECT setval('${table}_id_seq', COALESCE((SELECT MAX(id) FROM ${table}), 0) + 1, false)`);
        }
      } catch (seqErr) {
        console.warn(`Could not sync sequence for ${table}:`, seqErr.message);
      }
    }

    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}
