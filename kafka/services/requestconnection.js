const mongoose = require("mongoose");
mongoose.set("debug", true);
const User = require("../models/users");
function handle_request(msg, callback) {
  console.log(msg)
  let email1 = msg[0].emailID;
  let email2 = msg[1].emailID
  User.findOneAndUpdate(
    { emailID: email1 },
    {
      $push: { connections: msg[1]
      } }
    
  )
  .catch(error => {
      callback(error, null);
    });
    User.findOneAndUpdate(
      { emailID: email2 },
      {
        $push: { connections: msg[0]
        } }
      
    )
    .then(success => {
      callback(null, success);
    })

    .catch(error => {
      callback(error, null);
    });
}

exports.handle_request = handle_request;
