const Review =require("../models/Review");

const reviewWithAI =require("../services/aiService");

exports.reviewCode =
  async (req, res) => {
    try {
      const {
        code,
        language,
      } = req.body;

      const aiResult =
        await reviewWithAI(
          code,
          language
        );

      const review =
        await Review.create({
          user:
            req.user.id,
          code,
          result:
            aiResult,
        });

      res.json(review);

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };

exports.getReviewHistory =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        reviews
      );

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };
  exports.deleteReview =
  async (req, res) => {
    try {
      await Review.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Deleted Successfully",
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };