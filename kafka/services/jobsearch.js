var mongoose= require('mongoose');
// var Jobs = mongoose.model('jobs');
var Jobs = require('../models/jobs');

function handle_request(msg, callback){
    console.log("Inside Job search at Backend")
    let data = msg;
    console.log("Data :", data);
    console.log("Inside Job Dashboard Request");
    console.log("jobtitle",msg.jobtitle);
    console.log("loc",msg.location);
    var location = msg.location!==null?msg.location.replace(/\s/g,''):null;
    var jobtitle = msg.jobtitle!==null?msg.jobtitle.replace(/\s/g,''):null;
    Jobs.find({"location": { '$regex' : location, '$options' : 'i' },
                    "job_title": { '$regex' : jobtitle, '$options' : 'i' }
            },function(err,jobresult){
            if (err) {
                callback(err,null);
            } else {
                console.log("jobdetails",jobdetails);
                console.log("I am in job  dash");
                var jobdetails=JSON.stringify(jobresult);
                callback(null,jobdetails);
            }
        })
}
exports.handle_request = handle_request;