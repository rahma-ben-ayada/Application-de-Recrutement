const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  creerSubscription,
  getMonSubscription,
  updateSubscription,
  annulerSubscription,
  verifierLimites,
  getPlans,
  creerPromotion,
  verifierPromotion,
} = require('../controllers/subscriptionController');

router.post('/', protect, creerSubscription);
router.get('/mon', protect, getMonSubscription);
router.get('/plans', getPlans);
router.get('/verifier-limites', protect, verifierLimites);
router.get('/verifier-promo', verifierPromotion);
router.put('/:id', protect, updateSubscription);
router.patch('/:id/annuler', protect, annulerSubscription);
router.post('/promos', protect, authorize('admin'), creerPromotion);

module.exports = router;
