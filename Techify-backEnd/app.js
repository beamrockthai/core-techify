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
const session = require("express-session");

const app = express(); //เรียกใช้ express

//import router มาใช้
const test = require("./src/Test/Router/test");
const auth = require("./src/Test/Router/auth");
const Job = require("./src/Jop/Routes/job.routes");
const User = require("./src/User/Routes/user.routes");
const JwtAuth = require("./src/User/Routes/jwt.routes");
const Admin = require("./src/User/Routes/admin.routes");
const EmployeeRoutes = require("./src/EmployeeRe/Routes/Employee.routes");

const path = require("path");

// Import LINE Authentication
const passport = require("./src/Config/passport");
const authRoutes = require("./src/User/Routes/jwt.routes"); // Import LINE Auth Routes

// JSON Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// ใช้ express-session สำหรับ OAuth
app.use(
  session({
    secret: process.env.JWT_SECRET, // ใช้ secret key เดียวกับ JWT
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//this is route test เอาไว้ดึง endpoint ที่สร้างขึ้นมาใหม่ จาก router
app.use("/api", test);
app.use("/api", auth);

//feture main route
app.use("/api", Job);
app.use("/api", User);

//JwtAuthUser
app.use("/api", JwtAuth);

//JwtAuthAdmin
app.use("/api", Admin);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//RegisterJob
app.use("/api/employees", EmployeeRoutes);

//route admin
app.use("/api/admin", Admin);

// LINE Login Routes
app.use(authRoutes);

module.exports = app;
