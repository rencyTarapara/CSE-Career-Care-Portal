const Alumni = require('../models/Alumni');

// @route   GET /api/alumni
// @desc    Get all alumni (with filters: company, location, year)
// @access  Private
exports.getAlumni = async (req, res) => {
  try {
    const { company, location, passout_year } = req.query;
    let query = {};

    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (passout_year) {
      query.passout_year = passout_year;
    }

    const alumni = await Alumni.find(query).sort({ passout_year: -1 });
    res.json(alumni);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/alumni
// @desc    Add a new alumni record
// @access  Private/Admin
exports.addAlumni = async (req, res) => {
  const { name, company, location, contact, email, linkedin, passout_year } = req.body;

  if (!name || !company || !location || !email || !passout_year) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newAlumni = new Alumni({
      name,
      company,
      location,
      contact,
      email,
      linkedin,
      passout_year
    });

    const alumni = await newAlumni.save();

    res.status(201).json({
      message: 'Alumni record added successfully',
      id: alumni._id
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/alumni/:id
// @desc    Update an alumni record
// @access  Private/Admin
exports.updateAlumni = async (req, res) => {
  const { name, company, location, contact, email, linkedin, passout_year } = req.body;
  const alumniId = req.params.id;

  try {
    const alumniFields = {};
    if (name) alumniFields.name = name;
    if (company) alumniFields.company = company;
    if (location) alumniFields.location = location;
    if (contact) alumniFields.contact = contact;
    if (email) alumniFields.email = email;
    if (linkedin) alumniFields.linkedin = linkedin;
    if (passout_year) alumniFields.passout_year = passout_year;

    let alumni = await Alumni.findById(alumniId);

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni record not found' });
    }

    alumni = await Alumni.findByIdAndUpdate(
      alumniId,
      { $set: alumniFields },
      { new: true }
    );

    res.json({ message: 'Alumni record updated successfully', alumni });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Alumni record not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/alumni/:id
// @desc    Delete an alumni record
// @access  Private/Admin
exports.deleteAlumni = async (req, res) => {
  const alumniId = req.params.id;

  try {
    const alumni = await Alumni.findById(alumniId);

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni record not found' });
    }

    await Alumni.findByIdAndDelete(alumniId);

    res.json({ message: 'Alumni record deleted successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Alumni record not found' });
    }
    res.status(500).send('Server error');
  }
};
