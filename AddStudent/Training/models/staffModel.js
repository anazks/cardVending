const mongoose = require("mongoose");

const staff = new mongoose.Schema({
    staff_name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  status:{
    type:String,
    require:true,
    default:"offline"
  },
  role:{
    type:String,
    default:'user'
  }
});

const Package = mongoose.model("staff", staff);

module.exports = Package;
