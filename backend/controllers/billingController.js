const User =
  require("../models/User");

exports.getBillingInfo =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select(
          "plan createdAt"
        );

      res.json({
        currentPlan:
          user.plan,

        joinedDate:
          user.createdAt,

        billingHistory: [
          {
            id: 1,
            amount: "₹499",
            status:
              "Paid",
            date: "2026-04-01",
          },

          {
            id: 2,
            amount: "₹499",
            status:
              "Paid",
            date: "2026-03-01",
          },
        ],
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };