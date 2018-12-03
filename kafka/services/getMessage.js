const mongoose = require('mongoose');
var Message = require('../models/messages');

function handle_request(msg, callback){
    console.log("Inside get message request at Backend")
    let data = msg;
    Message.find({users:data.users})
    .then(result=>{
        if(!result){
            callback(err,null);
        } else{
            console.log(result);
            callback(null,result);
        }
    })
    .catch(err =>{
        console.log(err,"user error")
        callback(err,null);
    })
}

exports.handle_request = handle_request;