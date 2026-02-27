const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  suspendUser,
  activateUser,
  verifyRecruteur,
  deleteUser,
  updateProfil,
  changePassword,
  getStats,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// ===== ADMIN uniquement =====
router.get('/',              protect, authorize('admin'), getAllUsers);
router.get('/stats',         protect, authorize('admin'), getStats);
router.put('/:id/suspend',   protect, authorize('admin'), suspendUser);
router.put('/:id/activate',  protect, authorize('admin'), activateUser);
router.put('/:id/verify',    protect, authorize('admin'), verifyRecruteur);
router.delete('/:id',        protect, authorize('admin'), deleteUser);

// ===== Utilisateur connecté =====
router.put('/profil',          protect, updateProfil);
router.put('/change-password', protect, changePassword);

module.exports = router;