import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "portfolio_db",
    };

if (process.env.DATABASE_URL) {
  console.log('DB connecting to PostgreSQL via connection string...');
} else {
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