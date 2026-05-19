const nodemailer = require("nodemailer");

const firstDefined = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );

const getEmailConfig = () => {
  const secureValue =
    firstDefined(
      process.env.SMTP_SECURE
    ) || "false";

  const host =
    firstDefined(
      process.env.SMTP_HOST
    ) || "smtp-relay.brevo.com";

  const port = Number(
    firstDefined(
      process.env.SMTP_PORT
    ) || 587
  );

  const secure =
    String(secureValue).toLowerCase() ===
    "true";

  const user =
    firstDefined(

      process.env.SMTP_USER,
      process.env.BREVO_SMTP_LOGIN
    );

  const pass =
    firstDefined(
   
      process.env.SMTP_PASS,
      process.env.BREVO_SMTP_KEY
    );

  const from =
    firstDefined(
  
      process.env.SMTP_FROM,

    ) ||
    (user
      ? `"AI Code Reviewer" <${user}>`
      : undefined);

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
  };
};

const isEmailConfigured = () => {
  const config = getEmailConfig();

  return Boolean(
    config.host &&
      config.port &&
      config.user &&
      config.pass &&
      config.from
  );
};

const createEmailTransporter = () => {
  const config = getEmailConfig();

  if (!isEmailConfigured()) {
    throw new Error(
      "Email service is not configured. Add Brevo SMTP host, login, key, and verified sender."
    );
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
};

const sendEmail = async (mailOptions) => {
  const config = getEmailConfig();
  const transporter = createEmailTransporter();

  console.log(
    `[mailer] Sending email via ${config.host}:${config.port} secure=${config.secure} from=${config.from} to=${mailOptions.to} userConfigured=${Boolean(config.user)} passConfigured=${Boolean(config.pass)}`
  );

  if (process.env.SMTP_SKIP_VERIFY !== "true") {
    await transporter.verify();
  }

  const info = await transporter.sendMail({
    from: config.from,
    ...mailOptions,
  });

  if (info.rejected?.length) {
    throw new Error(`Email rejected for ${info.rejected.join(", ")}`);
  }

  return info;
};

module.exports = {
  getEmailConfig,
  isEmailConfigured,
  sendEmail,
};
