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

const app = express(); //เรียกใช้ express

//import router มาใช้
const test = require("./src/Test/Router/test");
const auth = require("./src/Test/Router/auth");
const Job = require("./src/Jop/Routes/job.routes");
const User = require("./src/User/Routes/user.routes");
const JwtAuth = require("./src/User/Routes/jwt.routes");

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

//this is route test เอาไว้ดึง endpoint ที่สร้างขึ้นมาใหม่ จาก router
app.use("/api", test);
app.use("/api", auth);

//feture main route
app.use("/api", Job);
app.use("/api", User);

//JwtAuth
app.use("/api", JwtAuth);

module.exports = app;
