const pool = require("../config/db");

let guestUserId = null;

module.exports = async (req, res, next) => {
  try {
    if (!guestUserId) {
      const existing = await pool.query("SELECT id FROM users ORDER BY id ASC LIMIT 1");

      if (existing.rows.length > 0) {
        guestUserId = existing.rows[0].id;
      } else {
        const created = await pool.query(
          "INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3) RETURNING id",
          ["guest-local", "Guest User", "guest@example.local"]
        );
        guestUserId = created.rows[0].id;
      }
    }

    req.user = { id: guestUserId };
    return next();
  } catch (err) {
    console.error("Guest auth middleware error:", err);
    return res.status(500).json({ message: "Failed to initialize guest user" });
  }
};