const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');


router.post("/signup", function(req, res) {
    console.log("test")
  kafka.make_request('signup',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err || results==null){
        console.log("Inside err");
        res.sendStatus(401).end("Email ID already exists");
        return;
    }else{
        console.log("Inside else");
        console.log(req.session.id)
        req.session.user = results;
        req.session.save();
        res.end(JSON.stringify(results));
        }
    
});
})

module.exports = router;