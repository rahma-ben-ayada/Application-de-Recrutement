const express = require('express');
const router = express.Router();
const { register, login, getProfil } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/profil
router.get('/profil', protect, getProfil);

module.exports = router;