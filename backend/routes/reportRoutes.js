const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  signaler,
  getMesSignalements,
  getTousSignalements,
  updateStatut,
  repondre,
  voter,
  getStatsSignalements,
} = require('../controllers/reportController');

router.post('/', protect, signaler);
router.get('/mes', protect, getMesSignalements);
router.get('/admin', protect, authorize('admin'), getTousSignalements);
router.get('/stats', protect, authorize('admin'), getStatsSignalements);
router.put('/:id/statut', protect, authorize('admin'), updateStatut);
router.put('/:id/repondre', protect, authorize('admin'), repondre);
router.post('/:id/voter', protect, voter);

module.exports = router;
