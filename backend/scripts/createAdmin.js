const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const createAdmin = async () => {
  const adminName = process.argv[2] || 'Admin';
  const adminEmail = process.argv[3] || 'admin@cse.portal';
  const adminPassword = process.argv[4] || 'admin123';

  if (!adminName || !adminEmail || !adminPassword) {
    console.log('Usage: node createAdmin.js <name> <email> <password>');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cse_portal');
    console.log('MongoDB connected for script.');

    console.log(`Checking if user ${adminEmail} already exists...`);
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (existingUser) {
      console.log('Admin user with this email already exists.');
      process.exit(0);
    }

    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    console.log('Inserting admin into database...');
    const admin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();

    console.log(`Admin ${adminEmail} created successfully.`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
