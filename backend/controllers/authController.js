const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto =
  require("crypto");

const nodemailer =
  require("nodemailer");
exports.register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    const token =
      jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn:
            "7d",
        }
      );

    res.status(201).json({
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({
      message:
        err.message,
    });
  }
};

exports.login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid Email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Wrong Password",
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn:
            "7d",
        }
      );

    res.status(200).json({
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({
      message:
        err.message,
    });
  }
};
exports.forgotPassword =
  async (req, res) => {
    try {
      const { email } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const resetToken =
        crypto
          .randomBytes(20)
          .toString(
            "hex"
          );

      user.resetPasswordToken =
        resetToken;

      user.resetPasswordExpire =
        Date.now() +
        10 *
          60 *
          1000;

      await user.save();

      const resetUrl =
        `http://localhost:3000/reset-password/${resetToken}`;

      const transporter =
        nodemailer.createTransport(
          {
            service:
              "gmail",
            auth: {
              user:
                process.env.EMAIL_USER,
              pass:
                process.env.EMAIL_PASS,
            },
          }
        );

      await transporter.sendMail(
        {
          to: user.email,
          subject:
            "Password Reset",
          html: `
<a href="${resetUrl}">
Reset Password
</a>
`,
        }
      );

      res.json({
        message:
          "Reset Email Sent",
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };
  exports.resetPassword =
  async (req, res) => {
    try {
      const user =
        await User.findOne({
          resetPasswordToken:
            req.params.token,

          resetPasswordExpire:
            {
              $gt:
                Date.now(),
            },
        });

      if (!user) {
        return res.status(400).json({
          message:
            "Invalid Token",
        });
      }

      user.password =
        req.body.password;

      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      await user.save();

      res.json({
        message:
          "Password Reset Success",
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };