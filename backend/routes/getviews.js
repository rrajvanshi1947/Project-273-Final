const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');

router.post("/getviews", function(req, res) {
    console.log("Inside getviews: ",req.body);

    kafka.make_request('getviews', req.body, function(err,results){
        console.log('in getviews result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside getviews else");
            // res.writeHead(200);
            // console.log(req.session.id)
            // req.session.user = results;
            // req.session.save(); 
            // res.end(JSON.stringify(req.session.user));
            res.sendStatus(200).end("Success");
            } 
    });
})

module.exports = router;
