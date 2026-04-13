const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  updateProfile,
  changePassword,
  deleteAccount,
} = require(
  "../controllers/userController"
);

router.put(
  "/update",
  authMiddleware,
  updateProfile
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

router.delete(
  "/delete",
  authMiddleware,
  deleteAccount
);

module.exports =
  router;