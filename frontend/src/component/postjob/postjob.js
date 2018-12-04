import React, { Component } from 'react';
import axios from 'axios';
import {nodeURL} from '../../config';
import Header from '../header';
import PhotoUpload from '../userprofile/photo';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';

class PostJob extends Component {
    constructor() {
        super();
        this.state = {
              "user_email": "",
              jobid:"",     
                "company": "",    
                "job_title": "",
                "location": "",
                "job_function": "",
                "employment_type": "",
                "company_industry": "",
                "seniority_level": "",
                "job_description": "",
                // "receive_applicants": "",
                // "legal_authorization": "", 
                // "sponsorship": "", 
                "hear_about": "",
                "skills_required": "",      
                "experience": '',
                "education_required": "",
                "daily_budget": '', 
                // "pay_method": "",
                postjob_flag: false,
                output: '',
                apply: ''
        };
this.applyChangeHandler = this.applyChangeHandler.bind(this)

    }

    companyChangeHandler = e => this.setState({company: e.target.value})
    jobTitleChangeHandler = e => this.setState({job_title: e.target.value})
    locationChangeHandler = e => this.setState({location: e.target.value})
    jobFunctionChangeHandler = e => this.setState({job_function: e.target.value})
    employmentTypeChangeHandler = e => this.setState({employment_type: e.target.value})
    companyIndustryChangeHandler = e => this.setState({company_industry: e.target.value})
    seniorityLevelChangeHandler = e => this.setState({seniority_level: e.target.value})
    jobDescriptionChangeHandler = e => this.setState({job_description: e.target.value})
    hearAboutChangeHandler = e => this.setState({hear_about: e.target.value})
    skillsRequiredChangeHandler = e => this.setState({skills_required: e.target.value})
    experienceChangeHandler = e => this.setState({experience: e.target.value})
    educationChangeHandler = e => this.setState({education_required: e.target.value})
    budgetChangeHandler = e => this.setState({daily_budget: e.target.value})
    // companyChangeHandler = e => this.setState({company: e.target.value})
    applyChangeHandler(e){
      this.setState({apply: e.target.value})
    // console.log(this.state.apply);
    }

    handlePhoto = (urlvalue) => {
    console.log("url value",urlvalue);
    this.setState({output: urlvalue});
}

    submit = e => {
      console.log(this.state.output);
     var headers = new Headers();
     //prevent page from refresh
     e.preventDefault();
    //  if(this.state.apply === 'Yes')
    //  this.setState
    console.log("Email",this.props.login)
     const data = {
                "user_email": this.props.login.emailID,
                "jobid": Math.floor(Math.random()*10000),      
                "company": this.state.company,    
                "job_title": this.state.job_title,
                "location": this.state.location,
                "job_function": this.state.job_function,
                "employment_type": this.state.employment_type,
                "company_industry": this.state.company_industry,
                "seniority_level": this.state.seniority_level,
                "job_description": this.state.job_description,
                // "receive_applicants": this.state.,
                // "legal_authorization": "", 
                // "sponsorship": "", 
                "hear_about": this.state.hear_about,
                "skills_required": this.state.skills_required,      
                "experience": this.state.experience,
                "education_required": this.state.education_required,
                "daily_budget": this.state.daily_budget,
                output: this.state.output,
                apply: this.state.apply
                // "pay_method":
     };
     //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
     axios.post(`/postjob`, data).then(response => {
       console.log(response);
       console.log("Status Code : ", response.status);
    //    const token = response.data.token;
      // console.log(token);
    //   localStorage.setItem("jwt", token);
    //   setAuthorizationToken(token);
       if (response.status === 200) {
           alert('Job posted')
         console.log('asd');
         this.setState({
           postjob_flag: true
         });
         //window.location.reload();
       }
     });
   };

