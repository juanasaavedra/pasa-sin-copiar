const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

// Get all guides
router.get('/', guideController.getAllGuides.bind(guideController));

// Get a single guide
router.get('/:id', guideController.getGuide.bind(guideController));

// Get guide preview
router.get('/:id/preview', guideController.getPreview.bind(guideController));

// Download a guide
router.get('/:id/download', guideController.downloadGuide.bind(guideController));

// Create a new guide (admin)
router.post('/', guideController.createGuide.bind(guideController));

// Update a guide (admin)
router.put('/:id', guideController.updateGuide.bind(guideController));

// Delete a guide (admin)
router.delete('/:id', guideController.deleteGuide.bind(guideController));

// Purchase a guide
router.post('/purchase', guideController.purchaseGuide.bind(guideController));

// Get all purchases (admin)
router.get('/purchases/all', guideController.getAllPurchases.bind(guideController));

module.exports = router;
