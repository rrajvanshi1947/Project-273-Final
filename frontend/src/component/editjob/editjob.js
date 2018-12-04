import React, { Component } from "react";
import axios from "axios";
import { nodeURL } from "../../config";
import Header from "../header";
import PhotoUpload from "../userprofile/photo";
import PostJob from "../postjob/postjob";

class EditJob extends Component {
  constructor() {
    super();
    this.state = {
      job: {},
      // user_email: ""
      "user_email": "",
      //"jobid": "",      
      "company": "",    
      "job_title": "",
      "location": "",
      "job_function": "",
      "employment_type": "",
      "company_industry": "",
      "seniority_level": "",
      "job_description": "",
      "receive_applicants": "",
      "legal_authorization": "", 
      "sponsorship": "", 
      "hear_about": "",
      "skills_required": "",      
      "experience": '',
      "education_required": "",
      "daily_budget": '', 
      "pay_method": "",
      postjob_flag: false,
      output: '',
      apply: ''
};
  }

  componentDidMount() {
    axios
      .get(`/editjob`, {
            params: {
                id: this.props.match.params.jobid
            }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          job: response.data
        });
      });
  }

  onChangeHandler=(e)=>{
    this.setState({[e.target.name]:e.target.value})
    console.log(e.target.value)
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
    console.log(this.state.company)
     const data = {
                "jobid": this.props.match.params.jobid,      
                "company": this.state.company===''?this.state.job.company:this.state.company,    
                "job_title": this.state.job_title===''?this.state.job.job_title:this.state.job_title,
                "location": this.state.location===''?this.state.job.location:this.state.location,
                "job_function": this.state.job_function===''?this.state.job.job_function:this.state.job_function,
                "employment_type": this.state.employment_type===''?this.state.job.employment_type:this.state.employment_type,
                "company_industry": this.state.company_industry===''?this.state.job.company_industry:this.state.company_industry,
                "seniority_level": this.state.seniority_level===''?this.state.job.seniority_level:this.state.seniority_level,
                "job_description": this.state.job_description===''?this.state.job.job_description:this.state.job_description,
                // "receive_applicants": this.state.,
                // "legal_authorization": "", 
                // "sponsorship": "", 
                "hear_about": this.state.hear_about===''?this.state.job.hear_about:this.state.hear_about,
                "skills_required": this.state.skills_required===''?this.state.job.skills_required:this.state.skills_required,      
                "experience": this.state.experience===''?this.state.job.experience:this.state.experience,
                "education_required": this.state.education_required===''?this.state.job.company:this.state.company,
                "daily_budget": this.state.daily_budget===''?this.state.job.daily_budget:this.state.daily_budget,
                output: this.state.output===''?this.state.job.output:this.state.output,
                apply: this.state.apply===''?this.state.job.apply:this.state.apply
                // "pay_method":
     };
     //set the with credentials to true
     //axios.defaults.withCredentials = true;
     //make a post request with the user data
     axios.post(`/editjob`, data).then(response => {
       console.log(response);
       console.log("Status Code : ", response.status);
    //    const token = response.data.token;
      // console.log(token);
    //   localStorage.setItem("jwt", token);
    //   setAuthorizationToken(token);
       if (response.status === 200) {
           alert('Job updated successfully')
         console.log('asd');
         this.setState({
           postjob_flag: true
         });
         //window.location.reload();
       }
     });
   };

  render() {
    // let details = this.state.job.map(job => {
      return (
        <div className="text-justify" style={{ backgroundColor: "#F5FFFA" }}>
          <div>
            <Header />
          </div>
          <div
            style={{
              width: "55%",
              border: "1px solid lightgrey",
              backgroundColor: "white",
              position: "absolute",
              marginLeft: "20%",
              marginTop: "15%",
              padding: "25px",
              margin: "25px"
            }}
          >
            <h3>
              <strong>Step 1: </strong>What job do you want to post?
            </h3>
            <br />
            <form method="post" action="" role="form" class="form-inline">
              <div class="form-group">
                <label for="rg-from">Company</label>
                <input
                  type="text"
                  id="rg-from"
                  name="company"
                  placeholder="Company"
                  onChange={this.onChangeHandler}
                  class="form-control"
                  defaultValue={this.state.job.company}
                />
              </div>
              <div class="form-group">
                <label for="rg-to">Job Title </label>
                <input
                  type="text"
                  id="rg-to"
                  name="job_title"
                  class="form-control"
                  placeholder="Job Title"
                  onChange={this.onChangeHandler}
                  defaultValue={this.state.job.job_title}
                />
              </div>
              <br />
            </form>
            <br />
            <form method="post" action="" role="form" class="form-inline">
              {" "}
              <div class="form-group">
                <label for="rg-from">Location</label>
                <input
                  type="text"
                  id="rg-from"
                  name="location"
                  class="form-control"
                  placeholder="Location"
                  onChange={this.onChangeHandler}
                  defaultValue={this.state.job.location}
                />
                <br />
              </div>
              <div class="form-group">
                <br />
                <label for="rg-from">Job function (Select up to 3) </label>
                <input
                  type="text"
                  id="rg-from"
                  name="job_function"
                  class="form-control"
                  placeholder="Job Function"
                  onChange={this.onChangeHandler}
                  defaultValue={this.state.job.job_function}
                />
              </div>
            </form>
            <br />
            <form method="post" action="" role="form" class="form-inline">
              {" "}
              <div class="form-group">
                <label for="rg-from">Employment Type</label>
          <select className="form-control" name="employment_type" onChange={this.onChangeHandler} value={this.state.job.employment_type}> 
          <option value='' selected disabled>Employment Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Temporary">Temporary</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Internships">Internships</option>
      </select>
                <br />
              </div>
              <div class="form-group">
                <label for="rg-from">Company industry</label>
                <select className="form-control" name="company_industry" onChange={this.onChangeHandler} value={this.state.job.company_industry}> 
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
                <br />
                <label for="rg-from">Seniority level</label>
                <input
                  type="text"
                  id="rg-from"
                  name="seniority_level"
                  class="form-control"
                  placeholder="Seniority Level"
                  onChange={this.onChangeHandler}
                  defaultValue={this.state.job.seniority_level}
                />
              </div>
            </form>
            <br />
            <div class="form-group">
              <label for="comment">Job description</label>
              <textarea
                class="form-control"
                rows="15"
                name="job_description"
                id="comment"
                placeholder={this.state.job.job_description}
                onChange={this.onChangeHandler}
                
              ></textarea>
            </div>
            <strong>How would you like to receive your applicants?</strong>
            <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="authorization" style={{ marginTop: "20px" }}>Let candidates apply easily through a dialog box? </label>
        <input type="radio"  onChange={this.onChangeHandler} name="apply" value="popup"  /> Yes
        <input type="radio" onChange={this.onChangeHandler} name="apply" value="redirect" checked={this.state.job.apply === 'redirect'} /> No
    </div>
            <div class="form-group">
              <label for="rg-from">How did you hear about us?</label>
              <input
                type="text"
                id="rg-from"
                name="hear_about"
                class="form-control"
                placeholder=""
                onChange={this.onChangeHandler}
                defaultValue={this.state.job.hear_about}
              />
            </div>
            <h3>
              <strong>Step 2: </strong>What are the right qualifications for
              your job?
            </h3>
            <div class="form-group">
              <label for="rg-from">
                What are some of the skills needed for this job? (Select up to
                10)
              </label>
              <input
                type="text"
                id="rg-from"
                name="skills_required"
                class="form-control"
                placeholder="Skills required"
                onChange={this.onChangeHandler}
                defaultValue={this.state.job.skills_required}
              />
            </div>
            <div class="form-group">
              <label for="rg-from">
                What range of relevant experience are you looking for?
              </label>
              <input
                type="number"
                min="0"
                id="rg-from"
                name="experience"
                class="form-control"
                placeholder="Experience in years"
                onChange={this.onChangeHandler}
                defaultValue={this.state.job.experience}
              />
            </div>
            <div class="form-group">
              <label for="rg-from">
                What level of education are you looking for? (Select up to 5)
              </label>
              <input
                type="text"
                id="rg-from"
                name="education_required"
                class="form-control"
                placeholder="Education"
                onChange={this.onChangeHandler}
                defaultValue={this.state.job.education_required}
              />
            </div>
            <h3>
              <strong>Step 3: </strong>Set your budget, pay when candidates view
              your job
            </h3>
            <input
              type="number"
              min="0"
              id="rg-from"
              name="daily_budget"
              class="form-control"
              placeholder="Budget"
              onChange={this.onChangeHandler}
              defaultValue={this.state.job.daily_budget}
            />
            To reach enough candidates for this job post, we recommend $24.00 or
            more for your daily budget.
            <br />
            <br />
            <div class="form-group">
              <label for="rg-from">Company Logo:</label>
              <PhotoUpload onPhotoUpload={this.handlePhoto}>
                {this.state.user_email}
              </PhotoUpload>
            </div>
            <br />
            <button type="submit" class="btn btn-primary" onClick={this.submit}>
              Submit
            </button>
          </div>
        </div>
      );
  }
}
export default EditJob;