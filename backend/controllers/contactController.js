const Contact =
  require("../models/Contact");
  const nodemailer = require("nodemailer");

exports.submitContact =
  async (req, res) => {
    
try{
      const {
        name,
        email,
        message,
      } = req.body;

    
        await Contact.create({
          name,
          email,
          message,
        });

        const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
     await transporter.sendMail({
      to: process.env.EMAIL_USER,
      subject: "New Contact Message",
      html: `
        <h3>New Message</h3>
        <p>${name}</p>
        <p>${email}</p>
        <p>${message}</p>
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