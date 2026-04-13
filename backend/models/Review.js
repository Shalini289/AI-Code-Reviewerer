const mongoose =
  require("mongoose");

const reviewSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      code: {
        type: String,
        required: true,
      },

      language: {
        type: String,
      },

      result: {
        type: Object,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Review",
    reviewSchema
  );