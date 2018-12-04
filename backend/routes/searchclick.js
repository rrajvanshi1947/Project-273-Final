const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');

router.post("/searchclick", function(req, res) {
    kafka.make_request('searchclick',req.body, function(err,results){
        console.log('in searchclick');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside searchclick backend  ");
            //res.writeHead(200);
            console.log("results",results);
            console.log("typeof",typeof(results));

            // req.session.user = results;
            // req.session.save(); 
            res.end(JSON.stringify(results));
            // res.sendStatus(200).end("Success");
            }
        
    });
})

module.exports = router;