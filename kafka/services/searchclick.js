var mongoose= require('mongoose');
var Jobs = require('../models/jobs');

function handle_request(msg, callback){
    console.log("Inside Search click at Backend")
    let data = msg;
    console.log("Data :", data);
    Jobs.find({ jobid: msg.jobid})
    .then(jobdetails=>{
        console.log("jobdetails",jobdetails);    
        if( jobdetails.noofclicks==='undefined')
        {
                    jobdetails.noofclicks=1;
                    counter=jobdetails.noofclicks;
                    console.log("i am in the if block",jobdetails.noofclicks);
        }
        else
        {
            jobdetails.noofclicks++;
            counter=jobdetails.noofclicks;
            console.log("noofclicks updated in else increemnt",jobdetails.noofclicks);
        console.log("noofclicks got updated",jobdetails.noofclicks);
        }
        Jobs.findOneAndUpdate({jobid: msg.jobid},{
            $set: {
                noofclicks: counter
            }},
            {upsert: true, new: true}).then(jobdetailsupdated=>{
                console.log("Updtaed clicks successfully", jobdetailsupdated)
                callback(null,jobdetailsupdated)
            })
            .catch(err =>{
                console.log("jobdetails updtaed err", err)
                callback(err,null);
            })})
    .catch(err =>{
        console.log("no of clicks err ", err)
        callback(err,null);
    })
}

exports.handle_request = handle_request;