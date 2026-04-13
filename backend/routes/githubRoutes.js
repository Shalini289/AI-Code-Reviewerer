const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/authMiddleware");

const {
  reviewGithubRepo,
} = require(
  "../controllers/githubController"
);

router.post(
  "/review",
  auth,
  reviewGithubRepo
);

module.exports =
  router;