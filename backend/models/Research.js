const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  professor_name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Research', researchSchema);
