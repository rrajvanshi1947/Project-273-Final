const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");

router.get("/connections", function(req, res) {
  console.log("Session info", req.session.user.userid);
  let payload = req.session.user.emailID;
  kafka.make_request("getCon", payload, function(err, results) {
    console.log("inside make connection");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.status(401).send("Error in creating connection");
      return;
    } else {
      console.log("Inside else");
      res.status(200).json(results);
    }
  });
});

router.post("/requestconnection", function(req, res) {
  console.log("Session info", req.session.user.id);
  let payload = {
    userid: req.session.user.id,
    connect: req.body.connect,
    useremail: req.session.user.emailID,
    connectemail: req.body.connectemail
  };
  kafka.make_request("requestCon", payload, function(err, results) {
    console.log("inside make connection");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.status(401).send("Error in creating connection");
      return;
    } else {
      console.log("Inside else");
      res.status(200).json(results);
    }
  });
});

router.post("/acceptconnection", function(req, res) {
  console.log("Session info", req.session.user.userid);
  let payload = {
    userid: req.session.user.id,
    connect: req.body.connect,
    useremail: req.session.user.emailID,
    connectemail: req.body.connectemail
  };
  kafka.make_request("acceptCon", payload, function(err, results) {
    console.log("inside make connection");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.status(401).send("Error in creating connection");
      return;
    } else {
      console.log("Inside else");
      res.status(200).json(results);
    }
  });
});

router.post("/removeconnection", function(req, res) {
  console.log("Session info", req.session.user.userid);
  let payload = {
    userid: req.session.user.userid,
    remove: req.body.remove
  };
  kafka.make_request("removeCon", payload, function(err, results) {
    console.log("Inside remove connection");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.status(401).send("Error in creating connection");
      return;
    } else {
      console.log("Inside else");
      res.status(200).json(results);
    }
  });
});

module.exports = router;