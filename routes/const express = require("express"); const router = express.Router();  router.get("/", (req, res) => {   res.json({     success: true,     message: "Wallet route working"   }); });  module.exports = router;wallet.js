const express = require("express");
const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Wallet route working"
  });
});

module.exports = router;
