const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
//const passportLocalMongoose = require('passport-local-mongoose');
autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

const jobsSchema = new Schema({
  user_email: String,
  jobid:{ type: Number, default: 10000, required:true },    //unsure about it  
  company: String,
  job_title: String,
  location: String,
  job_function: String,
  employment_type: String,
  company_industry: String,
  seniority_level: String,  
  job_description: String,
  hear_about: String,   
  skills_required: String,      //Step 2
  experience: Number,
  education_required: String,
  daily_budget: Number,   //Step 3
  date:{type:Date,default:Date.now},
  output:String,
  apply:String,
  noofclicks:Number,
  noofviewsnotapplied:Number
})
jobsSchema.plugin(autoIncrement.plugin, { model : 'jobsSchema' , field: 'jobid' });

mongoose.set('useCreateIndex', true)

const Jobs = mongoose.model('Jobs',jobsSchema);

module.exports = Jobs;