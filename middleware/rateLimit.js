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
