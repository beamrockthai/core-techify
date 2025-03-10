const { Sequelize } = require("sequelize");
require("dotenv").config(); // โหลดค่าจาก .env

let sequelize;

// ใช้ `DATABASE_URL` ถ้ามี (Production)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // รองรับ SSL ของ Railway
      },
    },
    logging: false, // ปิด log query
  });
} else {
  // ใช้ Local PostgreSQL สำหรับเครื่องตัวเอง (ไม่ได้ใช้ใน Railway)
  sequelize = new Sequelize(
    process.env.DB_NAME || "postgres",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      dialect: "postgres",
      logging: false,
    }
  );
}

// ทดสอบการเชื่อมต่อ
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected!");
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
  }
})();

module.exports = sequelize;
