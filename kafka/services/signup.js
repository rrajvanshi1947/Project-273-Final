var mongoose= require('mongoose');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var User = mongoose.model('User');
var mysql = require('mysql');
var pool = require('../db/pool')
var crypt = require('../bcrypt/crypto')


function handle_request(msg, callback){
    console.log("Inside Sign Up Request at Backend")
    let data = msg;
    User.findOne({emailID: data.emailID ,type: data.type})
    .then(user => {
        if(user) {
            callback("error",null);		
        }
        const body = { emailID : data.emailID };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'linkedin');
        //Send back the token to the user  
    User.create({ emailID:msg.emailID, password:msg.password, firstname:msg.firstname,lastname:msg.lastname,fullname:msg.fullname,type:msg.type })
    .then(response=>{
        let output = {
          token:token,
          "emailID":data.emailID,
          "firstname": data.firstname,
          "lastname":data.lastname,
          "fullname":data.fullname,
          "city": '',
          "zipcode":'',
          "type":data.type,
          headline:'',
          adminID:'',
          city: '',
          state: '',
          country:'', 
          zipcode: '',
          phonenum:'',
          summary:'',
          school:'',
          degree:'',
          fieldofstudy: '',
          grade:'',
          activities:'',
          fromyear:'',
          toyear:'',
          edudesc:'',
          title:'',
          company:'',
          location:'',
          month:'',
          year:'',
          industry:'',
          expdesc:'',
          skill:'',
          imageURL:'',
          resumeURL:'',
          noofviews: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          connections:[]
            }
        console.log("User signed up successfully", output)
        callback(null,output)
    })
    .catch(err =>{
        console.log("user error",err)
        callback(err,null);
    })
})
.catch(err =>{
    console.log("last error")
    callback(err,null);
})

  var firstname = data.firstname;
  var lastname = data.lastname;
  var emailID = data.emailID;
  var type = data.type;
  var password = crypt.cryptPassword(data.password);

  var sql =
    "INSERT INTO users(first_name, last_name, email, password, type) VALUES(" +
    mysql.escape(firstname) +
    ", " +
    mysql.escape(lastname) +
    ", " +
    mysql.escape(emailID) +
    ", " +
    mysql.escape(password) +
    ", " +
    mysql.escape(type) +
    ");";

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
            console.log(err);
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Could not create new user");
        } else {
          console.log(`Successfully created new user in MySQL`);
        }
      });
    }
    con.release();
  });
}

exports.handle_request = handle_request;