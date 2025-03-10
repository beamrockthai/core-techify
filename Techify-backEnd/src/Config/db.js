const { Sequelize } = require("sequelize");
require("dotenv").config(); // โหลดค่าจาก .env

let sequelize;

// ถ้ามี `DATABASE_URL` ให้ใช้กับ Railway (Production)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false, // ปิด log query
  });
} else {
  // ใช้ค่าที่ตั้งไว้ใน Local Development
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
