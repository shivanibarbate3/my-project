const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const router = express.Router();
const storage = multer.memoryStorage();
// Limit file size to 5MB for media uploads
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const upload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE } });

// POST /api/upload - form field 'file'
router.post('/api/upload', upload.single('file'), uploadController.uploadFile);

module.exports = router;
