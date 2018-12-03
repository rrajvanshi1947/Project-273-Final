const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');

router.post("/postjob", function(req, res) {
    kafka.make_request('postjob',req.body, function(err,results){
        console.log('New post job request');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside postjob else");
            //res.writeHead(200);
            // console.log(req.session.id)
            // req.session.user = results;
            // req.session.save(); 
            // res.end(JSON.stringify(req.session.user));
            res.end("Success");
            }
        
    });
})

module.exports = router;