const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getFeaturedArticles,
  likeArticle,
  getAllArticles,
  getCategories,
} = require('../controllers/articleController');
const { protect, authorize } = require('../middleware/authMiddleware');

// ===== PUBLIC =====
router.get('/', getArticles);
router.get('/featured', getFeaturedArticles);
router.get('/categories', getCategories);
router.get('/:id', getArticleById);
router.post('/:id/like', likeArticle);

// ===== ADMIN =====
router.get('/all/admin', protect, authorize('admin'), getAllArticles);
router.post('/', protect, authorize('admin'), createArticle);
router.put('/:id', protect, authorize('admin'), updateArticle);
router.delete('/:id', protect, authorize('admin'), deleteArticle);

module.exports = router;
