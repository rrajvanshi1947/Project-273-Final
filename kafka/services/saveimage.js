var mongoose= require('mongoose');
var User = mongoose.model('User');

function handle_request(msg, callback){
    console.log("Inside Save Image Request at Backend")
    let data = msg;
    console.log("Data :", data);
    User.updateOne({ emailID: msg.emailID }, { $set: {imageURL: msg.imageURL}})
    .then(response=>{ 
        console.log("Save Image retrieved successfully", response)
        callback(null,response)
    })
    .catch(err =>{
        console.log("user profile error", err)
        callback(err,null);
    })
}

exports.handle_request = handle_request;