const router = require("express").Router();

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");


// ================= USER TO USER TRANSFER =================
router.post("/send", auth, async (req, res) => {
  try {
    const { receiverEmail, amount } = req.body;

    if (!receiverEmail || !amount) {
      return res.status(400).json({
        message: "receiverEmail and amount are required"
      });
    }

    const sender = await User.findById(req.user.id);
    const receiver = await User.findOne({ email: receiverEmail });

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (sender.email === receiverEmail) {
      return res.status(400).json({ message: "You cannot send money to yourself" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // ================= DEDUCT FROM SENDER =================
    sender.balance -= Number(amount);

    // ================= ADD TO RECEIVER =================
    receiver.balance += Number(amount);

    await sender.save();
    await receiver.save();

    // ================= TRANSACTIONS LOG =================
    await Transaction.create([
      {
        userId: sender._id,
        amount,
        type: "Transfer Sent",
        status: "Success"
      },
      {
        userId: receiver._id,
        amount,
        type: "Transfer Received",
        status: "Success"
      }
    ]);

    res.json({
      success: true,
      message: "Transfer successful",
      senderBalance: sender.balance
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
