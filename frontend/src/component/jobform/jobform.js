import React from 'react';
import axios from 'axios';
import FileUpload from '../resume/resume';
import FileUpload1 from '../resume/cover';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import Header from "../header";



class Jobform extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            userprofile: [],
            jobs: [],
            resumeurl: "",
            coverletterurl: "",
            work: "",
            sponsorship: "",
            race: "",
            hear_about: ""
    }
    this.handlesubmit = this.handlesubmit.bind(this);
    this.handlework = this.handlework.bind(this);
    this.handlesponsorship = this.handlesponsorship.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handledisability = this.handledisability.bind(this);
    //this.handlehearabout = this.handlehearabout.bind(this);
}

handlesubmit=(e)=>{
    console.log("state ",this.state.userprofile);
    e.preventDefault();
    const jobdetailsdata = {
        firstname : this.state.userprofile.firstname,
        lastname : this.state.userprofile.lastname,
        user_email : this.state.userprofile.emailID,
        rec_email: this.state.jobs.user_email,
        job_title: this.state.jobs.job_title,
        city: this.state.userprofile.city,
        state: this.state.userprofile.state,
        country : this.state.userprofile.country,
        zipcode : this.state.userprofile.zipcode,
        contactinfo : this.state.userprofile.phonenum,
        jobid : this.props.match.params.jobid,
        applicationstatus: true ,
        resumeurl : this.state.resumeurl,
        coverletterurl : this.state.coverletterurl,
        hear_about : this.state.hear_about,
        work : this.state.work,
        sponsorship : this.state.sponsorship,
        race: this.state.race,
        disability: this.state.disability,
        createdAt:Date.now()
}
  console.log("jobdetailsdata",jobdetailsdata);
  //axios.defaults.withCredentials = true;
  axios.post(`/jobapply`, jobdetailsdata)
  .then(response=> {
      console.log(response.data)
      if(response.status === 200){
          this.setState({
              applicationid:response.data.applicationid
          })
          alert(`Application ${response.data.applicationid} submitted successfully`);
      } else {
          alert('Application  not submitted  ');
      }
  })
  .catch(err=>{
      alert('Search not found');
  })

} 

handleChange = (e) => {
    this.setState({
     race: e.target.value
    });
  }  

  handledisability = (e) => {
    this.setState({
      disability: e.target.value
    });
  }  


handlework = (e) => {
    this.setState({
      work: e.target.value
    });
  }

  handlesponsorship = (e) => {
    this.setState({
      sponsorship: e.target.value
    });
  }  
 

handleResume = (urlvalue) => {
    console.log("url value",urlvalue);
    console.log(this.props)
    this.setState({resumeurl: urlvalue});
}

handleCoverletter = (urlvalue) => {
    console.log("coverletterurl value",urlvalue);
    this.setState({coverletterurl: urlvalue});
}

// retrieving the user profile information

componentDidMount(){ 
    console.log(this.props)
    axios.get(`/userprofile`, {
        params: {
            id: this.props.match.params.emailID
        }
    })
        .then((response) => {
            console.log("response",response.data);
            this.props.fetchLogin(response);
            //update the state with the response data
            this.setState({
                userprofile : response.data
            });
            console.log("UserProfile",this.state.userprofile);
        });    

    axios.get(`/jobsearch`)
    .then(response=> {
        console.log(response.data)
        if(response.status === 200){
            let job = response.data.filter(job=> job.jobid === parseInt(this.props.match.params.jobid))
            console.log(job)
            this.setState({jobs:job[0]})
            this.props.jobDetails(job[0])
        }
    })
}

handleUserInput=(e) =>{
    console.log("change handler")
    console.log(e.target.name,e.target.value)
    this.setState({
        [e.target.name]:e.target.value})
  }

  handleexistingresume =(e) =>{
    console.log("change handler in resume")
    this.setState({
        resumeurl: this.state.userprofile.resumeURL
  })}


