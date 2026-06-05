const router = require("express").Router();

router.get("/users", (req, res) => {
  res.json({ message: "Admin Users Route" });
});

module.exports = router;
