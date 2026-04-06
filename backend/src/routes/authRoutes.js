const router = require("express").Router();

router.get("/user", (req, res) => {
  res.json({ id: 1, mode: "guest" });
});

router.get("/status", (req, res) => {
  res.json({
    configured: true,
    authenticated: true,
    userId: 1,
    mode: "guest",
  });
});

module.exports = router;