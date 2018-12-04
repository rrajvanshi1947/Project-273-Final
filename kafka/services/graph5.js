const mongoose = require('mongoose');
var Jobs = require("../models/jobs");
var AppliedJobs = require('../models/appliedJobs');

function handle_request(msg, callback){
    console.log("Inside Graph5 at Backend", msg);
    let data = msg;
    
    AppliedJobs.aggregate([
        {
            $match: {
                // user_email: msg,
                applicationstatus: "false"
            }
        },
        {
            $group: {
                _id: '$jobid',
                count: {$sum: 1},
            }
        },
        {
            $sort: {count: 1}
        },
        { $limit: 5 }
    ], function(err, result) {
        if(err) {
            console.log("Error", err);
            callback(err,null);
        } else {
            console.log("Result: ",result);
            callback(null,result);
        }
    });    
}

exports.handle_request = handle_request;