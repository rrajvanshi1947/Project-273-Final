const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');

router.post("/signin", function(req, res) {
    kafka.make_request('signin',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong username/password");
            return;
        }else{
            console.log("Inside else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            /*res.sendStatus(200).end("OK");*/
            }
        
    });
})

router.get("/mypostedjob", function(req, res) {
    kafka.make_request('myjob', req.query, function(err,results){
        console.log('in getting my posted job result');
        console.log("results",results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside get job else");
            //res.writeHead(200);
            console.log(results);
            res.json(results);
            }
        
    });
})

router.get('/session',function(req, res){

    console.log("===============>",req.session.id);
    console.log(req.session.user)

    res.json(req.session.user);
    res.end();
})

router.post("/logout", function(req, res) {
    console.log("Inside Logout Route at server")
    req.session.user = '';
    req.session.destroy();
    res.end();
})

module.exports = router;