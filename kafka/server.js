var connection = new require("./kafka/connection");
var { mongoose } = require("./db/mongoose");
var pool = require("./db/pool");

//topics files
var signup = require("./services/signup");
var signin = require("./services/signin");
var postMessage = require("./services/postMessage");
var getMessage = require("./services/getMessage");
var userprofile = require("./services/userprofile");
var userprofile_get = require("./services/userprofile_get");
var saveimage = require("./services/saveimage");
var makeConnection = require("./services/makeconnection");
var jobsearch = require("./services/jobsearch");
var jobsearch_get = require("./services/jobsearch_get");
var jobapply = require("./services/jobapply");
var jobapply_get = require("./services/jobapply_get");
// var jobsave_get = require("./services/jobsave_get");
var jobsave = require("./services/jobsave");
var userSearch= require('./services/usersearch');
var deleteaccount = require("./services/deleteaccount");
var postJob = require('./services/postjob');
var MyPostedJob = require('./services/mypostedjob');
var applicants = require('./services/applicants');
var postJob = require('./services/postjob');
var editJob = require('./services/editjob');
var editJobUpdate = require('./services/editjobupdate');
var requestCon = require("./services/requestconnection");
var acceptCon = require("./services/acceptconnection");
var removeCon = require("./services/removeconnection");
var getCon = require("./services/getconnections");

console.log("server is running ");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    fname.handle_request(data.data, function(err, res) {
      console.log("after handle\n" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signup", signup);
handleTopicRequest("signin", signin);
handleTopicRequest("postmessage", postMessage);
handleTopicRequest("getmessage", getMessage);
handleTopicRequest("userprofile", userprofile);
handleTopicRequest("userprofile_get", userprofile_get);
handleTopicRequest("saveimage", saveimage);
handleTopicRequest("makeConnection", makeConnection);
handleTopicRequest("jobsearch", jobsearch);
handleTopicRequest("jobsearch_get", jobsearch_get);
handleTopicRequest("jobapply_get", jobapply_get);
handleTopicRequest("jobapply", jobapply);
handleTopicRequest("jobsave", jobsave);
// handleTopicRequest("jobsave_get", jobsave_get);
handleTopicRequest("usersearch",userSearch);
handleTopicRequest("deleteaccount", deleteaccount);
// handleTopicRequest("jobsave_get", jobsave_get);
handleTopicRequest("postjob", postJob)
handleTopicRequest("myjob",MyPostedJob)
handleTopicRequest("applicants",applicants)
handleTopicRequest("postjob", postJob)
handleTopicRequest("editjob", editJob)
handleTopicRequest("editjobupdate", editJobUpdate)
handleTopicRequest("requestCon", requestCon);
handleTopicRequest("acceptCon", acceptCon);
handleTopicRequest("removeCon", removeCon);
handleTopicRequest("getCon", getCon);