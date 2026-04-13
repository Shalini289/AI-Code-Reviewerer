const User =
  require("../models/User");

const bcrypt =
  require("bcryptjs");

exports.updateProfile =
  async (req, res) => {
    try {
      const {
        name,
        email,
      } = req.body;

      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            name,
            email,
          },
          {
            new: true,
          }
        );

      res.json(user);

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };

exports.changePassword =
  async (req, res) => {
    try {
      const {
        oldPassword,
        newPassword,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Wrong old password",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.json({
        message:
          "Password updated",
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };

exports.deleteAccount =
  async (req, res) => {
    try {
      await User.findByIdAndDelete(
        req.user.id
      );

      res.json({
        message:
          "Account deleted",
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };