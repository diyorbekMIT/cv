require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const sitemapRoutes = require('./routes/sitemap.routes');
const imageRoutes = require('./routes/image.routes');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Heroku terminates TLS at its router and forwards plain HTTP to the dyno,
// so the proxy headers have to be trusted for req.secure to be accurate.
app.set('trust proxy', 1);

// Force HTTPS in production so the custom domain never answers over plain HTTP
if (isProduction) {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') === 'http') {
      return res.redirect(301, `https://${req.header('host')}${req.originalUrl}`);
    }
    next();
  });
}

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

// Uploaded images. Files on disk win (legacy local-dev uploads), and anything
// not found there falls through to the copies stored in MongoDB.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', imageRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', sitemapRoutes);
// robots.txt advertises /sitemap.xml, so serve it at the root too
app.use('/', sitemapRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve the built React app from the same dyno, so the app is single-origin
// and the httpOnly auth cookie works without any cross-site relaxation.
if (isProduction) {
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientDist));

  // SPA fallback — client-side routes render index.html, but unmatched API
  // paths fall through so they still return a JSON 404 rather than HTML.
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Start server — listen immediately, connect DB in background
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB();
