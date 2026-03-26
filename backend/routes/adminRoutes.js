const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// @route   POST /api/admin/add-student
// @desc    Add a new student (Admin only)
// @access  Private/Admin
router.post('/add-student', auth, role('admin', 'superadmin'), adminController.addStudent);

module.exports = router;
