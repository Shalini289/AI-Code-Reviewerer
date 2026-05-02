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

const githubRoutes =
  require(
    "./routes/githubRoutes"
  );

const profileRoutes =
  require(
    "./routes/profileRoutes"
  );
const securityRoutes =
  require(
    "./routes/securityRoutes"
  );
const snippetRoutes =
  require(
    "./routes/snippetRoutes"
  );



dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "AI Code Reviewer API",
    frontend: "http://localhost:3000",
  });
});

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

app.use(
  "/api/github",
  githubRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.use(
  "/api/security",
  securityRoutes
);
app.use(
  "/api/snippets",
  snippetRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});
