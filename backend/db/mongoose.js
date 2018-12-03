var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb://root:linkedin1@ds121960.mlab.com:21960/linkedin",
    { poolSize: 10000, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connection to MongoDB established");
  })
  .catch(err => {
    console.log("Connection to MongoDB unsuccessful");
  });

module.exports = { mongoose };
