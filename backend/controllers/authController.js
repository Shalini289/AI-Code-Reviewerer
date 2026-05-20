const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto =
  require("crypto");

const {
  isEmailConfigured,
  sendEmail,
} =
  require("../utils/mailer");

const getResetEmailErrorMessage = (err) => {
  const message =
    err.message ||
    "";

  if (
    message.includes("domain is not verified") ||
    message.includes("verify a domain")
  ) {
    return "Reset email could not be sent because the Resend sender domain is not verified. Verify your domain in Resend and set SENDER_EMAIL to an address on that domain.";
  }

  if (
    message.includes("only send testing emails")
  ) {
    return "Reset email could not be sent because Resend test mode only allows sending to your own Resend account email. Verify a domain in Resend to send reset emails to users.";
  }

  if (
    message.includes("API key") ||
    message.includes("Unauthorized")
  ) {
    return "Reset email could not be sent because the Resend API key is invalid or missing in the deployed backend.";
  }

  return "Could not send reset email. Check EMAIL_SERVICE=resend, RESEND_API_KEY, SENDER_EMAIL, verified domain/sender, and deployed backend environment variables.";
};

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

      if (!isEmailConfigured()) {
        return res.status(500).json({
          message:
            "Reset email is not configured. Add EMAIL_SERVICE=resend, RESEND_API_KEY, and SENDER_EMAIL in your deployed backend environment.",
        });
      }

      const mailInfo =
        await sendEmail(
        {
          to: user.email,
          subject:
            "Reset your AI Code Reviewer password",
          text:
            `Reset your AI Code Reviewer password: ${resetUrl}\n\nThis link expires in 10 minutes.`,
          html: `
<p>You requested a password reset for AI Code Reviewer.</p>
<p>This link expires in 10 minutes.</p>
<p><a href="${resetUrl}">Reset Password</a></p>
<p>If you did not request this, you can ignore this email.</p>
`,
        }
      );

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
        err.message,
        err.response?.data || "",
        err.code || "",
        err.response || ""
      );

      res.status(500).json({
        message:
          getResetEmailErrorMessage(err),
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
