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
var graph1 = require('./services/graph1');
var graph2 = require('./services/graph2');
var graph3 = require('./services/graph3');
var graph4 = require('./services/graph4');
var graph5 = require('./services/graph5');
var graph6 = require('./services/graph6');
var graph6sj = require('./services/graph6SJ');
var graph7 = require('./services/graph7');
var getviews = require('./services/getviews');
var searchclick = require('./services/searchclick');
var jobapplyuser = require('./services/jobapplybyuser');

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
handleTopicRequest("graph1", graph1);
handleTopicRequest("graph2", graph2);
handleTopicRequest("graph3", graph3);
handleTopicRequest("graph4", graph4);
handleTopicRequest("graph5", graph5);
handleTopicRequest("graph6", graph6);
handleTopicRequest("graph6sj", graph6sj);
handleTopicRequest("graph7", graph7);
handleTopicRequest("getviews", getviews);
handleTopicRequest("searchclick", searchclick);
handleTopicRequest("jobappl",jobapplyuser)
