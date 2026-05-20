const Contact =
  require("../models/Contact");
const { sendEmail } =
  require("../utils/mailer");

const escapeHtml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

exports.submitContact =
  async (req, res) => {
    
try{
      const {
        name,
        email,
        message,
      } = req.body;

    
        const contact =
          await Contact.create({
          name,
          email,
          message,
        });

        await sendEmail({
          to:
            process.env.CONTACT_EMAIL ||
            process.env.RESEND_CONTACT_EMAIL ||
            process.env.RESEND_TO,
          replyTo: email,
          subject: "New Contact Message",
          text:
            `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
        });

      res.status(201).json({
        message:
          "Message sent",
        contact,
      });

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });
    }
  };
