const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// GET /api/offres - Toutes les offres (public)
router.get('/', async (req, res) => {
  res.json({ success: true, message: 'Route offres fonctionne !' });
});

module.exports = router;