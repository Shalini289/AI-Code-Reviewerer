const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/authMiddleware");

const {
  getBillingInfo,
} = require(
  "../controllers/billingController"
);

router.get(
  "/",
  auth,
  getBillingInfo
);

module.exports =
  router;