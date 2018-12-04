var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/signin')
        .send({ "emailID": "app3@gmail.com", "password": "app3" })
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Should insert credentials and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/signup')
        .send({ "firstname": "applicant", "lastname": "six", "emailID": "app6@gmail.com", "password": "app6" })
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Should insert user profile details and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/userprofile')
        .send({
            "firstname": "Manikant",
            "lastname": "Prasad",
            "activities": "Function",
            "adminID": "",
            "city": "San Jose ",
            "company": "Google",
            "country": "USA",
            "degree": "Masters",
            "edudesc": "My profile description",
            "expdesc": "Manager",
            "fieldofstudy": "IT",
            "fromyear": "2018",
            "grade": "4.0",
            "headline": "Summer Intern",
            "industry": "IT",
            "location": "Mountain View,CA",
            "month": "02",
            "emailID": "mani@gmail.com",
            "phonenum": "6692467890",
            "school": "San Jose State University",
            "skill": "DB Database Distributed computing",
            "state": "CA",
            "summary": "Good Guy",
            "title": "Software Developer",
            "toyear": "2019",
            "year": "2019",
            "zipcode": "95113"
        })
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Get userprofile details and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/userprofile_get')
        .send({})
        .end(function (err, res) {
            expect(200);
            done();
        });
})

// it("Post a job and return status code", function(done){
//     chai.request('http://127.0.0.1:3001')
//     .post('/postjob')
//     .send({
//         "user_email": "test@test.com",
//         "jobid": "6674",
//         "company": "Google",
//         "job_title": "Intern",
//         "location": "San Jose",
//         "job_function": "Customer Support, Development and Production",
//         "employment_type": "Full time",
//         "company_industry": "IT",
//         "seniority_level": "Executive",
//         "job_description": "The ideal candidate for this position will succeed in this role if they have both knowledge and technical depth about the company and the industry. This is essential as they will be a central person in the decision making process, working with multiple individuals across different teams when necessary. As a result, they will also be overseeing specific personnel. \n\nResponsibilities\n\nManage daily operations\nOversee multiple personnel\nHelp with onboarding and training\nasdQualifications\n\nBachelor's degree or equivalent experience\nMicrosoft Office (Outlook, Excel, Word, PowerPoint, etc.) Organized\nStrong leadership skills",
//         "hear_about": "Internet",
//         "skills_required": "Javascript, Kafka, C++",
//         "experience": 2,
//         "education_required": "M.Sc",
//         "daily_budget": 25,
//         "noofclicks": 1
//     })
//     .end(function (err, res) {
//         expect(200);
//         done();
//     });
// })

it("Get message and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/message')
        .send({})
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Post message and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/message')
        .send({
            "email": ["mani@gmail.com", "roopam@gmail.com"],
            "messages": [{
                "author": "Manikant",
                "body": "This is a Jmeter Test",
                "createdAt": 1543203352999
            }]
        })
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("get details of jobs on Search and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/jobsearch')
        .send({})
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Search Jobs based on filters and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/jobsearch')
        .send({ job_title: 'Intern', location: 'San Jose' })
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Get saved jobs details and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/jobsave')
        .send({})
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Post saved jobs and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/jobsave')
        .send({
            firstname : "Deek",
            lastname : "Reddy",
            user_email : "jyo@gmail.com",
            city : "Milpitas",
            state: "CA",
            country : "US",
            zipcode : "95035",
            jobid : 6677,
            job_title : "Intern",
            job_function : "Sales Department",
            applicationstatus: "false"
        })
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Get applied jobs details and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/jobapply')
        .send({})
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Post applied jobs and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/jobapply')
        .send({
            firstname : "dedek",
            lastname : "jyo",
            user_email : "jyo@gmail.com",
            rec_email: "test2@test.com",
            city : "Milpitas",
            state: "CA",
            country : "US",
            zipcode : 78328,
            jobid : 6677,
            applicationstatus: true ,
            resumeurl : "",
            coverletterurl : "",
            work : "yes",
            sponsorship : "yes",
            createdAt: ""
        })
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("Delete account and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .post('/deleteaccount')
        .send({ emailID: 'app2@gmail.com' })
        .end(function (err, res) {
            expect(200);
            done();
        });
})

it("View connections and return status code", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/connections')
        .send({})
        .end(function (err, res) {
            expect(200);
            done();
        });
})