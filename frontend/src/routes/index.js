const express = require('express');
const router = express.Router();
const path = require('path');

// Home route - serves index.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Example route
router.get('/about', (req, res) => {
  res.send('About Page');
});

// Example JSON route
router.get('/api', (req, res) => {
  res.json({ message: "API is working" });
});

module.exports = router;