render() {
return (
    <div>
    <Header/>
<div class="modal-body">
<div className="vp-bg1new" >    
<div style={{left: 0}}>{`APPLICATION  ID: ${this.state.applicationid}`}</div>
<center>

<h4>{typeof this.props.job!=="undefined"? this.props.job.company:null}</h4>
<h5>{typeof this.props.job!=="undefined"?this.props.job.job_title:null}</h5> 

</center>
</div>
<form className="vp-form1" style={{ fontSize: '14px',height: '200px' }}>
    <div class="form-group">
        <div className="col-sm-6">
            <label for="name">First Name</label>
            <input type="text" onChange={this.handleUserInput} className="form-control"  id="first_name" name="firstname" defaultValue={this.state.userprofile.firstname} placeholder="First Name" />
        </div>
        <div className="col-sm-6">
            <label for="name">Last Name</label>
            <input type="text"  onChange={this.handleUserInput} className="form-control" id="last_name" name="lastname" placeholder="Last Name" value={this.state.userprofile.lastname} />
        </div>
    </div>
    <div className="form-group" style={{ marginLeft: "17px", width: "96%" }}>
        <label for="Designation" style={{ marginTop: "20px" }}>Designation</label>
        <input style={{ height: "60px" }} onChange={this.handleUserInput} type="text" className="form-control" id="designation" name="designation" placeholder="Designation" />
    </div>
    <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="city" style={{ marginTop: "20px" }}>City/State</label>
        <input type="text" className="form-control" onChange={this.handleUserInput} id="city_state" name="city_state" value={this.state.userprofile.city} />
    </div>

    <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="country" style={{ marginTop: "20px" }}>Country/Region</label>
        <input type="text" onChange={this.handleUserInput} className="form-control" id="country" name="country" value={this.state.userprofile.country} />
    </div>
    <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="zipcode" style={{ marginTop: "20px" }}>ZIP code</label>
        <input type="text" onChange={this.handleUserInput}  className="form-control" id="zipcode" name="zipcode" value={this.state.userprofile.zipcode}/>
    </div>

    <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="emailaddress" style={{ marginTop: "20px" }}>Emailaddress</label>
        <input type="text" onChange={this.handleUserInput}  className="form-control" id="emailaddress" name="emailaddress" value={this.state.userprofile.emailID} />
    </div>
    <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="contactinfo" style={{ marginTop: "20px" }}>contact info</label>
        <input type="text" onChange={this.handleUserInput} className="form-control" value={this.state.userprofile.phonenum} id="contactinfo" name="contactinfo" />
    </div>
    

    <input type="radio" name ="resume" onChange={this.handleexistingresume}/>
    <h5 style={{marginLeft:'18px'}}><b>Use Existing Resume</b></h5>


    <h5 style={{marginLeft:'18px'}}><b>Resume</b></h5>
    <h5 style={{marginLeft:'18px'}}>PDF format accepted</h5>
    <input type="radio" name="resume" onChange={this.handleexistingresume}/>
    <div style={{marginLeft:'18px'}}>
    <FileUpload onResumeUpload={this.handleResume} letter="resume"/>
    </div>
    
    
    <h5 style={{marginLeft:'18px'}}><b>Cover letter(Optional)</b></h5>
    <h5 style={{marginLeft:'18px'}}>PDF format accepted</h5>
    <div style={{marginLeft:'18px'}}>
    <FileUpload1 onCoverletterUpload={this.handleCoverletter} letter1="coverletter"/></div>


    <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="authorization" style={{ marginTop: "20px" }}>Are you legally authorized to work in US?</label>
        <input type="radio"  onChange={this.handlework} name="work" value="Yes"/> Yes
        <input type="radio" onChange={this.handlework} name="work" value="No"/> No
    </div>
    <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="authorization" style={{ marginTop: "20px" }}>Will you now, or in the future, require sponsorship for employment 
    visa status (e.g. H-1B visa status)?</label>
        <input type="radio" onChange={this.handlesponsorship} name="sponsorship" value="Yes"/> Yes
        <input type="radio" name="sponsorship" onChange={this.handlesponsorship} value="No"/> No
    </div>
    
    <div class="form-group" style={{ marginLeft: "17px", width: "94%" }}>
    <label for="rg-from">How did you hear about us?</label>
    <input type="text"  id="rg-from" name="hear_about"  class="form-control" placeholder="" onChange={this.handleUserInput} />
    </div>
    
    <div class="form-group" style={{ marginLeft: "17px", width: "94%" }}>
    <label for="rg-from">What race you belongs to</label>
    <select name="race" onChange={this.handleUserInput}>
    <option value='' selected disabled>Select</option>
    <option value="Espanial">Espanial</option>
    <option value="Asian">Asian</option>
    <option  value="Latino">Latino</option>
    <option value="notasian">Not Asian</option>
    <option value="notasian">Others</option>
    </select>
    </div>

    

    <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
        <label for="authorization" style={{ marginTop: "20px" }}>Do, you have any kind of disability</label><br/>
        <input type="radio" onChange={this.handleUserInput} name="disability" value="Yes"/> yes,I have disability<br/>
        <input type="radio" name="disability" onChange={ this.handleUserInput} value="No"/> No,I dont have any disability<br/>
        <input type="radio" name="disability" onChange={ this.handleUserInput} value="other"/> Don't want to disclose<br/>
    </div>

</form>
</div>
<div class="modal-footer">
    <button type="button" onClick={this.handlesubmit} class="btn btn-primary">Submit</button>
</div>
</div>
)
}
}

function mapStateToProps(state){
    return {login: state.login.loginData,job:state.job.jobData}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Jobform);































