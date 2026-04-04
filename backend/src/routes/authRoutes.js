const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // default session cookie
      res.json({ message: "Logged out" });
    });
  });
});

router.get("/user", (req, res) => {
  res.json(req.user || null);
});

module.exports = router;