const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getPendingUsers,
  validateUser,
  rejectUser,
  suspendUser,
  activateUser,
  deleteUser,
  addUser,
  updateProfil,
  changePassword,
  getStats,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// ===== ADMIN uniquement =====
router.get('/',                  protect, authorize('admin'), getAllUsers);
router.get('/pending',           protect, authorize('admin'), getPendingUsers);
router.get('/stats',             protect, authorize('admin'), getStats);
router.post('/',                 protect, authorize('admin'), addUser);
router.put('/:id/validate',      protect, authorize('admin'), validateUser);
router.put('/:id/reject',        protect, authorize('admin'), rejectUser);
router.put('/:id/suspend',       protect, authorize('admin'), suspendUser);
router.put('/:id/activate',      protect, authorize('admin'), activateUser);
router.delete('/:id',            protect, authorize('admin'), deleteUser);

// ===== Utilisateur connecté =====
router.put('/profil',            protect, updateProfil);
router.put('/change-password',   protect, changePassword);

module.exports = router;