const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Connect to database (ensures pool is initialized)
const connectDB = require("./config/db");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/placements', require('./routes/placementRoutes'));
app.use('/api/internships', require('./routes/internshipRoutes'));
app.use('/api/research', require('./routes/researchRoutes'));
app.use('/api/alumni', require('./routes/alumniRoutes'));

app.get('/', (req, res) => {
  res.send('CSE Portal API is running...');
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
