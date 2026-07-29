AGENTS.md — Project Rules for Antigravity
HARD PROHIBITIONS (read first, never violate)
Do NOT add any auth provider (Google/GitHub OAuth, Auth0, Clerk, etc.) — admin auth is a single hardcoded user via JWT + bcrypt only.

Do NOT introduce a second database. MongoDB Atlas is the only data store.

Do NOT add UI component libraries (MUI, Chakra, Bootstrap, Ant Design). Tailwind CSS only.

Do NOT use callbacks or .then() chains. Use async/await everywhere.

Do NOT hardcode secrets, API keys, or DB connection strings in source files. Use .env + dotenv.

Do NOT scaffold deployment configs for Vercel, Netlify, Heroku, or Railway. Target is a DigitalOcean Ubuntu droplet with Nginx + PM2 only.

Do NOT generate placeholder/Lorem Ipsum content. Pull real bio/project data from docs/content.md.

Do NOT create additional admin users, roles, or permission tiers. Exactly one admin.

Do NOT install a CMS (Strapi, Sanity, WordPress). The blog is custom-built in this repo.

Do NOT change the folder structure defined below without asking first.

PROJECT OVERVIEW
Personal CV + Portfolio + Blog website for a full-stack developer (Java/Spring + MERN background).
Public pages: Home, About, Portfolio, Blog (list + single post), CV (embedded PDF viewer).
Private: Admin panel (single user) to create/edit/delete blog posts with a rich text editor and image upload.
Goal: professional, minimal, modern design. Ship fast, deploy to DigitalOcean same day.

TECH STACK
Frontend: React (Vite) + TailwindCSS

Rich text editor: Tiptap (preferred) or React-Quill

Backend: Node.js + Express

Database: MongoDB Atlas (Mongoose ODM)

Auth: JWT (access token in httpOnly cookie), bcrypt for password hashing

File uploads: Multer, stored in server/uploads/, served as static files

PDF viewing: native browser <iframe src="/cv.pdf">, no PDF.js library

Process manager: PM2

Web server / reverse proxy: Nginx

SSL: Let's Encrypt (Certbot), added after initial