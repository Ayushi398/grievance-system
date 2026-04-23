const express = require("express");
const router = express.Router();

// ✅ IMPORT MIDDLEWARE (ADD THIS LINE)
const auth = require("../middleware/authMiddleware");

// Controllers
const {
  createGrievance,
  getAllGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievance
} = require("../controllers/grievanceController");

// ✅ PROTECTED ROUTES (auth added here)
router.post("/grievances", auth, createGrievance);
router.get("/grievances", auth, getAllGrievances);
router.get("/grievances/search", auth, searchGrievance);
router.get("/grievances/:id", auth, getGrievanceById);
router.put("/grievances/:id", auth, updateGrievance);
router.delete("/grievances/:id", auth, deleteGrievance);

module.exports = router;