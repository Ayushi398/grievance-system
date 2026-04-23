const Grievance = require("../models/Grievance");

// CREATE grievance
exports.createGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.create(req.body);
    res.status(201).json(grievance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all grievances
exports.getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET by ID
exports.getGrievanceById = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);
    res.json(grievance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE grievance
exports.updateGrievance = async (req, res) => {
  try {
    const updated = await Grievance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE grievance
exports.deleteGrievance = async (req, res) => {
  try {
    await Grievance.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SEARCH grievance by title
exports.searchGrievance = async (req, res) => {
  try {
    const { title } = req.query;
    const results = await Grievance.find({
      title: { $regex: title, $options: "i" }
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};