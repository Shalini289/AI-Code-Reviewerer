const express = require("express");

const auth =
  require("../middleware/authMiddleware");

const {
  reviewCode,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/code", auth, reviewCode);

module.exports = router;