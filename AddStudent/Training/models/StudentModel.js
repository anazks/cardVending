const mongoose = require("mongoose");

const Student = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  batch:{
    type:String,
    require:true
  },
  sem:{
    type:String,
    require:true
  },
  admoNO:{
    type:String,
    require:true
  },
  status:{
    type:String,
    require:true,
    default:"Not payed"
  }
});

const Package = mongoose.model("Student", Student);

module.exports = Package;
