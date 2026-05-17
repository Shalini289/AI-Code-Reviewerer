const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto =
  require("crypto");

const nodemailer =
  require("nodemailer");

const createEmailTransporter = () =>
  nodemailer.createTransport({
    host:
      process.env.EMAIL_HOST ||
      "smtp.gmail.com",
    port:
      Number(process.env.EMAIL_PORT) ||
      465,
    secure:
      process.env.EMAIL_SECURE
        ? process.env.EMAIL_SECURE === "true"
        : true,
    auth: {
      user:
        process.env.EMAIL_USER,
      pass:
        process.env.EMAIL_PASS,
    },
  });

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
      const email =
        String(
          req.body.email ||
          ""
        )
          .trim()
          .toLowerCase();

      if (!email) {
        return res.status(400).json({
          message:
            "Email is required",
        });
      }

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
            "Email service is not configured. Add EMAIL_USER and EMAIL_PASS in backend/.env, then rebuild Docker.",
        });
      }

      const transporter =
        createEmailTransporter();

      await transporter.verify();

      const mailInfo =
        await transporter.sendMail(
        {
          from:
            process.env.EMAIL_FROM ||
            `"AI Code Reviewer" <${process.env.EMAIL_USER}>`,
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

      if (mailInfo.rejected?.length) {
        throw new Error(
          `Email rejected for ${mailInfo.rejected.join(", ")}`
        );
      }

      console.log(
        `Password reset email accepted for ${user.email}. Message id: ${mailInfo.messageId}`
      );

      res.json({
        message:
          "Reset email sent. Please check your inbox and spam folder.",
      });

    } catch (err) {
      console.error(
        "Forgot password email failed:",
        err.message
      );

      res.status(500).json({
        message:
          "Could not send reset email. Check EMAIL_USER, EMAIL_PASS, and Gmail app password settings.",
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
