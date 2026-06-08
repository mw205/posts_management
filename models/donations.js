const mongoose = require("mongoose");
const User = require("./userModel");

const donationsSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    providerSessionId: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true },
);
const Donation = mongoose.model("Donation", donationsSchema);
module.exports = Donation;
