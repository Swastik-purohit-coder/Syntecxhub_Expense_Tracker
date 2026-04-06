require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
const pool = require("./config/db"); // import db
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const frontendUrl =
  process.env.FRONTEND_URL ||
  "https://syntecxhub-expense-tracker-silk.vercel.app";

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: isProduction,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/expenses", expenseRoutes);

// TEST DB CONNECTION
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "DB Error",
      code: err.code || null,
      message:
        process.env.NODE_ENV === "production"
          ? "Database connection failed"
          : err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});