  render(){
  return(
  <div className="text-justify" style = {{"backgroundColor": "#F5FFFA"}}>
  <div>
  <Header/>
  </div>
  <div style = {{width: "55%", border: "1px solid lightgrey", "backgroundColor": "white", position: "absolute", marginLeft: "20%", marginTop: "15%", padding: "25px", margin: "25px"}} >
  <h3><strong>Step 1: </strong>What job do you want to post?</h3> 
  <br/>

  <form method="post" action="" role="form" class="form-inline">
                
  <div class="form-group">
    <label for="rg-from">Company</label>
    <input type="text" id="rg-from" name="rg-from" placeholder="Company" onChange={this.companyChangeHandler} class="form-control" />
  </div>
  <div class="form-group">
    <label for="rg-to">Job Title </label>
    <input type="text" id="rg-to" name="rg-to"  class="form-control" placeholder="Job Title" onChange={this.jobTitleChangeHandler} />
  </div>
  <br/> 
 
  </form>
    <br/>

     <form method="post" action="" role="form" class="form-inline">  <div class="form-group">
    <label for="rg-from">Location</label>
    <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder="Location" onChange={this.locationChangeHandler} />
    <br/>
  </div>
  
   <div class="form-group">
   <br/>
    <label for="rg-from">Job function (Select up to 3) </label>
    <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder="Job Function" onChange={this.jobFunctionChangeHandler} />
  </div>
  </form>
  <br/>
     <form method="post" action="" role="form" class="form-inline">  
     <div class="form-group">
    <label for="rg-from">Employment Type</label>
    <select className="form-control" name="empsearch" onChange={this.employmentTypeChangeHandler}> 
          <option value='' selected disabled>Employment Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Temporary">Temporary</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Internships">Internships</option>
      </select>
      
    <br/>
  </div>
  
   <div class="form-group">
    <label for="rg-from">Company industry</label>
    <select className="form-control" name="indsearch" onChange={this.companyIndustryChangeHandler}> 
                <option value='' selected disabled>Industry</option>
                <option value="All">All Industries</option>
                <option value="Accounting">Accounting</option>
                <option value="Airlines">Airlines</option>
                <option value="Computer Software">Computer Software</option>
                <option value="Computer Hardware">Computer Hardware</option>
                <option value="Networking">Networking</option>
                <option value="Utilities">Utilities</option>
                <option value="Transportation">Transportation</option>
            </select>
  </div>
  
  <div class="form-group">
  <br/>
    <label for="rg-from">Seniority level</label>
    <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder="Seniority Level" onChange={this.seniorityLevelChangeHandler} />
  </div>
  </form>
<br/>
  <div class="form-group">
  <label for="comment">Job description</label>
  <textarea class="form-control" rows="15" id="comment" placeholder="Job description" onChange={this.jobDescriptionChangeHandler}></textarea>
</div>

<strong>How would you like to receive your applicants?</strong>

{/* <div class="radio">
  <label><input type="radio" name="popup"  onChange={()=>this.applyChangeHandler} /><strong>Recommended:</strong> Let candidates apply easily through a dialog box</label>
    <label><input type="radio" name="redirect" onChange={this.applyChangeHandler} />Direct applicants to an external site to apply</label>

 {/*} <input type="text" id="rg-from" name="rg-from"  class="form-control" /> 
</div> */}

 <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="authorization" style={{ marginTop: "20px" }}>Let candidates apply easily through a dialog box? </label>
        <input type="radio"  onChange={this.applyChangeHandler} name="work" value="popup"/> Yes
        <input type="radio" onChange={this.applyChangeHandler} name="work" value="redirect"/> No
    </div>


<div class="form-group">
    <label for="rg-from">How did you hear about us?</label>
    <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder="" onChange={this.hearAboutChangeHandler} />
  </div>
  <div class="form-group">
  {/*}  <label for="rg-from">How would you like candidates to apply?</label>
    <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder="" onChange={this.hearAboutChangeHandler} /> 
  <select id = 'apply' onChange={this.applyChangeHandler} defaultValue = "Easy Apply" name="Gender" >
  <option value="easyapply">Easy Apply</option>
  <option value="redirect">Redirect</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select> */}
  </div>


    <h3><strong>Step 2: </strong>What are the right qualifications for your job?</h3>

    <div class="form-group">
    <label for="rg-from">What are some of the skills needed for this job? (Select up to 10)</label>
    <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder="Skills required" onChange={this.skillsRequiredChangeHandler} />
  </div>

  <div class="form-group">
    <label for="rg-from">What range of relevant experience are you looking for?</label>
    <input type="number" min="0" id="rg-from" name="rg-from"  class="form-control" placeholder="Experience in years" onChange={this.experienceChangeHandler} />
  </div>

  <div class="form-group">
    <label for="rg-from">What level of education are you looking for? (Select up to 5)</label>
    <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder="Education" onChange={this.educationChangeHandler} />
  </div>

  <h3><strong>Step 3: </strong>Set your budget, pay when candidates view your job</h3>
    <input type="number" min="0" id="rg-from" name="rg-from"  class="form-control" placeholder="Budget" onChange={this.budgetChangeHandler} />
    To reach enough candidates for this job post, we recommend $24.00 or more for your daily budget.
    <br/>
    <br/>
     <div class="form-group">
    <label for="rg-from">Company Logo:</label>
    <PhotoUpload onPhotoUpload={this.handlePhoto} >{this.state.user_email}</PhotoUpload>
  </div>
    <br/>
    <button type="submit" class="btn btn-primary" onClick = {this.submit}>Submit</button>
      </div>  
    </div>
    )
  }
}

function mapStateToProps(state){
  return {login: state.login.loginData}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PostJob);