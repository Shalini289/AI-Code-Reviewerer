const Review = require("../models/Review");
const reviewWithAI = require("../services/aiService");

exports.reviewCode = async (req, res) => {
  try {
    const { code } = req.body;

    const aiResult = await reviewWithAI(code);

    const review = await Review.create({
      user: req.user.id,
      code,
      result: aiResult,
    });

    res.json(review);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};