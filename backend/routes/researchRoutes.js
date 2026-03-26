const express = require('express');
const router = express.Router();
const researchController = require('../controllers/researchController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// Base route: /api/research

router.get('/', auth, researchController.getResearch);
router.post('/', auth, role('admin', 'superadmin'), researchController.addResearch);
router.put('/:id', auth, role('admin', 'superadmin'), researchController.updateResearch);
router.delete('/:id', auth, role('admin', 'superadmin'), researchController.deleteResearch);

module.exports = router;
