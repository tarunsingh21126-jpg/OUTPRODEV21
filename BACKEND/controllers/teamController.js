const Team = require('../models/Team');

exports.getTeamMembers = async (req, res) => {
  try {
    const { page = 1, limit = 10, featured } = req.query;
    const query = featured ? { isFeatured: true } : {};
    
    const members = await Team.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Team.countDocuments(query);

    res.json({
      members,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeamMemberById = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    const member = new Team(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
