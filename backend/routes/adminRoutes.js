const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/authMiddleware");

const admin =
  require("../middleware/adminMiddleware");

const {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllReviews,
  deleteReview,
} = require(
  "../controllers/adminController"
);

router.get(
  "/stats",
  auth,
  admin,
  getAdminStats
);

router.get(
  "/users",
  auth,
  admin,
  getAllUsers
);

router.delete(
  "/users/:id",
  auth,
  admin,
  deleteUser
);

router.get(
  "/reviews",
  auth,
  admin,
  getAllReviews
);

router.delete(
  "/reviews/:id",
  auth,
  admin,
  deleteReview
);

module.exports =
  router;