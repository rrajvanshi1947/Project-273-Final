var mongoose = require('mongoose');
// var Jobs = mongoose.model('jobs');
var Jobs = require('../models/jobs');

function handle_request(msg, callback) {
    console.log("Inside Job search at kafka service")
    let data= msg.email;
    Jobs.find({user_email:data})
    .then(response =>{
        console.log("data fetched:", response);
        callback(null, response);
    })
    .catch(err => {
        console.log("Error in jobs get", err);
        callback(err, null);
    })
}
exports.handle_request = handle_request;