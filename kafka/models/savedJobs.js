const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
//const passportLocalMongoose = require('passport-local-mongoose');
autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

const savedJobsSchema = new Schema({
  user_email: String,
  jobid: Number,    //unsure about it  
  company: String,    //Step 1
  job_title: String,
  city_state: String,
  country: String,
  zipcode: String,
  applicationid: Number,
  job_function: [String],
  applicationstatus: String,
  resumeurl: String,
  coverletterurl: String,
  legal_authorization: Boolean,
  sponsorship: Boolean,
  hear_about: String,
  firstname: String,
  lastname: String,
})


mongoose.set('useCreateIndex', true)

const SavedJobs = mongoose.model('savedJobs',savedJobsSchema);

module.exports = SavedJobs;