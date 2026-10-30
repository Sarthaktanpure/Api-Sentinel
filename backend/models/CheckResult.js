const mongoose = require("mongoose");
const Endpoint = require("./Endpoint");

const checkResultSchema = new mongoose.Schema({
  endpointId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Endpoint",
    required: true,
  },

  status: {
    type: String,
    enum: ["UP", "DOWN"],
    required: true,
  },

  responseTimeMs: {
    type: Number,
    required: true,
  },

  httpStatusCode: {
    type: Number,
    default: null,
  },
  errorMessage: {
    type: String,
    default: null,
  },
  checkedAt: {
    type: Date,
    default: Date.now,
  },
});

const CheckResult = mongoose.model("CheckResult", checkResultSchema);

module.exports = CheckResult;
