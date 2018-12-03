const mongoose = require("mongoose");
mongoose.set("debug", true);
const ConnectModel = require("../models/connections");
function handle_request(msg, callback) {
  console.log("Logged in user userid :", msg.userid, "email : ", msg.useremail);
  console.log("Connecting to :", msg.connect);
  ConnectModel.findOneAndUpdate(
    { email: msg.useremail },
    {
      $push: { pending: mongoose.Types.ObjectId(msg.connect) }
    }
  )
    .then(connect => {
      callback(null, connect);
    })

    .catch(error => {
      callback(error, null);
    });
  ConnectModel.findOneAndUpdate(
    { email: msg.connectemail },
    {
      $push: { pending: mongoose.Types.ObjectId(msg.userid) }
    }
  )
    .then(success => {
      callback(null, success);
    })

    .catch(error => {
      callback(error, null);
    });
}

exports.handle_request = handle_request;
