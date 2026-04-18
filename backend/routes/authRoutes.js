const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { register, login, getProfil, updateProfil, adminLogin, googleAuthCallback } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { adminLoginRateLimit, recordFailedAttempt } = require('../middleware/adminSecurityMiddleware');
const upload = require('../middleware/upload');
const User = require('../models/User');

// ===== GOOGLE OAUTH ROUTES =====
// @route   GET /api/auth/google
// @desc    Initiate Google OAuth (for login)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed` }),
  googleAuthCallback
);

// Regular auth routes
router.post('/register', register);
router.post('/login', login);

// Admin login with enhanced security
router.post('/admin/login', adminLoginRateLimit, recordFailedAttempt, adminLogin);

router.get('/profil', protect, getProfil);
router.put('/profil', protect, updateProfil);
router.post('/upload-cv', protect, upload.single('cv'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { cv: req.file.path, cvNom: req.file.originalname },
      { new: true }
    );
    res.json({ success: true, message: 'CV uploadé ✅', user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;