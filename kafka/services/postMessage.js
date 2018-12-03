const mongoose = require("mongoose");
var Message = require("../models/messages");

function handle_request(msg, callback) {
  console.log("Inside post message request at Backend");
  let data = msg;
  Message.findOneAndUpdate(
    { users: { $all: [data.email] } },
    { $push: { messages: data.messages } },
    { new: true, upsert: true }
  )
    .then(result => {
      if (!result) {
        callback(err, null);
      } else {
        console.log(result);
        callback(null, result);
      }
    })
    .catch(err => {
      console.log(err, "user error");
      Message.create({ users: data.email, names:data.names, images:data.images,messages: data.messages })
        .then(result => {
          callback(null, result);
        })
        .catch(err => {
          console.log("create error", err);
        });
    });
}

exports.handle_request = handle_request;
