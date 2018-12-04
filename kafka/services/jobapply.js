/*var mongoose= require('mongoose');
// var Jobs = mongoose.model('jobs');
var AppliedJobs = require('../models/appliedJobs');

function handle_request(msg, callback){
    console.log("Inside Job apply service at Backend")
    let data = msg;
    console.log("Data :", data);
    console.log("jobid",msg.jobid);
    var appliedJobs = new AppliedJobs({
      firstname : msg.firstname,
      lastname : msg.lastname,
      user_email : msg.user_email,
      rec_email:msg.rec_email,
      job_title : msg.job_title,
      city : msg.city,
      state:msg.state,
      country : msg.country,
      zipcode : msg.zipcode,
      jobid : msg.jobid,
      company : msg.company,
      job_function : msg.job_function,
      applicationstatus: msg.applicationstatus,
      resumeurl : msg.resumeurl,
      coverletterurl : msg.coverletterurl,
      legal_authorization : msg.work,
      sponsorship : msg.sponsorship,
      hear_about : msg.hear_about,
      race:msg.race,
      disability:msg.disability,
      createdAt: msg.createdAt
        });
        appliedJobs.save().then((jobdetails)=>{
        console.log("Job details applied successfully: ",jobdetails);
        callback(null,jobdetails);
        },(err)=>{
        console.log("Error applying job");
        callback(err,null);
        });
}
exports.handle_request = handle_request;*/



// var Jobs = mongoose.model('jobs');
var AppliedJobs = require('../models/appliedJobs');

var Jobs = require('../models/jobs');


function handle_request(msg, callback){
    console.log("Inside Job apply service at Backend")
    let data = msg;
    console.log("Data :", data);
    console.log("jobid",msg.jobid);
    var appliedJobs = new AppliedJobs({
      firstname : msg.firstname,
      lastname : msg.lastname,
      user_email : msg.user_email,
      rec_email:msg.rec_email,
      job_title : msg.job_title,
      city : msg.city,
      state:msg.state,
      country : msg.country,
      zipcode : msg.zipcode,
      jobid : msg.jobid,
      company : msg.company,
      job_function : msg.job_function,
      applicationstatus: msg.applicationstatus,
      resumeurl : msg.resumeurl,
      coverletterurl : msg.coverletterurl,
      legal_authorization : msg.work,
      sponsorship : msg.sponsorship,
      hear_about : msg.hear_about,
      race:msg.race,
      disability:msg.disability,
      createdAt: msg.createdAt
        });
        appliedJobs.save().then((jobdetails)=>{
        console.log("Job details applied successfully: ",jobdetails);
        Jobs.findOneAndUpdate({jobid: msg.jobid},{
          $inc: {
              noofviewsnotapplied: -1
          }},
          {upsert: true, new: true}).then(jobdetailsupdated=>{
              console.log("Updtaed clicks successfully", jobdetailsupdated)
              callback(null,jobdetailsupdated)
          })
          .catch(err =>{
              console.log("jobdetails updtaed err", err)
              callback(err,null);
          })
        callback(null,jobdetails);
        },(err)=>{
        console.log("Error applying job");
        callback(err,null);
        });
}
exports.handle_request = handle_request;