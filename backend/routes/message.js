const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");
var Message=require('../models/messages');

router.post("/message", function(req, res) {

  /*let data= req.body;
  console.log(data);

  Message.findOneAndUpdate(
    { users: { $all: [data.email] } },
    { $push: { messages: data.messages } },
    { new: true, upsert: true }
  )
    .then(result => {
      if (!result) {
        res.sendStatus(401).end("Error in posting message");
      } else {
        console.log(result);
        res.sendStatus(200).end("Success");
      }
    })
    .catch(err => {
      console.log(err, "user error");
      Message.create({ users: data.email, messages: data.messages })
        .then(result => {
          res.sendStatus(200).end("Success");
        })
        .catch(err => {
          res.sendStatus(401).end("Error in posting message");
        });
    });*/
  kafka.make_request("postmessage", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.sendStatus(401).end("Error in posting message");
      return;
    } else {
      console.log("Inside else");
      //res.writeHead(200);
      res.end(JSON.stringify(results));
    }
  });
});

router.get("/messages", function(req, res) {
  kafka.make_request("getmessage", req.query, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err || results == null) {
      console.log("Inside err");
      res.sendStatus(401).end("Error in getting message");
      return;
    } else {
      console.log("Inside else");
      //res.writeHead(200);
      res.end(JSON.stringify(results));
    }
  });
});

module.exports = router;
