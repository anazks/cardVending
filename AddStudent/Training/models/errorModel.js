const mongoose = require("mongoose");

const Error = new mongoose.Schema({
    error: {
    type: String,
    required: true
  },
  trublecode: {
    type: String,
    required: true,
  },
  Description:{
    type:String,
    require:true
  }
});

const Package = mongoose.model("Error", Error);

module.exports = Package;
