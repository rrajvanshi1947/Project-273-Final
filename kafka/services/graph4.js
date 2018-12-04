const mongoose = require('mongoose');
var Jobs = require("../models/jobs");
//var AppliedJobs = require('../models/appliedJobs');

function handle_request(msg, callback){
    console.log("Inside Graph4 at Backend", msg);
    
    Jobs.find({user_email: msg})
    .select({ "jobid": 1, "noofclicks": 1, "_id": 0})
    .limit(5)
    .then(response =>{
        console.log("data fetched:", response);
        callback(null, response);
    })
    .catch(err => {
        console.log("Error in Graph4", err);
        callback(err, null);
    })
}

exports.handle_request = handle_request;