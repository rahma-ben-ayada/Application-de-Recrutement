const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const {
  postuler,
  getMesCandidatures,
  getCandidaturesOffre,
  updateStatut,
  getAllCandidatures,
} = require('../controllers/candidatureController');

router.post('/',
  protect,
  authorize('candidat'),
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  postuler
);

router.get('/mes', protect, authorize('candidat'), getMesCandidatures);
router.get('/offre/:offreId', protect, authorize('recruteur'), getCandidaturesOffre);
router.put('/:id', protect, authorize('recruteur'), updateStatut);
router.get('/', protect, authorize('admin'), getAllCandidatures);

module.exports = router;