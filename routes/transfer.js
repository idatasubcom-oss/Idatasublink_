const router = require("express").Router();

router.post("/send", (req, res) => {
  res.json({ message: "Transfer Route" });
});

module.exports = router;
