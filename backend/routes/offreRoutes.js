const express = require('express');
const router = express.Router();
const {
  getOffres,
  creerOffre,
  getMesOffres,
  modifierOffre,
  supprimerOffre,
  getAllOffres,
} = require('../controllers/offreController');
const { protect, authorize } = require('../middleware/authMiddleware');

// ===== PUBLIC =====
router.get('/', getOffres);

// ===== ADMIN =====
router.get('/all', protect, authorize('admin'), getAllOffres);

// ===== RECRUTEUR =====
router.post('/',        protect, authorize('recruteur'), creerOffre);
router.get('/mes',      protect, authorize('recruteur'), getMesOffres);
router.put('/:id',      protect, authorize('recruteur'), modifierOffre);
router.delete('/:id',   protect, authorize('recruteur'), supprimerOffre);

module.exports = router;