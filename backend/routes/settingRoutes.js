const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getMesSettings,
  updateSettings,
  updateNotifications,
  updatePrive,
  updateIntegrations,
  resetSettings,
} = require('../controllers/settingController');

router.get('/mes', protect, getMesSettings);
router.put('/mes', protect, updateSettings);
router.put('/notifications', protect, updateNotifications);
router.put('/prive', protect, updatePrive);
router.put('/integrations', protect, updateIntegrations);
router.post('/reset', protect, resetSettings);

module.exports = router;
