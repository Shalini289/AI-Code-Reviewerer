const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes =
  require("./routes/userRoutes");
const dashboardRoutes =
  require(
    "./routes/dashboardRoutes"
  );
const adminRoutes =
  require("./routes/adminRoutes");
const contactRoutes =
  require(
    "./routes/contactRoutes"
  );
const paymentRoutes =
  require(
    "./routes/paymentRoutes"
  );
const billingRoutes =
  require(
    "./routes/billingRoutes"
  );
const compareRoutes =
  require(
    "./routes/compareRoutes"
  );







dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use(
  "/api/user",
  userRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/admin",
  adminRoutes
);
app.use(
  "/api/contact",
  contactRoutes
); 
app.use(
  "/api/payment",
  paymentRoutes
);
app.use(
  "/api/billing",
  billingRoutes
);
app.use(
  "/api/compare",
  compareRoutes
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});