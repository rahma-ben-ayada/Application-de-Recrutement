const express = require('express');
const router = express.Router();
const {
  getOffres,
  getOffreById,
  creerOffre,
  getMesOffres,
  modifierOffre,
  supprimerOffre,
  getAllOffres,
  getStatsRecruteur,
} = require('../controllers/offreController');
const { protect, authorize } = require('../middleware/authMiddleware');

// ===== PUBLIC =====
router.get('/', getOffres);

// ===== ADMIN =====
router.get('/all', protect, authorize('admin'), getAllOffres);

// ===== RECRUTEUR =====
router.post('/',          protect, authorize('recruteur'), creerOffre);
router.get('/mes',        protect, authorize('recruteur'), getMesOffres);
router.get('/stats',      protect, authorize('recruteur'), getStatsRecruteur);
router.put('/:id',        protect, authorize('recruteur'), modifierOffre);
router.delete('/:id',     protect, authorize('recruteur'), supprimerOffre);

// ===== PUBLIC (specific offre - must be last) =====
router.get('/:id', getOffreById);

module.exports = router;