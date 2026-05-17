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

      const frontendUrl =
        process.env.FRONTEND_URL ||
        "http://localhost:3000";

      const resetUrl =
        `${frontendUrl.replace(/\/$/, "")}/reset-password/${resetToken}`;

      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return res.status(500).json({
          message:
            "Email service is not configured",
        });
      }

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
          from:
            process.env.EMAIL_USER,
          to: user.email,
          subject:
            "Reset your AI Code Reviewer password",
          html: `
<p>You requested a password reset for AI Code Reviewer.</p>
<p>This link expires in 10 minutes.</p>
<p><a href="${resetUrl}">Reset Password</a></p>
<p>If you did not request this, you can ignore this email.</p>
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
        await bcrypt.hash(
          req.body.password,
          10
        );

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
