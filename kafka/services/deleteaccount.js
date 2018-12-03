var mongoose= require('mongoose');
var User = mongoose.model('User');

function handle_request(msg, callback){
    console.log("Inside delete account Request at Backend")
    let data = msg;
    console.log("Data :", data);
    User.deleteOne({ 
            emailID: msg
    })
    .then(response=>{ 
        console.log("deleted successfully")
        callback(null,response)
    })
    .catch(err =>{
        console.log("Couldn't delete account", err)
        callback(err,null);
    })
}

exports.handle_request = handle_request;