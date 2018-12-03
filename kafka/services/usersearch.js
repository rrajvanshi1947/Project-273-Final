var mongoose= require('mongoose');
var User = mongoose.model('User');

function handle_request(msg, callback){
    console.log("Inside User Search at Backend")
    console.log(msg)
    let data = msg.replace(/\s/g,'');
    console.log("Data :", data);
    User.find({ 'fullname' : { '$regex' : data, '$options' : 'i' }})
    .then(response=>{ 
        console.log("Users retrieved successfully", response)
        callback(null,response)
    })
    .catch(err =>{
        console.log("user profile error", err)
        callback(err,null);
    })
}

exports.handle_request = handle_request;