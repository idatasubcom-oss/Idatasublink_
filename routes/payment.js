const router = require("express").Router();

router.post("/fund", (req, res) => {
  res.json({ message: "Payment Route" });
});

module.exports = router;
