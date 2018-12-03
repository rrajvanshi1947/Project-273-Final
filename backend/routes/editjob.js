const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');

router.get("/editjob", function(req, res) {
    console.log("Request: ",req.query.id);
    kafka.make_request('editjob',req.query.id, function(err,results){
        console.log('in editjob result');
        console.log("results",results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside get editjob else");
            res.writeHead(200);
            // console.log(results);
            res.end(JSON.stringify(results));
            }
        
    });
})

router.post("/editjob", function(req, res) {
    kafka.make_request('editjobupdate',req.body, function(err,results){
        console.log('New edit job request');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside editjob else");
            //res.writeHead(200);
            // console.log(req.session.id)
            // req.session.user = results;
            // req.session.save(); 
            // res.end(JSON.stringify(req.session.user));
            res.sendStatus(200).end("Success");
            }
        
    });
})



module.exports = router;