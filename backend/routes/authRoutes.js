const express = require('express');
const router = express.Router();
const { register, login, getProfil, updateProfil } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);
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