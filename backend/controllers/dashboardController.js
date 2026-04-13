const Review =
  require("../models/Review");

const User =
  require("../models/User");

exports.getDashboardData =
  async (req, res) => {
    try {
      const totalReviews =
        await Review.countDocuments({
          user: req.user.id,
        });

      const recentReviews =
        await Review.find({
          user: req.user.id,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const user =
        await User.findById(
          req.user.id
        ).select(
          "-password"
        );

      const monthlyReviews =
        await Review.countDocuments({
          user: req.user.id,
          createdAt: {
            $gte:
              new Date(
                new Date().setDate(
                  1
                )
              ),
          },
        });

      res.json({
        user,
        totalReviews,
        monthlyReviews,
        recentReviews,
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };