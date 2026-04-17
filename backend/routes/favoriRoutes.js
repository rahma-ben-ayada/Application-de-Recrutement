const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  ajouterFavori,
  getMesFavoris,
  updateFavori,
  deleteFavori,
  checkFavori,
  getFavorisParStatut,
  getRappels,
  getStatsFavoris,
} = require('../controllers/favoriController');

router.post('/', protect, authorize('candidat'), ajouterFavori);
router.get('/mes', protect, authorize('candidat'), getMesFavoris);
router.get('/check/:offreId', protect, authorize('candidat'), checkFavori);
router.get('/statut/:statut', protect, authorize('candidat'), getFavorisParStatut);
router.get('/rappels/a-venir', protect, authorize('candidat'), getRappels);
router.get('/stats', protect, authorize('candidat'), getStatsFavoris);
router.put('/:id', protect, authorize('candidat'), updateFavori);
router.delete('/:id', protect, authorize('candidat'), deleteFavori);

module.exports = router;
