var mongoose= require('mongoose');
var Jobs = require("../models/jobs");

function handle_request(body, callback){
   
    console.log("Editing a job");
    console.log(body);

    var Job = Jobs.findOne({jobid: body}, function(err, data){
        if(err){
        throw err
                // callback(null, err)
        // console.log(reply);
        }
        else{
        console.log('Job details fetched successfully\n');
        // console.log(data);
        callback(null, data)
    }
    })

    console.log("after callback");
};

exports.handle_request = handle_request;