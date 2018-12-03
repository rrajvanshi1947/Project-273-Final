const mongoose = require("mongoose");
mongoose.set("debug", true);
const UserModel = require("../models/users");
function handle_request(msg, callback) {
  console.log("Message :", msg);
}

exports.handle_request = handle_request;
