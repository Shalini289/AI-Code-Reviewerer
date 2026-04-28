const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ✅ GET PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
};

// ✅ UPDATE NAME
exports.updateProfile = async (req, res) => {
  const { name } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name },
    { new: true }
  ).select("-password");

  res.json(user);
};

// ✅ CHANGE PASSWORD (FIXED)
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Old password incorrect",
      });
    }

    user.password = newPassword; // will auto-hash
    await user.save();

    res.json({
      message: "Password updated successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: "Password change failed",
    });
  }
};