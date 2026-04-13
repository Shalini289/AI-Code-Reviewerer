const Snippet =
  require("../models/Snippet");

exports.createSnippet =
  async (req, res) => {
    try {
      const snippet =
        await Snippet.create({
          ...req.body,
          user: req.user.id,
        });

      res.status(201).json(
        snippet
      );

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };

exports.getSnippets =
  async (req, res) => {
    try {
      const snippets =
        await Snippet.find({
          user: req.user.id,
        });

      res.json(snippets);

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };

exports.deleteSnippet =
  async (req, res) => {
    try {
      await Snippet.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Snippet Deleted",
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };