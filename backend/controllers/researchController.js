const Research = require('../models/Research');

// @route   GET /api/research
// @desc    Get all research projects
// @access  Private
exports.getResearch = async (req, res) => {
  try {
    const researchProjects = await Research.find().sort({ createdAt: -1 });
    res.json(researchProjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/research
// @desc    Add a new research project
// @access  Private/Admin
exports.addResearch = async (req, res) => {
  const { topic, professor_name, email, status } = req.body;

  if (!topic || !professor_name || !email || !status) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const newResearch = new Research({
      topic,
      professor_name,
      email,
      status
    });

    const research = await newResearch.save();

    res.status(201).json({
      message: 'Research project added successfully',
      id: research._id
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/research/:id
// @desc    Update a research project
// @access  Private/Admin
exports.updateResearch = async (req, res) => {
  const { topic, professor_name, email, status } = req.body;
  const researchId = req.params.id;

  try {
    const researchFields = {};
    if (topic) researchFields.topic = topic;
    if (professor_name) researchFields.professor_name = professor_name;
    if (email) researchFields.email = email;
    if (status) researchFields.status = status;

    let research = await Research.findById(researchId);

    if (!research) {
      return res.status(404).json({ message: 'Research project not found' });
    }

    research = await Research.findByIdAndUpdate(
      researchId,
      { $set: researchFields },
      { new: true }
    );

    res.json({ message: 'Research project updated successfully', research });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Research project not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/research/:id
// @desc    Delete a research project
// @access  Private/Admin
exports.deleteResearch = async (req, res) => {
  const researchId = req.params.id;

  try {
    const research = await Research.findById(researchId);

    if (!research) {
      return res.status(404).json({ message: 'Research project not found' });
    }

    await Research.findByIdAndDelete(researchId);

    res.json({ message: 'Research project deleted successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Research project not found' });
    }
    res.status(500).send('Server error');
  }
};
