const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/authMiddleware");

const {
upgradePlan
} = require(
"../controllers/paymentController"
);

router.put(
"/upgrade",
auth,
upgradePlan
);

module.exports =
router;