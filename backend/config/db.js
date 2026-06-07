import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || '3306'),
  user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'railway',
  waitForConnections: true,
  connectionLimit: 10,
};

console.log(`DB connecting → host: ${dbConfig.host}, port: ${dbConfig.port}, db: ${dbConfig.database}`);

const pool = mysql.createPool(dbConfig);

export default pool;