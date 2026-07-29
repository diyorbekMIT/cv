const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const requireAuth = require('../middleware/auth.middleware');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowed.test(file.mimetype);
    if (extOk && mimeOk) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// GET /api/posts — public, list all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select('-content');
    return res.json(posts);
  } catch (error) {
    console.error('Fetch posts error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/posts/:id — public, single post by ID or slug
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let post = null;

    // Try by MongoDB ObjectId first, then by slug
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Post.findById(id);
    }
    if (!post) {
      post = await Post.findOne({ slug: id });
    }

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.json(post);
  } catch (error) {
    console.error('Fetch post error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/posts — protected, create post
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, excerpt, content, coverImage } = req.body;
    const post = await Post.create({ title, excerpt, content, coverImage });
    return res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/posts/:id — protected, update post
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { title, excerpt, content, coverImage } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (title !== undefined) post.title = title;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (content !== undefined) post.content = content;
    if (coverImage !== undefined) post.coverImage = coverImage;

    await post.save();
    return res.json(post);
  } catch (error) {
    console.error('Update post error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/posts/:id — protected, delete post
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Delete post error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/upload — protected, image upload
router.post('/upload', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const url = `/uploads/${req.file.filename}`;
    return res.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
