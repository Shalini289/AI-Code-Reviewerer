const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/authMiddleware");

const {
  scanSecurity,
} = require(
  "../controllers/securityController"
);

router.post(
  "/scan",
  auth,
  scanSecurity
);

module.exports =
  router;