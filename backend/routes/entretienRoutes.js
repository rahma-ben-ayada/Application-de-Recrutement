const express = require('express');
const router = express.Router();
const {
  creerEntretien,
  getMesEntretiens,
  getMesEntretiensCandidat,
  modifierEntretien,
  supprimerEntretien,
  getStatsEntretiens,
  getAllEntretiens,
} = require('../controllers/entretienController');
const { protect, authorize } = require('../middleware/authMiddleware');

// ===== RECRUTEUR =====
router.post('/', protect, authorize('recruteur'), creerEntretien);
router.get('/mes', protect, authorize('recruteur'), getMesEntretiens);
router.get('/stats', protect, authorize('recruteur'), getStatsEntretiens);
router.put('/:id', protect, authorize('recruteur'), modifierEntretien);
router.delete('/:id', protect, authorize('recruteur'), supprimerEntretien);

// ===== CANDIDAT =====
router.get('/candidat/mes', protect, authorize('candidat'), getMesEntretiensCandidat);

// ===== ADMIN =====
router.get('/all', protect, authorize('admin'), getAllEntretiens);

module.exports = router;
