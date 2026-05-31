const router = require("express").Router();
const axios = require("axios");

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { getMonnifyToken } = require("../utils/monnify");

// CREATE RESERVED ACCOUNT
router.post("/create-account", async (req, res) => {
  try {
    const { userId, fullname, email } = req.body;

    const token = await getMonnifyToken();

    const response = await axios.post(
      `${process.env.MONNIFY_BASE_URL}/api/v2/bank-transfer/reserved-accounts`,
      {
        accountReference: userId,
        accountName: fullname,
        currencyCode: "NGN",
        contractCode: process.env.MONNIFY_CONTRACT_CODE,
        customerEmail: email,
        customerName: fullname,
        getAllAvailableBanks: true
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// WEBHOOK
router.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    if (data.eventType === "SUCCESSFUL_TRANSACTION") {
      const payment = data.eventData;

      const user = await User.findById(payment.paymentReference);

      if (user) {
        user.balance += Number(payment.amountPaid);
        await user.save();

        await Transaction.create({
          userId: user._id,
          amount: payment.amountPaid,
          type: "Wallet Funding",
          status: "Success"
        });
      }
    }

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
