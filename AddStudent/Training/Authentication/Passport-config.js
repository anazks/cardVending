const { compareSync } = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const staffmodel = require("../models/staffModel");
// var { userLogin} = require('../Controller/UserController')
passport.use(
  new LocalStrategy({ usernameField: 'email' },function (email, password, done) {
    staffmodel.findOne(
      { email:email, status:"online" },
      function (err, user) {
        console.log(email);
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("user Name error!");
          return done(null, false, { message: "Incorrect username." });
        }
        if (!compareSync(password, user.password)) {
          console.log("password error!");
          return done(null, false, { message: "Incorrect password." });
        }
        console.log(user, "from passport");
        return done(null, user);
      }
    );
  })
);

//Persists user data inside session
//Persists user data inside session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(function (id, done) {
  staffmodel.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;