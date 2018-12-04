const mongoose = require('mongoose');
var Jobs = require("../models/jobs");
var AppliedJobs = require('../models/appliedJobs');

function handle_request(msg, callback){
    console.log("Inside Graph6 at Backend", msg);

    AppliedJobs.countDocuments({city: msg, applicationstatus: "true"})
    .then(response =>{
        console.log("data fetched:", response);
        callback(null, response);
    })
    .catch(err => {
        console.log("Error in Graph6    ", err);
        callback(err, null);
    })
}

exports.handle_request = handle_request;