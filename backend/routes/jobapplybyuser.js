const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');

router.get("/jobappl", function(req, res) {
    console.log("Request: ",req.query.id);
    kafka.make_request('jobappl',req.query.id, function(err,results){
        console.log('in jobapplyget result');
        console.log("results",results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside get jobapply-get  else");
            //res.writeHead(200);
            console.log(results);
            res.end(JSON.stringify(results));
            }
        
    });
})

module.exports = router;