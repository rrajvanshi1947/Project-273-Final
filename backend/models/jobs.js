const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
//const passportLocalMongoose = require('passport-local-mongoose');
autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// var NewJob = new mongoose.Schema({
//    jobid: String,    //unsure about it  
//   company: String,    //Step 1
//   job_title: String,
//   location: String,
//   job_function: String,
//   employment_type: String,
//   company_industry: String,
//   seniority_level: String,
//   job_description: String,
//   receive_applicants: String,
//   questions: {legal_authorization: Boolean, sponsorship: Boolean }, 
//   hear_about: String,   
//   skills_required: [String],      //Step 2
//   experience: Number,
//   education_required: [String],
//   daily_budget: Number,   //Step 3
//   pay_method: String  //Final step
// })

const jobsSchema = new Schema({
  user_email: String,
  // jobs: [NewJob]
  jobid: String,    //unsure about it  
  company: String,    //Step 1
  job_title: String,
  location: String,
  job_function: String,
  employment_type: String,
  company_industry: String,
  seniority_level: String,  
  job_description: String,
  receive_applicants: String,
  legal_authorization: Boolean,
  sponsorship: Boolean, 
  hear_about: String,   
  skills_required: String,      //Step 2
  experience: Number,
  education_required: String,
  daily_budget: Number,   //Step 3
  pay_method: String  //Final step

})


mongoose.set('useCreateIndex', true)

const Jobs = mongoose.model('jobs',jobsSchema);

module.exports = Jobs;