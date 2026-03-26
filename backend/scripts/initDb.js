const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const initDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cse_portal');
    console.log(`MongoDB Database initialized successfully: ${conn.connection.host}`);
    console.log('Mongoose automatically creates collections upon data insertion, no explicit table creation needed.');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  }
};

initDb();
