const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/authMiddleware");

const {
  createSnippet,
  getSnippets,
  deleteSnippet,
} = require(
  "../controllers/snippetController"
);

router.post(
  "/",
  auth,
  createSnippet
);

router.get(
  "/",
  auth,
  getSnippets
);

router.delete(
  "/:id",
  auth,
  deleteSnippet
);

module.exports =
  router;