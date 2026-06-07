USE portfolio_db;

CREATE TABLE IF NOT EXISTS portfolio_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section VARCHAR(50) NOT NULL UNIQUE,
    content JSON NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO portfolio_content (section, content) VALUES 
('hero', '{"name": "Karthick V", "title": "Full Stack Developer", "tagline": "Building digital experiences that combine modern aesthetics with powerful engineering."}'),
('about', '{"bio": "I am a passionate developer with expertise in React, Node.js, and modern web technologies. I love building beautiful and functional applications."}'),
('skills', '{"frontend": ["React", "JavaScript", "Tailwind CSS"], "backend": ["Node.js", "Express", "MySQL"]}');

