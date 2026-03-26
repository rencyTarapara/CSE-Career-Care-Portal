const express = require('express');
const router = express.Router();
const placementController = require('../controllers/placementController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// Base route: /api/placements

router.get('/', auth, placementController.getPlacements);
router.post('/', auth, role('admin', 'superadmin'), placementController.addPlacement);
router.put('/:id', auth, role('admin', 'superadmin'), placementController.updatePlacement);
router.delete('/:id', auth, role('admin', 'superadmin'), placementController.deletePlacement);

module.exports = router;
