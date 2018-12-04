//import the require dependencies
var mongoose = require("mongoose");
// var mongo = require("mongodb");
var Jobs = require("./models/jobs");

var express = require("express");
var app = express();
// var bodyParser = require("req.body-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
//var cookieParser = require('cookie-parser');
var morgan = require("morgan");
var cors = require("cors");
//var mysql = require('mysql');
var pool = require("./db/pool");
var redis = require("./db/redis");
//var mongo = require("mongodb");

//const multer = require("multer");

app.set("view engine", "ejs");
//app.use(cors({ origin: "http://localhost:3000", credentials: true }));

var { mongoose } = require("./db/mongoose");
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.set("debug", true);
//var User = require("./models/users");

//Import the established routes
const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");
const message = require("./routes/message");
const userprofileRoutes = require("./routes/userprofile");
const fileuploadRoutes = require("./routes/fileupload");
const connection = require("./routes/connection");
const jobsearchRoutes = require("./routes/jobsearch");
const jobapplyRoutes = require("./routes/jobapply");
const jobsaveRoutes = require("./routes/jobsave");
const resumeuploadRoutes = require("./routes/resumeupload");
// const resumeuploadRoutes = require('./routes/resumeupload');
const deleteaccountRoutes = require("./routes/deleteaccount");
const postJob = require("./routes/postjob");
const getApplicants= require("./routes/applicants");
const editJob = require("./routes/editjob");
const graphRoutes = require("./routes/graphs");
const getViews = require("./routes/getviews");
const searchclick = require('./routes/searchclick');
const jobByUser = require('./routes/jobapplybyuser')

//specify the path of static directory
//app.use(express.static(__dirname + "/public"));

//use express session to maintain session data
app.use(session({
  name : 'LinkedIn',
  secret: "0988787545854467997",
  resave: true,
  store:new MongoStore({ mongooseConnection: mongoose.connection }),
  saveUninitialized: true
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

/**************Code goes here*******************/

//Incoming routes
app.post("/signup", signupRoutes);
app.post("/signin", signinRoutes);
app.get("/session", signinRoutes);
app.post("/logout", signinRoutes);
app.delete("/deleteaccount", deleteaccountRoutes);
app.post("/message", message);
app.get("/messages", message);
app.post("/userprofile", userprofileRoutes);
app.get("/userprofile", userprofileRoutes);
app.get("/jobsearch", jobsearchRoutes);
app.post("/saveimage", userprofileRoutes);
app.post("/fileupload", fileuploadRoutes);
app.post("/connection", connection);
app.post("/jobsearch", jobsearchRoutes);
app.post("/jobapply", jobapplyRoutes);
app.get("/jobapply", jobapplyRoutes);
app.post("/jobsave", jobsaveRoutes);
app.post("/test-upload", resumeuploadRoutes);
app.get("/usersearch", userprofileRoutes);
app.post("/postjob", postJob);
app.get("/connections", connection);
app.post("/requestconnection", connection);
app.post("/acceptconnection", connection);
app.post("/removeconnection", connection);
app.get("/mypostedjob",signinRoutes);
app.get("/applicants",getApplicants);
app.get("/editjob", editJob);
app.post("/editjob", editJob);
app.get("/graph1", graphRoutes);
app.get("/graph2", graphRoutes);
app.get("/graph3", graphRoutes);
app.get("/graph4", graphRoutes);
app.get("/graph5", graphRoutes);
app.get("/graph6", graphRoutes);
app.get("/graph6sj", graphRoutes);
app.get("/graph7", graphRoutes);
app.post("/getviews", getViews);
app.post('/searchclick', searchclick);
app.get('/jobappl',jobByUser)

// start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;
