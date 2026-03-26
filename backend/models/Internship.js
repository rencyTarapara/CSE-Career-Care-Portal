const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  type: { type: String, enum: ['winter', 'summer', 'mtech'], required: true },
  company: { type: String, required: true },
  stipend: { type: String, required: true },
  duration: { type: String, required: true },
  eligibility: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
