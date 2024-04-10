const mongoose = require("mongoose");

const ErrorStatusModel = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  errors: {
    type: Array
  }
});

const Package = mongoose.model("ErrorStatus", ErrorStatusModel);

module.exports = Package;
