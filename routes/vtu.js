const router = require("express").Router();
const axios = require("axios");

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");


// ================= BUY AIRTIME =================
router.post("/airtime", auth, async (req, res) => {
  try {
    const { network, phone, amount } = req.body;

    const user = await User.findById(req.user.id);

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // deduct wallet first
    user.balance -= Number(amount);
    await user.save();

    // SIMULATED VTU API (replace later with real provider like VTU.ng / Reloadly / Billstack)
    const response = await axios.post("https://api.fake-vtu.com/airtime", {
      network,
      phone,
      amount
    }).catch(() => null);

    if (!response) {
      return res.status(500).json({ message: "VTU service failed" });
    }

    await Transaction.create({
      userId: user._id,
      amount,
      type: "Airtime Purchase",
      status: "Success"
    });

    res.json({
      success: true,
      message: "Airtime purchased successfully",
      balance: user.balance
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= BUY DATA =================
router.post("/data", auth, async (req, res) => {
  try {
    const { network, plan, phone, amount } = req.body;

    const user = await User.findById(req.user.id);

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= Number(amount);
    await user.save();

    const response = await axios.post("https://api.fake-vtu.com/data", {
      network,
      plan,
      phone,
      amount
    }).catch(() => null);

    if (!response) {
      return res.status(500).json({ message: "Data service failed" });
    }

    await Transaction.create({
      userId: user._id,
      amount,
      type: "Data Purchase",
      status: "Success"
    });

    res.json({
      success: true,
      message: "Data purchased successfully",
      balance: user.balance
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
