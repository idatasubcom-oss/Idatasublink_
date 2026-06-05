const router = require("express").Router();

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const DataPlan = require("../models/DataPlan");

// BUY DATA
router.post("/buy-data", async (req, res) => {
  try {
    const { userId, planId, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const plan = await DataPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Data plan not found"
      });
    }

    if (user.balance < plan.userPrice) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance"
      });
    }

    // Deduct balance
    user.balance -= plan.userPrice;
    await user.save();

    // Save transaction
    await Transaction.create({
      userId: user._id,
      amount: plan.userPrice,
      type: `Data Purchase (${plan.plan})`,
      status: "Success"
    });

    res.json({
      success: true,
      message: "Data purchase successful",
      phone,
      plan: plan.plan,
      amount: plan.userPrice,
      balance: user.balance
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// BUY AIRTIME
router.post("/airtime", async (req, res) => {
  res.json({
    success: true,
    message: "Airtime endpoint ready"
  });
});

module.exports = router;
