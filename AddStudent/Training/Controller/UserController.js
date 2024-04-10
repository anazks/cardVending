const errorModel = require('../models/errorModel');
const ErrorStatusModel = require("../models/ErrorStatusModel")
const staffModel = require('../models/staffModel')
let userLogin = (req, res) => {
  try {
    res.render("user/Login")
  } catch (error) {
    console.log(error)
  }
}

let userHome = async (req, res) => {
  try {
    // console.log("Home route working");
    let errors = await errorModel.find({})
    console.log(req.user)
    let user = req.user;
    let adminOption = null;
    if(user.role==='admin'){
        adminOption = true;
    }
    res.render("user/home", { errors, userId: req.user.id,user,adminOption})
  } catch (error) {
    console.log(error)
  }
}

let errors = async (req, res) => {
  try {
    let errors = await errorModel.find({})
    res.json(errors)
  } catch (error) {
    console.log(error)
  }
}
let ResolveError = async (req, res) => {
  try {
    console.log(req.body);
    console.log("request resolve error");
    let { trublecode, code, userId, errorId, totalTime } = req.body;
    if (trublecode == code) {
      let userExist = await ErrorStatusModel.findOne({ userId });
      if (userExist) {
        //push the error 
            const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        console.log(formattedToday,"date")
        await ErrorStatusModel.findOneAndUpdate({ userId},{  $push:{ errors: { errorId, totalTime: parseInt(totalTime),Solveddate:formattedToday } } });
        res.json({ ErrorStatus: true });
      } else {
        await ErrorStatusModel.create({ userId, errors: [{ errorId, totalTime: parseInt(totalTime) }] });
        res.json({ ErrorStatus: true });
      }
    } else {
      console.log("not solved")
      res.json({ ErrorStatus: false })
    }
  } catch (error) {
    console.log(error)
  }
}
const logout = async(req,res)=>{
  try {
    let updateStatus = await staffModel.findByIdAndUpdate({_id:req.user._id}, { status: 'offline' },) 
    req.logout()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}
const users = async (req,res)=>{
  try {
    let staffs = await staffModel.find({})
    res.render("user/users",{staffs})
  } catch (error) {
    console.log(error)
  }
}
const changeRole = async (req,res)=>{
  try {
    let id = req.params.id;
    let user = await staffModel.findById({_id:id});
        if(user.role === 'admin'){
            let updateStatus = await staffModel.findByIdAndUpdate({_id:id}, { role: 'user' },)      
        }else{
            let updateStatus = await staffModel.findByIdAndUpdate({_id:id}, { role: 'admin' },)      

        }
    res.redirect('/users')
} catch (error) {
    console.log(error)
}
}
module.exports = {
  userLogin,
  userHome,
  errors,
  ResolveError,
  users,
  changeRole,
  logout
}