const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
  submitTest,
  getMyResults,
  getMyBadges,
} = require('../controllers/skillTestController');

// Public routes (for viewing available tests)
router.get('/', protect, getAllTests);
router.get('/results/mes', protect, authorize('candidat'), getMyResults);
router.get('/badges', protect, authorize('candidat'), getMyBadges);
router.get('/:id', protect, getTestById);

// Submit test answers
router.post('/:id/submit', protect, authorize('candidat'), submitTest);

// Admin only routes
router.post('/', protect, authorize('admin'), createTest);
router.put('/:id', protect, authorize('admin'), updateTest);
router.delete('/:id', protect, authorize('admin'), deleteTest);

module.exports = router;
