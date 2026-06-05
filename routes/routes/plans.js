const router = require("express").Router();
const DataPlan = require("../models/DataPlan");

// GET ALL ACTIVE PLANS
router.get("/", async (req, res) => {
  try {
    const plans = await DataPlan.find({
      status: true
    });

    res.json({
      success: true,
      plans
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// CREATE PLAN
router.post("/create", async (req, res) => {
  try {
    const plan = await DataPlan.create(req.body);

    res.json({
      success: true,
      plan
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// UPDATE PLAN
router.put("/:id", async (req, res) => {
  try {
    const plan = await DataPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      plan
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// DELETE PLAN
router.delete("/:id", async (req, res) => {
  try {
    await DataPlan.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Plan deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
