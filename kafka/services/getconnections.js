const mongoose = require("mongoose");
mongoose.set("debug", true);
const User = require("../models/users");
function handle_request(msg, callback) {
  console.log("Logged in user email : ", msg);
  User.find({ emailID: msg })
  .then(results=>{
    console.log(results)
    callback(null, results);
  })
.catch(err => {
  callback(err,null);
})
}

exports.handle_request = handle_request;