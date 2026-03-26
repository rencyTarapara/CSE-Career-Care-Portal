const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  position: { type: String, required: true },
  eligibility: { type: String, required: true },
  salary: { type: String, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Placement', placementSchema);
