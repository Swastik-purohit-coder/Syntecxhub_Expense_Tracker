const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://syntecxhubexpensetracker-production.up.railway.app/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const googleId = profile.id;

        let user = await pool.query(
          "SELECT * FROM users WHERE google_id=$1",
          [googleId]
        );

        if (user.rows.length === 0) {
          user = await pool.query(
            "INSERT INTO users (google_id, name, email) VALUES ($1,$2,$3) RETURNING *",
            [googleId, name, email]
          );
        }

        return done(null, user.rows[0]);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  done(null, user.rows[0]);
});

module.exports = passport;