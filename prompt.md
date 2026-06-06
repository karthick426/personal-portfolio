Perfect. Since you're **not storing projects in the database** and want your portfolio to automatically display projects from your GitHub profile, and you're using **SQL (MySQL)** instead of MongoDB, use this updated Antigravity prompt.

# UPDATED ANTIGRAVITY PROMPT

## Project Title

**Karthick V – Professional Full Stack Portfolio Website**

Build a complete modern personal portfolio website for a Computer Science Engineering student named Karthick V.

The website should be professional, responsive, recruiter-friendly, and suitable for internships, placements, hackathons, freelance opportunities, and software developer careers.

---

# Technology Stack

## Frontend

* React.js
* React Router
* HTML5
* CSS3
* JavaScript ES6
* Tailwind CSS
* Framer Motion
* Font Awesome

## Backend

* Node.js
* Express.js

## Database

* MySQL

Use MySQL for:

* Contact Messages
* Visitor Analytics
* Resume Downloads
* User Authentication
* Admin Settings

---

# Website Design

Theme Style:

* Modern
* Professional
* Premium
* Glassmorphism
* Animated

Color Palette:

* Black
* Dark Navy Blue
* White
* Neon Cyan

---

# Navigation Menu

Sticky Navigation Bar

Menu Items:

* Home
* About
* Skills
* Education
* Certifications
* GitHub Portfolio
* Resume
* Contact

Features:

* Smooth Scrolling
* Active Link Highlighting
* Mobile Responsive Menu
* Glass Effect Navigation

---

# Home Section

Hero Section

Display:

Name:

**Karthick V**

Dynamic Role Animation:

* Software Developer
* Full Stack Developer
* Web Developer
* Computer Science Student

Buttons:

* View GitHub Projects
* Download Resume
* Contact Me

Background Features:

* Animated Particles
* Gradient Effects
* Floating Shapes
* Typewriter Animation

Profile Image:

* Circular Profile Photo
* Professional Border Animation

---

# About Section

Display a professional introduction.

Content:

"I am a passionate Computer Science Engineering student with strong interests in software development, web technologies, problem solving, and UI/UX design. I continuously learn emerging technologies and build real-world solutions through projects and practical development experience."

Show Information Cards:

* Location
* Email
* Phone
* Degree
* Graduation Year
* CGPA

Use animated glass cards.

---

# Skills Section

Create animated skill bars.

## Programming Languages

* Java
* Python
* HTML5
* CSS3
* JavaScript

## Tools

* VS Code
* Eclipse IDE
* Git
* GitHub
* Figma

## Professional Skills

* Problem Solving
* Prompt Engineering
* Team Collaboration
* Communication
* UI/UX Design

Display:

* Progress Bars
* Circular Charts
* Hover Effects

---

# Education Section

Create a vertical timeline.

Display:

Bachelor of Engineering

Computer Science and Engineering

Institution:

Shree Venkateshwara Hi-Tech Engineering College

CGPA:

7.24 / 10

Expected Graduation:

May 2027

Relevant Coursework:

* Data Structures
* OOP using Java
* Web Technologies
* Database Management Systems

---

# GitHub Portfolio Section

Instead of storing projects in the database:

Integrate directly with GitHub API.

Fetch repositories dynamically from:

Your GitHub Profile

Display:

* Repository Name
* Description
* Technologies Used
* Stars
* Last Updated Date
* Repository Link

Features:

* Repository Search
* Technology Filters
* GitHub Profile Statistics
* Contribution Graph
* Repository Cards

Automatically update when new repositories are added to GitHub.

No project database required.

---

# Certifications Section

Display certificates using animated cards.

Include:

* Prompt Engineering
* Web Development
* AI/ML Workshops
* Cloud Computing Workshops
* Hackathon Participation

Admin can upload new certificates.

Store certificate information in MySQL.

---

# Resume Section

Create a professional resume page.

Features:

* Resume Viewer
* Download Resume Button
* Resume Download Counter
* PDF Preview

Store download analytics in MySQL.

---

# Contact Section

Create a professional contact form.

Fields:

* Full Name
* Email
* Subject
* Message

Backend Features:

* Input Validation
* Email Verification
* Spam Protection

Store all messages in MySQL.

Database Table:

```sql
contacts
(
id,
name,
email,
subject,
message,
created_at
)
```

Success Message:

"Thank you for contacting me. I will get back to you soon."

---

# Admin Dashboard

Create secure admin panel.

Authentication:

* JWT Authentication
* Password Hashing

Features:

* View Contact Messages
* Manage Certificates
* View Website Analytics
* Resume Download Statistics
* Visitor Statistics

---

# Database Structure

### Admin Table

```sql
admins
(
id,
username,
email,
password,
created_at
)
```

### Contacts Table

```sql
contacts
(
id,
name,
email,
subject,
message,
created_at
)
```

### Certificates Table

```sql
certificates
(
id,
title,
issuer,
issue_date,
certificate_url,
created_at
)
```

### Resume Downloads

```sql
resume_downloads
(
id,
download_time,
ip_address
)
```

### Visitors

```sql
visitors
(
id,
visit_time,
page_visited
)
```

---

# Extra Features

Implement:

* Dark Mode / Light Mode
* Scroll Progress Bar
* Loading Screen
* Animated Cursor
* Typing Animation
* AOS Scroll Animations
* Glassmorphism Cards
* Responsive Design
* Mobile Friendly UI
* SEO Optimization

---

# Deployment

Frontend:

* [Vercel](https://vercel.com?utm_source=chatgpt.com)

Backend:

* [Render](https://render.com?utm_source=chatgpt.com)

Database:

* [MySQL Community Server](https://www.mysql.com?utm_source=chatgpt.com)

Version Control:

* [GitHub](https://github.com?utm_source=chatgpt.com)

---

# Important Requirement

Do NOT create a manual Projects section.

Instead, create a **GitHub Portfolio Section** that automatically fetches and displays repositories from my GitHub account using the GitHub REST API, so every new project added to GitHub appears automatically on the portfolio website without updating the database.
