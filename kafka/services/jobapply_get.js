var mongoose= require('mongoose');
var AppliedJobs = require('../models/appliedJobs');

function handle_request(msg, callback){
    console.log("Inside Get applied jobs Request at Backend")
    let data = msg;
    console.log("Data :", data);
    AppliedJobs.findOne({ 
            applicationid: msg
    })
    .then(response=>{ 
        console.log("Jobs retrieved successfully", response)
        callback(null,response)
    })
    .catch(err =>{
        console.log("get applied jobs error", err)
        callback(err,null);
    })
}

exports.handle_request = handle_request;