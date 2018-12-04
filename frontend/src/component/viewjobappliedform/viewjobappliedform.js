import React, { Component } from 'react';
import axios from 'axios';
//import {nodeURL} from '../../config';
import Header from '../header';

class Viewjobappliedform extends Component {
    constructor(props){
        super(props);
        this.state={
            applicant: []
        }
    }
    componentDidMount(){
        axios.get(`/jobapply`, {
            params: {
                id: this.props.match.params.appid
            }
        })
            .then((response) => {
                console.log("response",response.data);
                //update the state with the response data
                this.setState({
                    applicant : response.data
                });
                console.log("Jobapplication details",this.state.applicant);
            });    
      }
    render(){
            return(
                <div>
                <Header />
                <div className="text-center">
                <h3>Application Details: {this.state.applicant.applicationid}</h3>

                </div>
                <div style={{'border-style': 'solid', 'border-width': '2px',margin:'20px'}}>
                <div class="form-group" style={{ marginLeft: "17px", width: "96%" }} >
                <div >
                    <label for="name">First Name:</label>
                    <label for="name" style={{paddingLeft:'20px'}}>{this.state.applicant.firstname}</label>
                </div>
                </div>
                <div style={{ marginLeft: "17px", width: "96%" }}>
                    <label for="name">Last Name:</label>
                    <label for="name" style={{paddingLeft: "20px"}}>{this.state.applicant.lastname}</label>
                </div>
            <div className="form-group" style={{ marginLeft: "17px" }}>
                <label for="Designation" style={{ marginTop: "10px" }}>Designation:</label>
                <label for="Designation" style={{ paddingLeft: "10px" }}>{this.state.applicant.role}</label>
            </div>
            <div className="form-group" style={{ marginLeft: "17px" }}>
                <label for="city" style={{ marginTop: "10px" }}>City:</label>
                <label for="city" style={{ paddingLeft: "10px" }}>{this.state.applicant.city}</label>
            </div>
            <div className="form-group" style={{ marginLeft: "17px" }}>
                <label for="city" style={{ marginTop: "10px" }}>State:</label>
                <label for="city" style={{ paddingLeft: "10px" }}>{this.state.applicant.state}</label>
            </div>
        
            <div className="form-group" style={{ marginLeft: "17px"}}>
                <label for="country" style={{ marginTop: "10px" }}>Country/Region:</label>
                <label for="country" style={{ marginTop: "10px",paddingLeft: "20px" }}>{this.state.applicant.country}</label>
            </div>
        
            <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
                <label for="zipcode" style={{ marginTop: "10px" }}>ZIP code:</label>
                <label for="zipcode" style={{ marginTop: "10px",paddingLeft: "20px" }}>{this.state.applicant.zipcode}</label>
            </div>
        
            <div className="form-group" style={{ marginLeft: "17px" }}>
                <label for="emailaddress" style={{ marginTop: "10px" }}>Emailaddress:</label>
                <label for="emailaddress" style={{ marginTop: "10px",paddingLeft: "20px" }}>{this.state.applicant.user_email}</label>
            </div>
            <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
                <label for="contactinfo" style={{ marginTop: "10px" }}>contact info</label>
                <label for="contactinfo" style={{ marginTop: "10px",paddingLeft: "20px" }}></label>
            </div>
            <div className="form-group" style={{ marginLeft: "17px" }}>
                <label for="Designation" style={{ marginTop: "10px" }}>Application submitted date:</label>
                <label for="Designation" style={{ paddingLeft: "10px" }}>{this.state.applicant.createdAt}</label>
            </div>
            <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
                <label for="authorization" style={{ marginTop: "10px" }}>Are you legally authorized to work in US?:</label>
                <label for="authorization" style={{ marginTop: "10px",paddingLeft: "20px" }}>{this.state.applicant.legal_authorization}</label>
            </div>
            <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
                <label for="authorization" style={{ marginTop: "10px" }}>Will you now, or in the future, require sponsorship for employment 
            visa status (e.g. H-1B visa status)?:</label>
            <label for="authorization" style={{ marginTop: "10px",paddingLeft: "20px" }}>{this.state.applicant.sponsorship}</label>
            </div>
            <div class="form-group" style={{ marginLeft: "17px", width: "94%" }}>
            <label for="rg-from">What is the race?</label>
            <label for="summary" style={{ marginTop: "10px",paddingLeft: "20px" }}>{this.state.applicant.race}</label>
            </div>
            <div class="form-group" style={{ marginLeft: "17px", width: "94%" }}>
            <label for="rg-from">Do you have disability?</label>
            <label for="disability" style={{ marginTop: "10px",paddingLeft: "20px" }}>{this.state.applicant.disability}</label>
            </div>

            <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
                <label for="summary" style={{ marginTop: "10px" }}>How did you hear about us?:</label>
                <label for="summary" style={{ marginTop: "10px",paddingLeft: "20px" }}>{this.state.applicant.hear_about}</label>
            </div>
            <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
            <label for="summary" style={{ marginTop: "10px" }}>Applicant Resume:</label>
            <a href={this.state.applicant.resumeurl}  target="_blank" ><button class="btn btn-primary">View Resume</button></a>  
            </div>
            <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
            <label for="summary" style={{ marginTop: "10px" }}>Applicant Coverletter:</label>
            <a href={this.state.applicant.coverletterurl}  target="_blank" ><button class="btn btn-primary">View Coverletter</button></a>  
            </div>

            <div className="form-group" style={{ marginLeft: "17px", width: "94%" }}>
            <label for="summary" style={{ marginTop: "10px" }}>Applicant Profile:</label>
            <a href={`/userprofile/${this.state.applicant.user_email}`}><button class="btn btn-primary">View Profile</button></a>  
            </div>
            </div>
            </div>
            )
    }
}

export default Viewjobappliedform;