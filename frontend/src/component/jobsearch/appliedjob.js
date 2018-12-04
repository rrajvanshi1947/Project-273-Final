import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import RegisterForm from '../login/registerForm';
import {Redirect,Link} from 'react-router-dom';
import Header from "../header";

class AppliedJob extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props)
    return (
        <div>
        <Header />
        <h3> My Applied Jobs</h3>
        <div className="col-sm-12" style={{margintTop:"30px"}}>
        {typeof this.props.location.state !=='undefined' ? this.props.location.state.map(app =>
            
            <div className="col-sm-4" style={{border:'1px solid grey'}}>
                <h5>Application id: {app.applicationid}</h5>
                <h5>Job ID : {app.jobid}</h5>
                <h5>First Name: {app.firstname}</h5>
                <h5>Last Name: {app.lastname}</h5>
                <h5>Email ID: {app.emailID}</h5>
                <h5>City: {app.city}</h5>
            </div>
        
        )
         :null}
        </div>
        </div>
    )
    }
}

export default AppliedJob;