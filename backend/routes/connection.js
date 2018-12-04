const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");

router.get("/connections", function(req, res) {
  console.log(req.query)
  kafka.make_request("getCon", req.query.emailID, function(err, results) {
    console.log("inside make connection");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.status(401).send("Error in creating connection");
      return;
    } else {
      console.log("Inside else");
      res.json(results);
    }
  });
});

router.post("/requestconnection", function(req, res) {
  kafka.make_request("requestCon", req.body, function(err, results) {
    console.log("inside make connection");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.status(401).send("Error in creating connection");
      return;
    } else {
      console.log("Inside else");
      res.json(results);
    }
  });
});

router.post("/acceptconnection", function(req, res) {
  kafka.make_request("acceptCon", req.body, function(err, results) {
    console.log("inside make connection");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.status(401).send("Error in creating connection");
      return;
    } else {
      console.log("Inside else");
      res.json(results);
    }
  });
});

router.post("/removeconnection", function(req, res) {
  kafka.make_request("removeCon", req.body, function(err, results) {
    console.log("Inside remove connection");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.status(401).send("Error in creating connection");
      return;
    } else {
      console.log("Inside else");
      res.json(results);
    }
  });
});

module.exports = router;