const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');

router.get("/graph1", function(req, res) {
    console.log("Inside graph1: ",req.query.id);

    kafka.make_request('graph1', req.query.id, function(err,results){
        console.log('in graph1 result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph1 else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            } 
    });
})

router.get("/graph2", function(req, res) {
    console.log("Inside graph2: ",req.query.id);

    kafka.make_request('graph2', req.query.id, function(err,results){
        console.log('in graph2 result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph2 else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            } 
    });
})

router.get("/graph3", function(req, res) {
    console.log("Inside graph3: ",req.query.id);

    kafka.make_request('graph3', req.query.id, function(err,results){
        console.log('in graph3 result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph3 else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            } 
    });
})

router.get("/graph4", function(req, res) {
    console.log("Inside graph4: ",req.query.id);

    kafka.make_request('graph4', req.query.id, function(err,results){
        console.log('in graph4 result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph4 else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            } 
    });
})

router.get("/graph5", function(req, res) {
    console.log("Inside graph5: ",req.query.id);

    kafka.make_request('graph5', req.query.id, function(err,results){
        console.log('in graph5 result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph5 else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            } 
    });
})

router.get("/graph6", function(req, res) {
    console.log("Inside graph6: ",req.query.id);

    kafka.make_request('graph6', req.query.id, function(err,results){
        console.log('in graph6 result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph6 else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            } 
    });
})

router.get("/graph6sj", function(req, res) {
    console.log("Inside graph6sj: ",req.query.id);

    kafka.make_request('graph6sj', req.query.id, function(err,results){
        console.log('in graph6sj result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph6sj else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            } 
    });
})

router.get("/graph7", function(req, res) {
    console.log("Inside graph7: ",req.query.id);

    kafka.make_request('graph7', req.query.id, function(err,results){
        console.log('in graph7 result');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside graph7 else");
            //res.writeHead(200);
            console.log(req.session.id)
            req.session.user = results;
            req.session.save(); 
            res.end(JSON.stringify(req.session.user));
            //res.sendStatus(200).end("Success");
            } 
    });
})
module.exports = router;