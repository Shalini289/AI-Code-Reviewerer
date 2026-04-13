const Contact =
  require("../models/Contact");

exports.submitContact =
  async (req, res) => {
    try {
      console.log(
        req.body
      );

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

      res.status(201).json({
        message:
          "Saved Successfully",
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