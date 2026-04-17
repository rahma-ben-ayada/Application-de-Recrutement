const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../controllers/documentController');
const {
  uploadDocument,
  getMesDocuments,
  updateDocument,
  deleteDocument,
  downloadDocument,
  getStatsDocuments,
} = require('../controllers/documentController');

router.post('/upload', protect, upload.single('document'), uploadDocument);
router.get('/mes', protect, getMesDocuments);
router.get('/stats', protect, getStatsDocuments);
router.get('/:id/download', protect, downloadDocument);
router.put('/:id', protect, updateDocument);
router.delete('/:id', protect, deleteDocument);

module.exports = router;
