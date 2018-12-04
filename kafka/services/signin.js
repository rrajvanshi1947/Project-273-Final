const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var User = require('../models/users');
var bcrypt = require('bcrypt');


function handle_request(msg, callback){
console.log("Inside Log in Request at Backend")
let data = msg;
User.findOne({emailID: data.emailID})     //,type: data.type
  .then(user => {
    if(!user) {
        callback("error",null);		
    }
        bcrypt.compare(data.password, user.password)
            .then(function(result) { 
            if (result === true) {
                const body = { emailID : user.emailID };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ body : body },'linkedin');
                let output = {
                    token:token,
                    "emailID":user.emailID,
                    "firstname": user.firstname,
                    "lastname":user.lastname,
                    "city": user.city !=undefined ? user.city:'',
                    "zipcode":user.zipcode !=undefined ? user.zipcode:'',
                    "type":user.type,
                    headline: user.headline !=undefined ? user.headline:'',
                    adminID: user.adminID !=undefined ? user.adminID:'',
                    city: user.city !=undefined ? user.city:'',
                    state: user.state !=undefined ? user.state:'',
                    country: user.country !=undefined ? user.country:'', 
                    zipcode: user.zipcode !=undefined ? user.zipcode:'',
                    phonenum:user.phonenum !=undefined ? user.phonenum:'',
                    summary: user.summary !=undefined ? user.summary:'',
                    school:user.school !=undefined ? user.school:'',
                    degree:user.degree !=undefined ? user.degree:'',
                    fieldofstudy: user.fieldofstudy !=undefined ? user.fieldofstudy:'',
                    grade: user.grade !=undefined ? user.grade:'',
                    activities: user.activities !=undefined ? user.activities:'',
                    fromyear: user.fromyear !=undefined ? user.fromyear:'',
                    toyear: user.toyear !=undefined ? user.toyear:'',
                    edudesc: user.edudesc !=undefined ? user.edudesc:'',
                    title: user.title !=undefined ? user.title:'',
                    company: user.company !=undefined ? user.company:'',
                    location: user.location !=undefined ? user.location:'',
                    month: user.month !=undefined ? user.month:'',
                    year: user.year !=undefined ? user.year:'',
                    industry: user.industry !=undefined ? user.industry:'',
                    expdesc: user.expdesc !=undefined ? user.expdesc:'',
                    skill: user.skill !=undefined ? user.skill:'',
                    imageURL: user.imageURL !=undefined ? user.imageURL:'',
                    resumeURL: user.resumeURL !=undefined ? user.resumeURL:'',
                    connections:user.connections !=undefined ? user.connections:''
                  }
                console.log("User logged in successfully", output)
                callback(null,output)
            } else  {
                callback("error",null);
            }
            })
            .catch(err=>{
                callback("error",null);
                return;
            })
        })
        .catch(err => {
            callback("error",null);
        }
)
}
exports.handle_request = handle_request;