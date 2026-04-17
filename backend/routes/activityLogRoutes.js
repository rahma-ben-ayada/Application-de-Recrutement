const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createActivityLog,
  getMesActivityLogs,
  getActivityLogs,
  getStatsActivite,
} = require('../controllers/activityLogController');

router.post('/', protect, createActivityLog);
router.get('/mes', protect, getMesActivityLogs);
router.get('/utilisateur/:utilisateur/stats', protect, getStatsActivite);
router.get('/admin', protect, authorize('admin'), getActivityLogs);

module.exports = router;
