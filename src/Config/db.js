const { Pool } = require("pg");
require("dotenv").config(); // โหลดข้อมูลจาก .env

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//ทดสอบการเชื่อมต่อจ้า
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.stack);
  } else {
    console.log("Connected to PostgreSQL");
  }
});

module.exports = pool;
