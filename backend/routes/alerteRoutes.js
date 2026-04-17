const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  creerAlerte,
  getMesAlertes,
  updateAlerte,
  deleteAlerte,
  toggleAlerte,
  checkerAlertes,
  getStatsAlertes,
} = require('../controllers/alerteController');

router.post('/', protect, authorize('candidat'), creerAlerte);
router.get('/mes', protect, authorize('candidat'), getMesAlertes);
router.get('/check', protect, authorize('candidat'), checkerAlertes);
router.get('/stats', protect, authorize('candidat'), getStatsAlertes);
router.put('/:id', protect, authorize('candidat'), updateAlerte);
router.patch('/:id/toggle', protect, authorize('candidat'), toggleAlerte);
router.delete('/:id', protect, authorize('candidat'), deleteAlerte);

module.exports = router;
