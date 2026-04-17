const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  creerNotification,
  getMesNotifications,
  marquerCommeLu,
  marquerToutesCommeLues,
  deleteNotification,
  nettoyerNotifications,
  getStatsNotifications,
} = require('../controllers/notificationController');

router.post('/', protect, creerNotification);
router.get('/mes', protect, getMesNotifications);
router.get('/stats', protect, getStatsNotifications);
router.put('/:id/lu', protect, marquerCommeLu);
router.put('/tout-lu', protect, marquerToutesCommeLues);
router.delete('/nettoyer', protect, nettoyerNotifications);
router.delete('/:id', protect, deleteNotification);

module.exports = router;
