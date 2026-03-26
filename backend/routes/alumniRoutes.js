const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// Base route: /api/alumni

router.get('/', auth, alumniController.getAlumni);
router.post('/', auth, role('admin', 'superadmin'), alumniController.addAlumni);
router.put('/:id', auth, role('admin', 'superadmin'), alumniController.updateAlumni);
router.delete('/:id', auth, role('admin', 'superadmin'), alumniController.deleteAlumni);

module.exports = router;
