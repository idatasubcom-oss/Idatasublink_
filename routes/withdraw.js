const router = require("express").Router();
const axios = require("axios");

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");


// ================= WITHDRAW TO BANK =================
router.post("/bank", auth, async (req, res) => {
  try {
    const { amount, bankCode, accountNumber, accountName } = req.body;

    const user = await User.findById(req.user.id);

    // check balance
    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // deduct first
    user.balance -= Number(amount);
    await user.save();

    // call Monnify disbursement API
    const response = await axios.post(
      `${process.env.MONNIFY_BASE_URL}/api/v2/disbursements/single`,
      {
        amount: Number(amount),
        reference: "WD_" + Date.now(),
        narration: "Wallet Withdrawal",
        destinationBankCode: bankCode,
        destinationAccountNumber: accountNumber,
        currency: "NGN",
        sourceAccountNumber: process.env.MONNIFY_WALLET_ACCOUNT
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json"
        }
      }
    ).catch(err => err.response);

    if (!response || response.status !== 200) {
      return res.status(500).json({ message: "Withdrawal failed" });
    }

    await Transaction.create({
      userId: user._id,
      amount,
      type: "Withdrawal",
      status: "Success"
    });

    res.json({
      success: true,
      message: "Withdrawal successful",
      balance: user.balance
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= GET BANK LIST =================
router.get("/banks", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.MONNIFY_BASE_URL}/api/v1/banks`
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
