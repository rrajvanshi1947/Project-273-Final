const mongoose = require('mongoose');
var User = require('../models/users');

function handle_request(msg, callback){
    console.log("Inside Graph5 at Backend", msg);
    let data = msg;
    
    User.findOne({ emailID: msg})
    .then(user=>{
        console.log("User Profile updated successfully", user);
        let output = {
           noofviews: user.noofviews
        }
        console.log("User Profile updated successfully", output);
        callback(null,output);
    })
    .catch(err =>{
        console.log("user profile error", err)
        callback(err,null);
    })
}

exports.handle_request = handle_request;