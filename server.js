const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/wallet", require("./routes/wallet"));
app.use("/api/transfer", require("./routes/transfer"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/vtu", require("./routes/vtu"));
app.use("/api/withdraw", require("./routes/withdraw"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/plans", require("./routes/plans"));

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 IDATASUB BACKEND RUNNING");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
