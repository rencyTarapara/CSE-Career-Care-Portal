const Internship = require('../models/Internship');

// @route   GET /api/internships
// @desc    Get all internships
// @access  Private
exports.getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/internships
// @desc    Add a new internship
// @access  Private/Admin
exports.addInternship = async (req, res) => {
  const { type, company, stipend, duration, eligibility } = req.body;

  if (!type || !company || !stipend || !duration || !eligibility) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const newInternship = new Internship({
      type,
      company,
      stipend,
      duration,
      eligibility
    });

    const internship = await newInternship.save();

    res.status(201).json({
      message: 'Internship added successfully',
      id: internship._id
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/internships/:id
// @desc    Update an internship
// @access  Private/Admin
exports.updateInternship = async (req, res) => {
  const { type, company, stipend, duration, eligibility } = req.body;
  const internshipId = req.params.id;

  try {
    const internshipFields = {};
    if (type) internshipFields.type = type;
    if (company) internshipFields.company = company;
    if (stipend) internshipFields.stipend = stipend;
    if (duration) internshipFields.duration = duration;
    if (eligibility) internshipFields.eligibility = eligibility;

    let internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    internship = await Internship.findByIdAndUpdate(
      internshipId,
      { $set: internshipFields },
      { new: true }
    );

    res.json({ message: 'Internship updated successfully', internship });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/internships/:id
// @desc    Delete an internship
// @access  Private/Admin
exports.deleteInternship = async (req, res) => {
  const internshipId = req.params.id;

  try {
    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    await Internship.findByIdAndDelete(internshipId);

    res.json({ message: 'Internship deleted successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.status(500).send('Server error');
  }
};
