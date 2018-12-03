const mongoose = require("mongoose");
mongoose.set("debug", true);
const ConnectModel = require("../models/connections");
function handle_request(msg, callback) {
  console.log("Logged in user email : ", msg);
  ConnectModel.find({ email: msg }, "connected")
    .populate("connected")
    .exec((error, results) => {
      if (error) callback(error, null);

      callback(null, results);
    });
}

exports.handle_request = handle_request;