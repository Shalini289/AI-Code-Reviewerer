const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/authMiddleware");

const {
  compareCode,
} = require(
  "../controllers/compareController"
);

router.post(
  "/",
  auth,
  compareCode
);

module.exports =
  router;