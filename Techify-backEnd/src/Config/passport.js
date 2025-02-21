const passport = require("passport");
const LineStrategy = require("passport-line").Strategy;
const dotenv = require("dotenv");

dotenv.config();

passport.use(
  new LineStrategy(
    {
      channelID: process.env.LINE_CLIENT_ID,
      channelSecret: process.env.LINE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/line/callback", // ตรวจสอบให้ตรงกับ LINE Developer Console
      scope: ["profile", "openid", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("🔹 LINE Profile:", profile); // ตรวจสอบค่าที่ได้รับจาก LINE
      return done(null, {
        userId: profile.id, // 🔥 เช็คว่า profile.id มีค่าหรือไม่
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage,
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
