const dns = require("dns");
const { Pool } = require("pg");

const forcedFamily = Number(process.env.PG_FAMILY || 4);

const forcedLookup = (hostname, options, callback) => {
  dns.lookup(
    hostname,
    {
      family: forcedFamily,
      all: false,
      // Keep ordering deterministic when both records exist.
      verbatim: false,
    },
    callback
  );
};

// Some hosts (e.g. cloud runtimes) may resolve IPv6 first even when IPv6 egress is unavailable.
// Prefer IPv4 to avoid ENETUNREACH against Postgres endpoints that publish both A and AAAA records.
try {
  dns.setDefaultResultOrder(process.env.DNS_RESULT_ORDER || "ipv4first");
} catch (err) {
  console.warn("Unable to set DNS result order:", err.message);
}

const buildConnectionString = () => {
  const rawUrl = process.env.DATABASE_URL;

  if (!rawUrl) {
    return rawUrl;
  }

  try {
    const parsed = new URL(rawUrl);

    const forcedDbName = process.env.DB_NAME || process.env.PGDATABASE;
    if (forcedDbName) {
      parsed.pathname = `/${forcedDbName}`;
      return parsed.toString();
    }

    // Guard against a common typo that causes Postgres error 3D000.
    if (parsed.pathname === "/postgrescd") {
      parsed.pathname = "/postgres";
      console.warn(
        "DATABASE_URL database name 'postgrescd' detected. Auto-correcting to 'postgres'."
      );
    }

    return parsed.toString();
  } catch (error) {
    console.warn("Invalid DATABASE_URL format. Falling back to raw value.");
    return rawUrl;
  }
};

const pool = new Pool({
  connectionString: buildConnectionString(),
  connectionTimeoutMillis: Number(process.env.PG_CONNECTION_TIMEOUT_MS || 10000),
  family: forcedFamily,
  lookup: forcedLookup,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  amount NUMERIC,
  category VARCHAR(100),
  type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'expenses'
      AND column_name = 'user_id'
      AND data_type IN ('smallint', 'integer', 'bigint')
  ) THEN
    ALTER TABLE expenses DROP CONSTRAINT IF EXISTS expenses_user_id_fkey;
    ALTER TABLE expenses
      ALTER COLUMN user_id TYPE VARCHAR(255)
      USING user_id::text;
  END IF;
END $$;
`)
  .then(() => console.log("Tables created ✅"))
  .catch((err) =>
    console.log("DB Error ❌", {
      code: err.code,
      message: err.message,
    })
  );