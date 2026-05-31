const rateLimit = require("express-rate-limit");

// ================= GENERAL API LIMIT =================
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // max requests per minute
  message: {
    success: false,
    message: "Too many requests, try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = apiLimiter;
const rateLimit = require("express-rate-limit");

// ================= GENERAL API LIMIT =================
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: "Too many requests, try again later."
  }
});

// ================= LOGIN STRICT LIMIT =================
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // only 5 attempts
  message: {
    success: false,
    message: "Too many login attempts. Try again after 15 minutes."
  }
});

module.exports = { apiLimiter, loginLimiter };
