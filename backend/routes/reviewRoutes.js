const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  reviewCode,
  getReviewHistory,
  deleteReview,
} = require(
  "../controllers/reviewController"
);

router.post(
  "/code",
  authMiddleware,
  reviewCode
);

router.get(
  "/history",
  authMiddleware,
  getReviewHistory
);

router.delete(
  "/:id",
  authMiddleware,
  deleteReview
);

module.exports = router;