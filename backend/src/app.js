require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db"); // import db
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const normalizeOrigin = (value = "") => value.trim().replace(/\/+$/, "");

const configuredFrontendOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URLS,
]
  .filter(Boolean)
  .flatMap((value) => value.split(","))
  .map(normalizeOrigin)
  .filter(Boolean);

const defaultFrontendOrigins = [
  "https://syntecxhub-expense-tracker-silk.vercel.app",
];

const isLocalOrigin = (origin) =>
  /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(normalizeOrigin(origin));

const allowedOrigins = new Set([
  ...defaultFrontendOrigins,
  ...configuredFrontendOrigins,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
].map(normalizeOrigin));

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests or same-origin requests without Origin header.
      if (!origin) {
        return callback(null, true);
      }

      const requestOrigin = normalizeOrigin(origin);

      if (allowedOrigins.has(requestOrigin) || isLocalOrigin(requestOrigin)) {
        return callback(null, true);
      }

      console.warn(`CORS blocked for origin: ${requestOrigin}`);
      return callback(null, false);
    },
    credentials: false,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
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