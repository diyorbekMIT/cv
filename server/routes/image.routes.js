const express = require('express');
const mongoose = require('mongoose');
const Image = require('../models/Image');

const router = express.Router();

// GET /uploads/:id — serve an image stored in MongoDB
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // An id always maps to the same bytes, so this can be cached forever.
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    // Uploads are served from the same origin as the admin panel, so lock
    // them down — an SVG could otherwise carry script.
    res.set('Content-Security-Policy', "default-src 'none'");
    res.set('X-Content-Type-Options', 'nosniff');
    res.type(image.contentType);
    return res.send(image.data);
  } catch (error) {
    console.error('Image fetch error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
