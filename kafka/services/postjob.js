var mongoose = require("mongoose");
var Jobs = require("../models/jobs");

function handle_request(msg, callback) {
  console.log("Posting a new job");
  console.log(msg);

  /*var Job = new Jobs({
    user_email: body.user_email,
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
    skills_required: body.skills_required, //Step 2
    experience: body.experience,
    education_required: body.education_required,
    daily_budget: body.daily_budget, //Step 3
    output: body.output,
    // pay_method: body.pay_method,
    apply: body.apply
  });*/

  Jobs.create(msg)
  .then(response=>{
      console.log("Job posted successfully\n");
      console.log(response);
      callback(null, response);
    }
  )
  .catch(err=>{
    console.log(err)
    callback(err, null)
  })
}

exports.handle_request = handle_request;