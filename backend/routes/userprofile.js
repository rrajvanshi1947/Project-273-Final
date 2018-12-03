const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');
const User = require("../models/users");

router.post("/userprofile", function(req, res) {
    kafka.make_request('userprofile',req.body, function(err,results){
        console.log('in userprofile result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside userprofile else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            }
        
    });
})

router.get("/userprofile", function(req, res) {
    console.log("Request: ",req.query.id);

    kafka.make_request('userprofile_get',req.query.id, function(err,results){
        console.log('in userprofile result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside userprofile else");
            //res.writeHead(200);
            //console.log(req.session.id)
            //req.session.user = results;
            //req.session.save(); 
            res.end(JSON.stringify(results));
            //res.sendStatus(200).end("Success");
            }
        
    });
})

router.post("/saveimage", function(req, res) {
    kafka.make_request('saveimage',req.body, function(err,results){
        console.log('in saveimage result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside saveimage else");
            //res.writeHead(200);
            console.log(req.session.id)
            // req.session.user = results;
            // req.session.save(); 
            // res.end(JSON.stringify(req.session.user));
            res.sendStatus(200).end("Success");
            }
        
    });
})

router.get("/usersearch", function(req, res) {
    console.log("Request: ",req.query.id);
    kafka.make_request('usersearch',req.query.id, function(err,results){
        console.log('in usersearch result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside usersearch else");
            res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            }
        
    });
})

module.exports = router;