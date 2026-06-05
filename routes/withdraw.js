const router = require("express").Router();

router.post("/", (req, res) => {
  res.json({ message: "Withdraw Route" });
});

module.exports = router;
