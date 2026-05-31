const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= ROUTES =================
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const transferRoutes = require("./routes/transfer");
const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/admin");
const vtuRoutes = require("./routes/vtu");
const withdrawRoutes = require("./routes/withdraw");
const plansRoutes = require("./routes/plans");

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vtu", vtuRoutes);
app.use("/api/withdraw", withdrawRoutes);
app.use("/api/plans", plansRoutes);

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  res.send("IDATASUB BACKEND RUNNING 🚀");
});

// ================= ERROR HANDLING =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Server Error"
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
