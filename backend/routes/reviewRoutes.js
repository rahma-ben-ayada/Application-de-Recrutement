const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  creerReview,
  getReviewsEntreprise,
  getMesReviews,
  updateReview,
  deleteReview,
  likeReview,
  repondreReview,
  getTopEntreprises,
} = require('../controllers/reviewController');

router.post('/', protect, authorize('candidat'), creerReview);
router.get('/mes', protect, authorize('candidat'), getMesReviews);
router.get('/entreprise/:entrepriseId', getReviewsEntreprise);
router.get('/top', getTopEntreprises);
router.put('/:id', protect, updateReview);
router.patch('/:id/like', protect, likeReview);
router.patch('/:id/reponse', protect, authorize('recruteur'), repondreReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
