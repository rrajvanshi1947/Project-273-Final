var mongoose= require('mongoose');
var Jobs = require('../models/jobs');

function handle_request(msg, callback){
    console.log("Inside Search click at Backend")
    let data = msg;
    console.log("Data :", data);
        Jobs.findOneAndUpdate({jobid: msg.jobid},{
            $inc: {
                noofclicks: 1,
                noofviewsnotapplied: 1
            }},
            {upsert: true, new: true}).then(jobdetailsupdated=>{
                console.log("Updtaed clicks successfully", jobdetailsupdated)
                callback(null,jobdetailsupdated)
            })
            .catch(err =>{
                console.log("jobdetails updtaed err", err)
                callback(err,null);
            })
} 

exports.handle_request = handle_request;