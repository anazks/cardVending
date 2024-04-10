const createError = require("http-errors");
const express = require("express");
var bodyParser = require('body-parser')

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index.js");
const adminRouter = require("./routes/admin");
const hbs = require("hbs");
const connectDB = require("./db/config.js");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
require("dotenv").config();
const app = express();

app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_SESSION = process.env.DB_NAME;
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors());
// Use session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://user02:123@ecommerceweb.3j3ck.mongodb.net/trainingMoc?retryWrites=true&w=majority`,
    }),
    cookie: {
      maxAge: 10 * 60 * 60 * 1000, // 10 hours in milliseconds
    },
  })
);

app.use(logger("dev"));
app.use(cookieParser());

connectDB(); // connect to mongodb
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partials");
// app.use(checkAdminExist());
// Routes
app.use("/admin",  adminRouter);
app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
