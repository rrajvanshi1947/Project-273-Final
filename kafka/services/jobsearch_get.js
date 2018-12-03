var mongoose = require('mongoose');
// var Jobs = mongoose.model('jobs');
var Jobs = require('../models/jobs');

function handle_request(msg, callback) {
    console.log("Inside Job search at kafka service")

    Jobs.find()
    .then(response =>{
        console.log("data fetched:", response);
        callback(null, response);
    })
    .catch(err => {
        console.log("Error in jobs get", err);
        callback(err, null);
    })
    // let data = msg;
    // //console.log("Data :", data);
    // console.log("Inside Job Dashboard Request");
    //Jobs.find({}, function (err, jobresult) {
    //     if (err) {
    //         res.code = "400";
    //         res.value = "the job search is not found.";
    //         //console.log(res.value);
    //         res.sendStatus(400).end();
    //         callback(err, null);
    //     } else {
    //        // console.log("jobdetails", jobdetails);
    //         console.log("I am in job  dash");
    //         var jobdetails = JSON.stringify(jobresult);
    //         callback(null, jobdetails);
    //     }
   // })
}
exports.handle_request = handle_request;