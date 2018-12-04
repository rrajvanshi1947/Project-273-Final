const express = require('express')
const router = express.Router()
var kafka = require('../kafka/client');

router.post("/jobapply", function(req, res) {
    kafka.make_request('jobapply',req.body, function(err,results){
        console.log('in jobapply');
        console.log(results);
        if (err || results==null){
            console.log("Inside err");
            res.sendStatus(401).end("Wrong details");
            return;
        }else{
            console.log("Inside jobapply backend ");
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

router.get("/jobapply", function(req, res) {
    console.log("Request: ",req.query.id);
    kafka.make_request('jobapply_get',req.query.id, function(err,results){
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

// router.post("/saveimage", function(req, res) {
//     kafka.make_request('saveimage',req.body, function(err,results){
//         console.log('in saveimage result');
//         console.log(results);
//         if (err || results==null){
//             console.log("Inside err");
//             res.sendStatus(401).end("Wrong details");
//             return;clear

//         }else{
//             console.log("Inside saveimage else");
//             //res.writeHead(200);
//             console.log(req.session.id)
//             // req.session.user = results;
//             // req.session.save(); 
//             // res.end(JSON.stringify(req.session.user));
//             res.sendStatus(200).end("Success");
//             }
        
//     });
// })

module.exports = router;