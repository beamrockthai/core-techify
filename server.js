//คําอธิบายเพิ่มเติม
// Middleware สำหรับ JSON
// app.use(express.json());
// Middleware สำหรับข้อมูลที่ส่งผ่าน URL-encoded
// app.use(express.urlencoded({ extended: true }));
//use morgan // use cors // use bodyParser

require("dotenv").config(); // ใช้ dotenv เพื่อโหลดค่าจาก .env
const express = require("express");
const morgan = require("morgan"); //ไว้ใช้สําหรับการ log ข้อมูล ใน console
const cors = require("cors");
const bodyParser = require("body-parser"); //ไว้ใช้สําหรับส่ง body ให้หน้าบ้าน

//import router มาใช้
const test = require("./src/Test/Router/test");
const auth = require("./src/Test/Router/auth");

//เรียกใช้ pg
const { Pool } = require("pg");

//เรียกใช้ express
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

//this is route test เอาไว้ดึง endpoint ที่สร้างขึ้นมาใหม่ จาก router
app.use("/api", test);
app.use("/api", auth);

//เชื่อมต่อกับฐานข้อมูล โดยใช้ Pool จาก pg
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//npm run dev ใช้รัน server
