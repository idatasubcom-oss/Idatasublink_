const router = require("express").Router();
const User = require("../models/User");

// ================= GET ALL USERS (ADMIN) =================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
