import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

let poolConfig;

if (process.env.DATABASE_URL) {
  console.log('DB connecting to PostgreSQL via connection string (parsed via WHATWG URL)...');
  const parsedUrl = new URL(process.env.DATABASE_URL);
  poolConfig = {
    host: parsedUrl.hostname,
    port: parsedUrl.port ? parseInt(parsedUrl.port) : 5432,
    user: parsedUrl.username,
    password: decodeURIComponent(parsedUrl.password),
    database: parsedUrl.pathname.slice(1), // Remove leading '/'
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  poolConfig = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "portfolio_db",
  };
  console.log(`DB connecting to PostgreSQL → host: ${poolConfig.host}, port: ${poolConfig.port}, db: ${poolConfig.database}`);
}

const pool = new Pool(poolConfig);

// Startup connection test
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.message);
  } else {
    console.log("Connected to PostgreSQL");
    release();
  }
});

export default pool;