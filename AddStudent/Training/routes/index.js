var express = require("express");
var router = express.Router();
const multer = require("multer");
const passport = require("../Authentication/Passport-config");
const checkUser = require("../middlewares/checkUser")
const studentMOdel = require('../models/StudentModel')
// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  userLogin,
  userHome,
  errors,
  ResolveError,
  logout,
  users,
  changeRole
} = require('../Controller/UserController');

router.use(passport.initialize());
router.use(passport.session());
// Middleware to set layout for all other routes
router.all("/*", function (req, res, next) {
  req.app.locals.layout = "Layout/layout";
  next();
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true, // Enable flash messages for failure
  })
);

router.get('/', userLogin);
router.get('/home', checkUser,userHome);

// router.post('/login',(req,res)=>{
//   console.log(req.body)
// })

router.post('/ResolveError', checkUser,ResolveError);
router.get('/errors', checkUser,errors);
router.get('/users',users)
router.get('/changeRole/:id',checkUser,changeRole)
router.get('/logout',logout)

router.post('/addStudent', async(req,res)=>{
    try {
      let student = await studentMOdel.create(req.body)
      console.log('data added')
      res.redirect('/')
    } catch (error) {
      console.log(error)
    }
})
router.get("/getStudents",async(req,res)=>{
  try {
    let students = await studentMOdel.find({})
    res.json(students)
  } catch (error) {
   console.log(error) 
  }
})
router.post('/updatePayment', async (req, res) => {
  try {
      let data = await studentMOdel.findOneAndUpdate({ _id: req.body.id }, { status: 'payed' });
      console.log(req.body, "updated");
      res.json(true);
  } catch (error) {
      console.error(error);
      res.json(false);
  }
});
router.get('/findStudent', async (req, res) => {
  try {
    const admissionNumber = req.query.admissionNumber;
    const student = await studentMOdel.findOne({ admoNO:admissionNumber });
    res.json(student);
  } catch (error) {
    console.error('Error finding student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
