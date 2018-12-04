const mongoose = require("mongoose");
mongoose.set("debug", true);
const User = require("../models/users");

function handle_request(msg, callback) {
  let email1 = msg[0].emailID;
  let email2 = msg[1].emailID;
  
  User.findOneAndUpdate({emailID:email1}, {
    $pull: { "connections" : { emailID: email2 } } ,
    
  })
    .then(connect => {
      console.log("Connection",connect)
      //callback(null, connect);
    })

    .catch(error => {
      callback(error, null);
    });
  User.findOneAndUpdate({emailID:email2}, {
    $pull: { "connections" : { emailID: email1 } } ,
  })
    .then(success => {
      console.log("Success",success)
      callback(null, success);
    })

    .catch(error => {
      callback(error, null);
    });
}

exports.handle_request = handle_request;
