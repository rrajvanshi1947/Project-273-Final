const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');

router.get("/applicants", function(req, res) {
    console.log("Request: ",req.query.jobid);
    kafka.make_request('applicants',req.query.jobid, function(err,results){
        console.log('in applicant get result');
        console.log("results",results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside get applicant  else");
            console.log(results);
            res.end(JSON.stringify(results));
            }
    })
    });

module.exports = router;