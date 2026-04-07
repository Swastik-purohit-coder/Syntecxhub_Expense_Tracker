const dns = require("dns");
const net = require("net");
const { Pool } = require("pg");

const forcedFamily = Number(process.env.PG_FAMILY || 4);
const connectionTimeoutMillis = Number(process.env.PG_CONNECTION_TIMEOUT_MS || 10000);
const isIpAddress = (value = "") => net.isIP(value) !== 0;
const uniqueValues = (values = []) => [...new Set(values.filter(Boolean))];

console.log("DB URL:", process.env.DATABASE_URL);

// Some hosts (e.g. cloud runtimes) may resolve IPv6 first even when IPv6 egress is unavailable.
// Prefer IPv4 to avoid ENETUNREACH against Postgres endpoints that publish both A and AAAA records.
try {
  dns.setDefaultResultOrder(process.env.DNS_RESULT_ORDER || "ipv4first");
} catch (err) {
  console.warn("Unable to set DNS result order:", err.message);
}

const buildConnectionString = () => {
  const rawUrl = process.env.DATABASE_URL_IPV4 || process.env.DATABASE_URL;

  if (!rawUrl) {
    return rawUrl;
  }

  try {
    const parsed = new URL(rawUrl);

    const forcedHost = process.env.PGHOST_OVERRIDE || process.env.DB_HOST_OVERRIDE;
    if (forcedHost) {
      parsed.hostname = forcedHost;
    }

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

const resolveHostCandidates = async (hostname) => {
  if (!hostname || isIpAddress(hostname)) {
    return [hostname];
  }

  const candidates = [];

  try {
    const { address } = await dns.promises.lookup(hostname, {
      family: forcedFamily,
      all: false,
    });

    candidates.push(address);
  } catch (err) {
    console.warn(`DNS lookup failed for ${hostname}: ${err.message}`);
  }

  try {
    const addresses = await dns.promises.resolve4(hostname);
    candidates.push(...addresses);
  } catch (err) {
    console.warn(`DNS resolve4 failed for ${hostname}: ${err.message}`);
  }

  const resolved = uniqueValues(candidates);
  if (resolved.length > 0) {
    return resolved;
  }

  console.warn(`Falling back to unresolved hostname: ${hostname}`);
  return [hostname];
};

const createPool = async () => {
  const connectionString = buildConnectionString();

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  const parsed = new URL(connectionString);
  const tlsServerName = isIpAddress(parsed.hostname) ? undefined : parsed.hostname;
  const hostCandidates = await resolveHostCandidates(parsed.hostname);
  let lastError;

  for (const hostCandidate of hostCandidates) {
    const pool = new Pool({
      connectionString,
      host: hostCandidate,
      connectionTimeoutMillis,
      ssl: {
        rejectUnauthorized: false,
        ...(tlsServerName ? { servername: tlsServerName } : {}),
      },
    });

    try {
      await pool.query("SELECT 1");

      if (hostCandidate !== parsed.hostname) {
        console.log(`Database connected using host ${hostCandidate}`);
      }

      return pool;
    } catch (err) {
      lastError = err;
      console.warn(
        `Database connection failed for host ${hostCandidate}: ${err.code || err.message}`
      );

      try {
        await pool.end();
      } catch (endErr) {
        console.warn(`Pool cleanup failed for host ${hostCandidate}: ${endErr.message}`);
      }
    }
  }

  throw lastError || new Error("Unable to establish database connection");
};

let poolPromise;

const getPool = async () => {
  if (!poolPromise) {
    poolPromise = createPool().catch((err) => {
      poolPromise = null;
      throw err;
    });
  }

  return poolPromise;
};

const db = {
  async query(...args) {
    const pool = await getPool();
    return pool.query(...args);
  },
  async end() {
    const pool = await getPool();
    return pool.end();
  },
};

module.exports = db;

db.query(`
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