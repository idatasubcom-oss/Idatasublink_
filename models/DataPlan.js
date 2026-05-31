const mongoose = require("mongoose");

const dataPlanSchema = new mongoose.Schema({
  network: {
    type: String,
    required: true
  },

  plan: {
    type: String,
    required: true
  },

  validity: {
    type: String,
    default: ""
  },

  providerPrice: {
    type: Number,
    required: true
  },

  userPrice: {
    type: Number,
    required: true
  },

  planCode: {
    type: String,
    default: ""
  },

  status: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "DataPlan",
  dataPlanSchema
);
