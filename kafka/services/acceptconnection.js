const mongoose = require("mongoose");
mongoose.set("debug", true);
const User = require("../models/users");
function handle_request(msg, callback) {
  //console.log("Logged in user :", msg);
  let email1 = msg[0].emailID;
  let email2 = msg[1].emailID;
  
  User.findOneAndUpdate({emailID:email1, 'connections.emailID':email2}, {
    $set: { 'connections.$.buttons':'remove' },
    
  },{upsert:true})
    .then(connect => {
      console.log("Connection",connect)
      //callback(null, connect);
    })

    .catch(error => {
      callback(error, null);
    });
  User.findOneAndUpdate({emailID:email2, 'connections.emailID':email1}, {
    $set: { 'connections.$.buttons':'remove' }
  },{upsert:true})
    .then(success => {
      console.log("Success",success)
      callback(null, success);
    })

    .catch(error => {
      callback(error, null);
    });
}

exports.handle_request = handle_request;
