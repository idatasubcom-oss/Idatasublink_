const router = require("express").Router();

router.post("/airtime", (req, res) => {
  res.json({ message: "Buy Airtime" });
});

router.post("/data", (req, res) => {
  res.json({ message: "Buy Data" });
});

module.exports = router;
