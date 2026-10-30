const mongoose = require("mongoose");

const endpointSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      default: "GET",
    },

    intervalSecond: {
      type: Number,
      default: 60,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Endpoint = mongoose.model("Endpoint", endpointSchema);

module.exports = Endpoint;
