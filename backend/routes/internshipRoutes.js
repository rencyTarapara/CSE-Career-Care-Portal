const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// Base route: /api/internships

router.get('/', auth, internshipController.getInternships);
router.post('/', auth, role('admin', 'superadmin'), internshipController.addInternship);
router.put('/:id', auth, role('admin', 'superadmin'), internshipController.updateInternship);
router.delete('/:id', auth, role('admin', 'superadmin'), internshipController.deleteInternship);

module.exports = router;
