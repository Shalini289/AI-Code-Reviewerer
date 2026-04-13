const User =
  require("../models/User");

const Review =
  require("../models/Review");

exports.getAdminStats =
  async (req, res) => {
    try {
      const users =
        await User.countDocuments();

      const reviews =
        await Review.countDocuments();

      const recentUsers =
        await User.find()
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.json({
        totalUsers: users,
        totalReviews:
          reviews,
        recentUsers,
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };

exports.getAllUsers =
  async (req, res) => {
    const users =
      await User.find().select(
        "-password"
      );

    res.json(users);
  };

exports.deleteUser =
  async (req, res) => {
    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "User Deleted",
    });
  };

exports.getAllReviews =
  async (req, res) => {
    const reviews =
      await Review.find().populate(
        "user",
        "name email"
      );

    res.json(reviews);
  };

exports.deleteReview =
  async (req, res) => {
    await Review.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Review Deleted",
    });
  };