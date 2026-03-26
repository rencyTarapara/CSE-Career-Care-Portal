const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route   POST /api/admin/add-student
// @desc    Add a new student (Admin only)
// @access  Private/Admin
exports.addStudent = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'student'
    });

    await user.save();

    res.status(201).json({
      message: 'Student created successfully',
      student: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
