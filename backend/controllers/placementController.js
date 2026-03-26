const Placement = require('../models/Placement');

// @route   GET /api/placements
// @desc    Get all placements
// @access  Private (All authenticated users)
exports.getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ date: -1 });
    res.json(placements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/placements
// @desc    Add a new placement
// @access  Private/Admin
exports.addPlacement = async (req, res) => {
  const { company_name, position, eligibility, salary, date } = req.body;

  if (!company_name || !position || !eligibility || !salary || !date) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const newPlacement = new Placement({
      company_name,
      position,
      eligibility,
      salary,
      date
    });

    const placement = await newPlacement.save();

    res.status(201).json({
      message: 'Placement added successfully',
      id: placement._id
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/placements/:id
// @desc    Update a placement
// @access  Private/Admin
exports.updatePlacement = async (req, res) => {
  const { company_name, position, eligibility, salary, date } = req.body;
  const placementId = req.params.id;

  try {
    const placementFields = {};
    if (company_name) placementFields.company_name = company_name;
    if (position) placementFields.position = position;
    if (eligibility) placementFields.eligibility = eligibility;
    if (salary) placementFields.salary = salary;
    if (date) placementFields.date = date;

    let placement = await Placement.findById(placementId);

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    placement = await Placement.findByIdAndUpdate(
      placementId,
      { $set: placementFields },
      { new: true }
    );

    res.json({ message: 'Placement updated successfully', placement });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Placement not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/placements/:id
// @desc    Delete a placement
// @access  Private/Admin
exports.deletePlacement = async (req, res) => {
  const placementId = req.params.id;

  try {
    const placement = await Placement.findById(placementId);

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    await Placement.findByIdAndDelete(placementId);

    res.json({ message: 'Placement deleted successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Placement not found' });
    }
    res.status(500).send('Server error');
  }
};
