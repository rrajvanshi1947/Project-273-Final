import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import RegisterForm from '../login/registerForm';
import {Redirect,Link} from 'react-router-dom';
//import {nodeURL} from '../../config';
import Header from "../header";
import ApplyJob from '../jobform/reduxJob';
import Pagination from "react-js-pagination";

class Jobsearch extends Component {
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
          applicationid:null,
          switch: false,
          resumeurl: "",
          coverletterurl: "",
          status: "submitted",
          locoption:[],
          compoption:[],
          filteredData:[],
          itemPerPage:[],
          activePage:1,
          savedJobs:[],
          appliedJobs:0,
          appliedMessage:[]
        };  
        this.handlejobtitleChange = this.handlejobtitleChange.bind(this);
        this.handlelocationChange = this.handlelocationChange.bind(this);
      }
      componentDidMount(){
        /*axios.get(`/userprofile`, {
            params: {
                id: this.props.login.emailID
            }
        })
            .then((response) => {
                console.log("response",response.data);
                //update the state with the response data
                this.setState({
                    userprofile : response.data
                });
                console.log("UserProfile",this.state.userprofile);
                let output = {
                    firstname:response.data.firstname,
                    lastname:response.data.lastname,
                    emailID:response.data.emailID
                }
                this.props.applyForm(output);
            }); */
            axios.get(`/jobappl`, {
                params: {
                    id: this.props.login.emailID
                }
            }) 
            .then((response) => {
                console.log("response",response.data);
                //update the state with the response data
                let saved = [];
                let applied = []
                if(typeof response.data !=='undefined'){
                    for(let data of response.data){
                        console.log(data)
                        if(data.applicationstatus ==="true"){
                            applied.push(data)
                        }
                        else {
                            saved.push(data)
                        }
                    }
                }
                this.setState({
                    savedJobs : saved,
                    appliedJobs:applied
            })
        })
            .catch(err=>{
                this.setState({savedJobs:0,appliedJobs:0})
            })  
      
    }
      handlelocationChange = (e) => {
        this.setState({
          location: e.target.value
        });
      }

      handlejobtitleChange = (e) => {
        this.setState({
          jobtitle: e.target.value
        });
      }

    
    navigate(id){
        let data = this.state.joblist[id];
        console.log("job data",data.jobid);
        const clickdetails={
            jobid: data.jobid,
        }
        console.log("clickdetails",clickdetails);
        axios.defaults.withCredentials = true;
      axios.post(`/searchclick`, clickdetails)
      .then(response=> {
          console.log(response.data)
          if(response.status === 200){
              alert('click incremented successfully');
          } else {
              alert('click not incremented successfully ');
          }
      })
      .catch(err=>{
          alert('increment err not found');
      })
        console.log("Job", data)
      this.setState({job:data})
  }

    save(job){
        const jobdetailsdata = {
            firstname : this.state.userprofile.firstname,
            lastname : this.state.userprofile.lastname,
            user_email : this.state.userprofile.emailID,
            city : this.state.userprofile.city,
            state:this.state.userprofile.state,
            country : this.state.userprofile.country,
            zipcode : this.state.userprofile.zipcode,
            jobid : this.state.job.jobid,
            job_title : this.state.job.job_title,
            job_function : this.state.job.job_function,
            applicationstatus: false ,
        }
        console.log("jobdetailsdata".jobdetailsdata);
        axios.defaults.withCredentials = true;
        axios.post(`/jobapply`, jobdetailsdata)
        .then(response=> {
            console.log(response.data)
            if(response.status === 200){
                this.setState({
                    status: "submitted"
                })
                alert('Saved Job Successfully');
            } else {
                alert('Save Job Failed ');
            }
        })
        .catch(err=>{
            alert('Search not found');
        })
      
     } 
     
     submit=(values)=>{
  
        console.log(values)
        console.log(this.state.job);
        const jobdetailsdata = {
            firstname : values.firstname,
            lastname : values.lastname,
            user_email :values.emailID,
            rec_email:this.state.job.user_email,
            city : values.city,
            state:values.state,
            country : values.country,
            zipcode : values.zipcode,
            jobid : this.state.job.jobid,
            applicationstatus: true ,
            resumeurl : this.state.resumeurl,
            coverletterurl : this.state.coverletterurl,
            work : values.work,
            sponsorship : values.sponsorship,
            createdAt:Date.now()
        }
        console.log("jobdetailsdata".jobdetailsdata);
        //axios.defaults.withCredentials = true;
        axios.post(`/jobapply`, jobdetailsdata)
        .then(response=> {
            console.log(response.data)
            if(response.status === 200){
                this.setState({
                    applicationid:response.data.applicationid
                }) 
            } else {
                alert('Application  not submitted');
            }
        })
        .catch(err=>{
            alert('Search not found');
        })
      
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

    search=(values)=>{
        //e.preventDefault();
        //let values = formHandle(this.loginform);
        const data ={
            jobtitle: this.state.jobtitle,
            location: this.state.location
        }
        //axios.defaults.withCredentials = true;
        axios.post(`/jobsearch`, data)
        .then(response=> {
            console.log(response.data)
            let loc = [];
            let comp=[];
            for(let job of response.data){
                if(!loc.includes(job.location)){
                    loc.push(job.location)
                }
                if(!comp.includes(job.company)) {
                    comp.push(job.company)
                }
            }
            console.log(loc)
            if(response.status === 200){
                this.setState({
                    joblist: response.data,
                    filteredData:response.data,
                    job:response.data[0]||[],
                    itemPerPage: response.data.slice(0,10),
                    locoption:loc,
                    compoption:comp
                })
            } else {
                alert('Search else found ');
            }
        })
        .catch(err=>{
            alert('Search not found');
        })
    }

    jobapply=async(job)=>{
        console.log("current job", job);
       /*this.props.history.push({
          pathname:`/Jobform/${job.jobid}`,
          emailId: this.props.login.emailID,
          job: this.state.job
  })*/
    await this.props.jobDetails(job);
    window.open(`/Jobform/${job.jobid}/${this.state.userprofile.emailID}`, '_blank');
//this.setState({navi:<Redirect to={{ pathname : `/Jobform/${job.jobid}` , state: { someID : 'SOME_ID' } }} target="_blank" />})

   }
   selectLoc=(e)=>{
       console.log(e.target.value)
       let filters = e.target.value;
       if(filters.includes("All")){
           this.setState({filteredData:this.state.joblist,job:this.state.joblist[0]})
       } else {
       let reducedData = this.state.joblist.filter(job=>job.location === filters)
       console.log(reducedData)
        this.setState({filteredData:reducedData,itemPerPage:reducedData.slice(0,10),job:reducedData[0]})
       }
   }
   selectComp=(e)=>{
        console.log(e.target.value)
        let filters = e.target.value;
        if(filters.includes("All")){
            this.setState({filteredData:this.state.joblist,job:this.state.joblist[0]})
        } else {
        let reducedData = this.state.joblist.filter(job=>job.company === filters)
        console.log(reducedData)
        this.setState({filteredData:reducedData,itemPerPage:reducedData.slice(0,10),job:reducedData[0]})
        }
   }
   selectEmp=(e)=>{
        let filters = e.target.value;
        if(filters.includes("All")){
            this.setState({filteredData:this.state.joblist,job:this.state.joblist[0]})
        } else {
        let reducedData = this.state.joblist.filter(job=>job.employment_type === filters)
        console.log(reducedData)
        if(reducedData.length>0){
            this.setState({filteredData:reducedData,itemPerPage:reducedData.slice(0,10),job:reducedData[0]})
        } else {
            this.setState({filteredData:[],itemPerPage:[],job:[]})
        }
        }
   }
   selectInd=(e)=>{
        let filters = e.target.value;
        if(filters.includes("All")){
            this.setState({filteredData:this.state.joblist,job:this.state.joblist[0]})
        } else {
        let reducedData = this.state.joblist.filter(job=>job.company_industry === filters)
        console.log(reducedData)
        if(reducedData.length>0){
            this.setState({filteredData:reducedData,itemPerPage:reducedData.slice(0,10),job:reducedData[0]})
        } else {
            this.setState({filteredData:[],itemPerPage:[],job:[]})
        }
    }
   }
   handlePageChange=(pageNumber)=>{
    let itemList = this.state.filteredData.slice(10*(pageNumber-1),pageNumber*10)
    this.setState({activePage: pageNumber,itemPerPage:itemList}); 
}

savedJobs=()=>{
    let data = this.state.savedJobs;
    console.log(data)
    this.props.history.push({
          pathname:`/savedjob`,
          state:data,
  })
}

appliedJobs=()=>{
    this.props.history.push({
          pathname:`/appliedjob`,
          state:this.state.appliedJobs
  })
}
    render(){
        let joblistview = this.state.itemPerPage.map((job,index) => {
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
            <h5>{this.state.job.location}</h5>
            <div>{this.state.job.job_description}</div>
            <div className="col-sm-12" style={{padding:'20px'}}>
            <span style={{padding:'20px'}}><button type="button"  className="btn btn-primary btn-lg" onClick={()=>this.save(this.state.job)}>Save</button></span>
            {this.state.job.apply ==="redirect"?
            <span style={{padding: '20px'}}><button type="button"  style={{padding:'10px'}} className="btn btn-primary btn-lg" onClick={()=>this.jobapply(this.state.job)}>Apply</button></span>:
            <span style={{padding: '20px'}}><button type="button" data-toggle="modal" data-target="#vpModal3" style={{padding:'10px'}} className="btn btn-primary btn-lg">Easy Apply</button></span>
            }
          </div>
          </span>
          <ApplyJob onSubmit={this.submit} job={this.state.job} handleCoverletter={this.handleCoverletter}
              handleResume={this.handleResume} applicationid={this.state.applicationid}
          />
          </div>):null
        
          
        return (
            <div >
            <Header />   
            <div className= "col-sm-12" style={{padding:'20px'}}>         
            <span className="form-group col-xs-4">
                <input type="text" className="form-control input-lg " bsSize="large"  name="job" placeholder="Search Job" onChange={this.handlejobtitleChange} required/>
            </span>
            <span className="form-group col-xs-4" style={{paddingLeft:"10px"}}>
                <input type="text" className="form-control input-lg" name="location" placeholder="Search Location" onChange={this.handlelocationChange}  required/>
            </span>
            <button type="submit" className="btn btn-primary btn-lg" onClick={this.search} style={{marginLeft:"20px"}}>Search</button>            
            
            <div className="col-sm-12" style={{border:'3px solid black'}}>
                <Link onClick={this.savedJobs} to="#"><strong>{`${this.state.savedJobs.length} Saved Jobs`}</strong></Link>
                <Link onClick={this.appliedJobs} to="#" style={{paddingLeft:'30px'}}><strong>{`${this.state.appliedJobs.length} Applied Jobs`}</strong></Link>
            </div>
            
            <div className="col-sm-12"> Filters:
            <select className="input-lg" name="locsearch" onChange={this.selectLoc} style={{backgroundColor:'#f4f4f4',cursor:'pointer',marginLeft:'20px'}}> 
                <option value='' selected disabled>Location</option>
                <option value="All">All Locations</option>
                {this.state.locoption.map(loc=>
                    <option value={loc}>{loc}</option>
                )}
            </select>
            <select className="input-lg" name="compsearch" onChange={this.selectComp} style={{backgroundColor:'#f4f4f4',cursor:'pointer',marginLeft:'20px'}}> 
                <option value='' selected disabled>Company</option>
                <option value="All">All Companies</option>
                {this.state.compoption.map(comp=>
                    <option value={comp}>{comp}</option>
                )}
            </select>
            <select className="input-lg" name="empsearch" onChange={this.selectEmp} style={{backgroundColor:'#f4f4f4',cursor:'pointer',marginLeft:'20px'}}> 
                <option value='' selected disabled>Employment Type</option>
                <option value="All">All Employment Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Internships">Internships</option>
            </select>
            <select className="input-lg" name="indsearch" onChange={this.selectInd} style={{backgroundColor:'#f4f4f4',cursor:'pointer',marginLeft:'20px'}}> 
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
            <div className="col-sm-12" style={{border:"1px solid grey",marginTop:'20px'}}>
            {this.state.joblist.length===0? <h4 className="text-center">No Results Found</h4>:null}
            <div className="col-sm-4" style={{borderRight:'1px solid grey',height:'100%'}}>
            <div className="col-sm-offset-6">
            <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.joblist.length}
            pageRangeDisplayed={(parseInt(this.state.filteredData.length/5)+1)}
            onChange={this.handlePageChange} >     
            </Pagination>
            </div>  
                {joblistview}
            </div>
            {this.state.navi}
            <div className="col-sm-8">
            {jobDetails}
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

export default connect(mapStateToProps,mapDispatchToProps)(Jobsearch);
