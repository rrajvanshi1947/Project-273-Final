const mongoose = require("mongoose");
mongoose.set("debug", true);
const UserModel = require("../models/users");
function handle_request(msg, callback) {
  console.log("Logged in user :", msg.userid);
  UserModel.findByIdAndUpdate(msg.userid, {
    $pullAll: { connection: [mongoose.Types.ObjectId(msg.remove)] }
  })
    .then(success => {
      callback(null, success);
    })

    .catch(error => {
      callback(error, null);
    });
}

exports.handle_request = handle_request;
