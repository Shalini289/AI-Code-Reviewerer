const axios = require("axios");

const RESEND_EMAIL_URL =
  "https://api.resend.com/emails";

const clean = (value) =>
  value === undefined ||
  value === null
    ? ""
    : String(value).trim();

const getEmailConfig = () => {
  const apiKey =
    clean(process.env.RESEND_API_KEY);

  const from =
    clean(process.env.RESEND_FROM) ||
    clean(process.env.MAIL_FROM);

  return {
    apiKey,
    from,
  };
};

const isEmailConfigured = () => {
  const config = getEmailConfig();

  return Boolean(
    config.apiKey &&
      config.from
  );
};

const compactPayload = (payload) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined &&
        value !== null &&
        value !== "";
    })
  );

const sendEmail = async (mailOptions) => {
  const config = getEmailConfig();

  if (!isEmailConfigured()) {
    throw new Error(
      "Resend email is not configured. Add RESEND_API_KEY and RESEND_FROM in backend environment variables."
    );
  }

  const recipients = Array.isArray(mailOptions.to)
    ? mailOptions.to.filter(Boolean)
    : [mailOptions.to].filter(Boolean);

  if (!recipients.length) {
    throw new Error(
      "Email recipient is missing."
    );
  }

  const payload = compactPayload({
    from: config.from,
    to: recipients,
    subject: mailOptions.subject,
    html: mailOptions.html,
    text: mailOptions.text,
    reply_to:
      mailOptions.replyTo ||
      mailOptions.reply_to,
  });

  console.log(
    `[mailer] Sending email with Resend from=${config.from} to=${recipients.join(", ")} apiKeyConfigured=${Boolean(config.apiKey)}`
  );

  try {
    const response =
      await axios.post(
        RESEND_EMAIL_URL,
        payload,
        {
          headers: {
            Authorization:
              `Bearer ${config.apiKey}`,
            "Content-Type":
              "application/json",
          },
          timeout: 20000,
        }
      );

    return {
      messageId:
        response.data?.id ||
        response.data?.data?.id,
      provider: "resend",
      raw: response.data,
    };
  } catch (err) {
    const resendMessage =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message;

    throw new Error(
      `Resend email failed: ${resendMessage}`
    );
  }
};

module.exports = {
  getEmailConfig,
  isEmailConfigured,
  sendEmail,
};
