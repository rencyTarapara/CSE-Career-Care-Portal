const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String },
  email: { type: String, required: true },
  linkedin: { type: String },
  passout_year: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);
