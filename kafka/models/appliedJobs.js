const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
//const passportLocalMongoose = require('passport-local-mongoose');
autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

const appliedJobsSchema = new Schema({
  user_email: String,
  jobid: Number,    //unsure about it  
  company: String,    //Step 1
  job_title: String,
  city: String,
  state:String,
  country: String,
  zipcode: String,
  applicationid: { type: Number, default: 1, required:true },
  job_function: String,
  applicationstatus: String,
  resumeurl: String,
  coverletterurl: String,
  legal_authorization: String,
  sponsorship: String,
  hear_about: String,
  firstname: String,
  lastname: String,
  race:String,
  disability:String,
  createdAt:Date
})

appliedJobsSchema.plugin(autoIncrement.plugin, { model : 'appliedJobs' , field: 'applicationid' });

mongoose.set('useCreateIndex', true)

const AppliedJobs = mongoose.model('appliedJobs',appliedJobsSchema);

module.exports = AppliedJobs;