const mongoose = require("mongoose");
mongoose.set("debug", true);
const UserModel = require("../models/users");
function handle_request(msg, callback) {
  console.log("Logged in user :", msg.userid);
  console.log("Connecting to :", msg.connect);
  UserModel.findByIdAndUpdate(msg.userid, {
    $pullAll: { pending: mongoose.Types.ObjectId(msg.connect) },
    $push: { connection: mongoose.Types.ObjectId(msg.connect) }
  })
    .then(connect => {
      callback(null, connect);
    })

    .catch(error => {
      callback(error, null);
    });
  UserModel.findByIdAndUpdate(msg.connect, {
    $pullAll: { pending: mongoose.Types.ObjectId(msg.userid) },
    $push: { connection: mongoose.Types.ObjectId(msg.userid) }
  })
    .then(success => {
      callback(null, success);
    })

    .catch(error => {
      callback(error, null);
    });
}

exports.handle_request = handle_request;
