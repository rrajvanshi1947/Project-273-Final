var mongoose= require('mongoose');
var Jobs = require("../models/jobs");

function handle_request(body, callback){
   
    console.log("Editing a job");
    console.log(body);

    var Job = Jobs.findOneAndUpdate({jobid: body.jobid}, {$set: {
                // jobid: body.jobid,      
                company: body.company,    
                job_title: body.job_title,
                location: body.location,
                job_function: body.job_function,
                employment_type: body.employment_type,
                company_industry: body.company_industry,
                seniority_level: body.seniority_level,
                job_description: body.job_description,
                // receive_applicants: body.receive_applicants,
                // legal_authorization: body.legal_authorization, 
                // sponsorship: body.sponsorship, 
                hear_about: body.hear_about,
                skills_required: body.skills_required,      //Step 2
                experience: body.experience,
                education_required: body.education_required,
                daily_budget: body.daily_budget,   //Step 3
                output: body.output,
                // pay_method: body.pay_method,
                apply: body.apply}},{new: true, upsert: true }, function(err, data){
        if(err){
        throw err
                // callback(null, err)
        // console.log(reply);
        }
        else{
        console.log('Job edited successfully\n');
        console.log(data);
        callback(null, data)
    }
    })

    console.log("after callback");
};

exports.handle_request = handle_request;