const router = require("express").Router();
const passport = require("passport");

const frontendUrl =
  process.env.FRONTEND_URL ||
  "https://syntecxhub-expense-tracker-silk.vercel.app";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, user) => {
      if (err) {
        console.error("Google callback error:", err);
        return res.redirect(`${frontendUrl}/?error=oauth_callback_failed`);
      }

      if (!user) {
        return res.redirect(`${frontendUrl}/?error=auth_failed`);
      }

      req.logIn(user, (loginErr) => {
        if (loginErr) {
          console.error("Session login error:", loginErr);
          return res.redirect(`${frontendUrl}/?error=session_failed`);
        }

        return res.redirect(`${frontendUrl}/dashboard`);
      });
    })(req, res, next);
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