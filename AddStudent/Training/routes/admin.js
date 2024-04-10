var express = require("express");
var router = express.Router();
const multer = require("multer");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
let checkUser = require("../middlewares/checkUser");
const app = express();

router.use(express.urlencoded({ extended: true }));
//controllers
const {getLoginPage,
  homepage,
  doLogin,
  getStaffpage,
  addStaffPage,
  errorpage,
  addError,
  Report,
  logout,
  addStaff,
  addErrorToDb,
  deleteError,
  deleteStaff,
  viewReport,
  allow,
  Makelogout,
  allowAll,
  makeAdmin
} = require('../Controller/AdminController')

//middlewares
router.all("*", function (req, res, next) {
  req.app.locals.layout = "Layout/AdminLayout"; // set your layout here
  next(); // pass control to the next handler
});
//middleware for checking whether user is logged in
const verifyLogin = (req, res, next) => {
  if (req.session.admin|| req.session.staff) {
    next();
  } else {
    return res.redirect("/admin/login");
  }
};


router.get('/',getLoginPage)
router.get('/home',homepage)
router.get('/getStaffPage',getStaffpage)
router.get("/add-new-staff",addStaffPage)
router.get("/getError",errorpage)
router.get('/addError',addError)
router.get('/Report',Report)
router.get('/logout',logout)

router.post('/login',doLogin)
router.post('/add-Staff',addStaff)
router.post('/addError',verifyLogin,addErrorToDb)

router.get("/delete-staff/:id",verifyLogin,deleteStaff);
router.get("/delete-error/:id",verifyLogin,deleteError);
router.get('/view-Report/:userId',verifyLogin,viewReport)
router.get('/allow/:id',verifyLogin,allow)
router.get('/logout/:id',verifyLogin,Makelogout)
router.get('/allow-all',verifyLogin,allowAll)
router.get('/makeAdmin/:id',verifyLogin,makeAdmin)
module.exports = router;