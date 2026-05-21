// Importing necessary modules
import nodemailer from "nodemailer";

const createTransport = () => {
  if (process.env.EMAIL_SERVICE === "resend") {
    return nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY
      }
    });
  }

const getSenderEmail = () => {
  return process.env.SENDER_EMAIL || "noreply@shalini.com";
}

// Verfication email function
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transport = createTransport();

    const mailOptions = {
      from: getSenderEmail(),
      to: email,
      subject: "Verfiy your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };

    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Welcome email function
export const sendWelcomeEmail = async (email, name) => {
  try {
    const transport = createTransport();


    const mailOptions = {
      from: getSenderEmail(),
      to: email,
      subject: "Welcome to our platform!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
    };
    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Reset password email function
export const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    const transport = createTransport();

    if (!resetUrl) {
      throw new Error("Reset URL is required");
    }

    const mailOptions = {
      from: getSenderEmail(),
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
    };


    const response = await transport.sendMail(mailOptions);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Reset success email function
export const sendResetSuccessEmail = async (email) => {
  try {
    const transport = createTransport();

    const mailOptions = {
      from: getSenderEmail(),
      to: email,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };
    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

}
