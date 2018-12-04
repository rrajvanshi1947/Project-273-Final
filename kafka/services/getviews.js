var mongoose= require('mongoose');
var User = mongoose.model('User');

function handle_request(msg, callback){
    console.log("Inside User Profile Request at Backend")
    let data = msg;
    console.log("Data :", data);
    
    User.findOneAndUpdate({ emailID: msg.emailID}, { $inc: { 
        'noofviews.29': 1}  
        } 
    )
    .then(user=>{
        console.log("User Profile updated successfully", user);
        let output = {
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
            resumeURL: user.resumeURL !=undefined ? user.resumeURL: ''
        }
        console.log("User Profile updated successfully", output);
        callback(null,output);
    })
    .catch(err =>{
        console.log("user profile error", err)
        callback(err,null);
    })
}

exports.handle_request = handle_request;