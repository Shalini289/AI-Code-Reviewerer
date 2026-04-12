const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    code: String,

    result: String,
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model("Review", reviewSchema);