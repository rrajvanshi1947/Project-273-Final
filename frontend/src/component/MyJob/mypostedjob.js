import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
//import './jobsearch.css'; 
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import RegisterForm from '../login/registerForm';
import {Redirect,Link} from 'react-router-dom';
//import {nodeURL} from '../../config';
import Header from "../header";
import Jobform from '../jobform/jobform';


class MyPostedJob extends Component {
   
    constructor (props) {
        super(props);
        console.log(this.props);
        this.state = {
          location: null,
          jobtitle: null,
          job:[],
          errMsg:'',
          joblist: [],
          userprofile:[],
          navi:null,
          applicants:[]
        };  
      }
      componentDidMount(){
          console.log(this.props.login)
            axios.get(`/mypostedjob`, {params:{email:this.props.login.emailID}})
            .then(response=> {
                console.log(response.data)
                if(response.status === 200){
                    this.setState({
                        joblist: response.data,
                        job:response.data[0] || []
                    })
                    
                } else {
                    alert('Search else found ');
                }
            })
            .catch(err=>{
                alert('Search not found');
            })
    }

    
      navigate(id){
          let data = this.state.joblist[id];
          console.log("Job", data)
          axios.get(`/applicants`,{params:{jobid:data.jobid}})
          .then(response=>{
              console.log(response.data);
              this.setState({job:data,applicants:response.data})
          })
        
    }

    edit(jobid){
        console.log("current job id", jobid);
        this.props.history.push(`/postjob/${jobid}`)
    }
    jobapply=async(job)=>{
        console.log("current job", job);
       /*this.props.history.push({
          pathname:`/Jobform/${job.jobid}`,
          emailId: this.props.login.emailID,
          job: this.state.job
  })*/
    await this.props.jobDetails(job);
    window.open(`/Jobform/${job.jobid}`, '_blank');
//this.setState({navi:<Redirect to={{ pathname : `/Jobform/${job.jobid}` , state: { someID : 'SOME_ID' } }} target="_blank" />})

   }

   profile(appid){
       this.props.history.push(`/viewjobappliedform/${appid}`)
   }

   resume(resumeurl){
    console.log(resumeurl)
    window.open(resumeurl, '_blank');
   }

    render(){
        let joblistview = this.state.joblist.map((job,index) => {
            return (
                <li className="col-sm-12" id ={index} style={{listStyleType: 'none',borderBottom:'1px solid grey'}}>
                <div >
                   <ul style={{listStyleType: 'none'}} >
                      <li>
                         <div>
                               {this.state.jobview}
                                  <div onClick={()=>this.navigate(index)} style={{cursor:'pointer'}} >        
                                <h4 style={{color:'#337ab7'}}><strong>{job.job_title} </strong> </h4> 
                                     </div>
                                     <h5>{job.company}</h5>
                                  <h5 style={{color:'grey'}}><strong>{job.location}</strong></h5>
                            <div>
                               <p style={{fontSize:'12px'}}>
                                  {job.job_function}
                               </p>
                            </div>
                         </div>
                      </li>
                   </ul>
                </div>
             </li>
            );
          });

          let jobDetails = (this.state.job.length!==0) ?(<div className ="col-sm-12">
            <h3>{this.state.job.company}</h3>
            <span>  
            <h4>{this.state.job.job_title}</h4>
            <div>{this.state.job.job_description}</div>
            <div className="col-sm-12" style={{padding:'20px'}}>
            <span style={{padding:'20px'}}><button type="button"  className="btn btn-primary btn-lg" onClick={()=>this.edit(this.state.job.jobid)}>Edit Job</button></span>
          </div>
          </span>
          </div>):null
        let applicantDetails= null;
         if(this.state.applicants.length>0){
          applicantDetails=this.state.applicants.map(applicant=>
              (
                <div className="col-sm-12" style={{borderBottom:"1px solid grey"}}>
                <div className="col-sm-6">
                    <Link to={`/userprofile/${applicant.user_email}`}><h4><strong>{`${applicant.firstname} ${applicant.lastname}`}</strong></h4></Link>
                    <h5>{`${applicant.city}, ${applicant.state}`}</h5>
                    <h6>{`Application ID: ${applicant.applicationid}`}</h6>
                </div>  
                <div className="col-sm-6">
                    <span style={{marginTop:'20px'}}><button onClick={()=>this.resume(applicant.resumeurl)} className="btn btn-primary btn-md">View Resume</button>
                    <button onClick={()=>this.profile(applicant.applicationid)} className="btn btn-primary btn-md" style={{marginLeft:"20px"}}>View Application</button>
                    </span>
                </div>                  
                </div>
              )
          )
          }
          
        return (
            <div >
            <Header />   
            <div className= "col-sm-12" style={{padding:'20px'}}> 
            <h4 className="text-center">{`My Posted Jobs (${this.state.joblist.length})`}</h4>                    
            <div className="col-sm-12" style={{border:"1px solid grey"}}>
            <div className="col-sm-4" style={{borderRight:'1px solid grey',height:'100%'}}>
            {joblistview}
            </div>
            {this.state.navi}
            <div className="col-sm-8">
            {jobDetails}
            <div style={{border:'3px solid line'}}></div>
            <h3>{`Total Applicants ${this.state.applicants.length}`}</h3>
            {applicantDetails}
            </div>
            </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(MyPostedJob);
