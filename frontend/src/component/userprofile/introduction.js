import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import Message from './messagepop';
import {connect} from 'react-redux';
import axios from 'axios';
import FileUpload from '../resume/resume';

//Validations

const validState = value =>
  value &&
  !/^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)$/i.test(
    value
  )
    ? "Inavlid State - Only US States accepted"
    : undefined;

const validZip = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? "Invalid zip code" : undefined;

const validPhone = value =>
  value && !/^[1-9][0-9]{0,9}$/i.test(value) ? "Invalid Phone no" : undefined;



var message=null;
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

const name = value =>
    value && !/^[a-zA-Z ]*$/.test(value) ? 'Invalid' : undefined;

const required = value => (value || typeof value === '' ? undefined : 'Required');

const renderField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error, warning }
}) => (
        <div>
            <div>
                <input {...input} className="form-control" type={type} placeholder={placeholder} />
            </div>
            <div className="text-danger">
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

//Form for applicant and recruiter introduction
let Introduction = props => {   
    const { handleSubmit } = props;
    
     let isRecruiter = props.children[7];
     const isemailMatch = props.children[9];
     const url = props.children[8];
     console.log("Inside Introduction: ", isRecruiter);
     if (isRecruiter === "1") {
        var Recruiter = (
            <div>
                <div style={{ marginLeft: "16px", width: "96%" }}>
                    <label for="adminID" style={{ marginTop: "10px" }} >Admin ID</label>
                    <Field type="number" component={renderField} id="adminID" name="adminID" />
                </div>
                <div style={{ marginLeft: "16px", width: "96%" }}>
                    <label for="company" style={{ marginTop: "20px" }}>Company name</label>
                    <Field type="text" component={renderField} id="company" name="company" />
                </div>
            </div>
        )
        var uploadResume =(
            <div></div>
        )
    } else {
        var Recruiter = (
            <div style={{ marginLeft: "16px", width: "96%" }}>
                <label for="headline" style={{ marginTop: "20px" }}>Headline</label>
                <Field type="text" component={renderField} id="headline" name="headline" validate={[required]} />
            </div>
        )
        var uploadResume = (
            <div>
            <h5 style={{ marginTop: "20px", marginLeft: "16px" }}>Upload Resume</h5>
                                    <div style={{ marginLeft: '18px' }}><FileUpload onResumeUpload={props.handleResume} letter="resume" /> {props.children[10]}</div>
            
            </div>
        )
    }



    let connect = (<button onClick={props.connect} style={{  height: "40px", width: "200px", fontSize: "16px", marginTop: "30px" }} className={(isemailMatch === "false") ? 'btn btn-primary' : 'hidden'}>Connect</button>);
    let showButton = typeof props.but!=="undefined"? props.but.buttons:"";

    if(props.pending === true || showButton==="pending"){
        connect = ( <button style={{  height: "40px", width: "200px", fontSize: "16px", marginTop: "30px" }} className={(isemailMatch === "false") ? 'btn btn-warning' : 'hidden'}>Pending</button>)
    }

    if(showButton==="accept"){
        connect = ( <span><button onClick={props.accept} style={{  height: "40px", width: "200px", fontSize: "16px", marginTop: "30px" }} className={(isemailMatch === "false") ? 'btn btn-primary' : 'hidden'}>Accept</button>
         <button onClick={props.deleteCon} style={{  height: "40px", width: "200px", fontSize: "16px", marginTop: "30px" }} className={(isemailMatch === "false") ? 'btn btn-warning' : 'hidden'}>Ignore</button></span>)
    }

    if(props.remove === true || showButton==="remove"){
        connect = (<span style={{color:'green'}}>You are now connected
        <button onClick={props.deleteCon} style={{  height: "40px", width: "200px", fontSize: "16px", marginTop: "30px" }} className={(isemailMatch === "false") ? 'btn btn-danger' : 'hidden'}>Remove Connection</button>
        </span>)
   }

    if (isemailMatch === "true") {
        var hideDetails = (
            <button type="button" class="btn" data-toggle="modal" data-target="#vpModal1" style={{ float: "right" }} >
                <span class="glyphicon glyphicon-pencil" style={{ fontSize: "20px", color: "#0073b1" }}></span>
            </button>
        ) 
    }

    return (
            <div style={{ backgroundColor: "white", height: "250px", marginTop: "75px", marginLeft: "30px" }}>
                <div class="col-sm-6">
                    <h3>{props.children[0]} {props.children[1]}</h3>
                    <h4>{props.children[2]}</h4>
                    <h5>{props.children[3]} {props.children[4]}</h5>
                    {connect}
                </div>
                <div class="col-sm-6">
                    {hideDetails}

                    <button type="button" class="btn" data-toggle="modal" data-target="#vpModal6" style={{ float: "right",background:"white" }} >
                        <h5 style={{ fontSize: "20px",  marginTop: "50px", marginLeft: "10px" }}> Contact Info</h5>
                    </button>
                    
                    <button style={{  height: "40px", width: "200px", fontSize: "16px", marginTop: "45px", marginLeft: "70px" }} className={(isemailMatch === "false") ? 'btn btn-primary' : 'hidden'} data-toggle="modal" data-target="#vpMessage1">Message</button>
                </div>
                <div class="modal fade vpmodal" id="vpModal1" tabindex="-1" role="dialog" aria-labelledby="vpModalLabel1" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="vpModalLabel1" >Edit Intro</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} style={{ fontSize: '14px' }}>
                                <div class="modal-body">
                                    <div className="vp-bg1"></div>
                                    <div class="form-group" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-6">
                                            <label for="firstname">First Name</label>
                                            <Field type="text" component={renderField} id="firstname" name="firstname" validate={[required, name]} />
                                        </div>
                                        <div className="col-sm-6">
                                            <label for="lastname">Last Name</label>
                                            <Field type="text" component={renderField} id="lastname" name="lastname" validate={[required, name]} />
                                        </div>
                                    </div>
                                    {Recruiter}
                                    <label style={{ marginLeft: "16px", marginTop: "20px", fontSize: "20px" }}>Address</label>
                                    <div class="form-group">
                                        <div className="col-sm-6">
                                            <label for="city">City</label>
                                            <Field type="text" component={renderField} id="city" name="city" validate={[required, name]} />
                                        </div>
                                        <div className="col-sm-6">
                                            <label for="state">State</label>
                                            <Field type="text" component={renderField} id="state" name="state" validate={[required, name,validState]} />
                                        </div>
                                    </div>
                                    <div class="form-group" >
                                        <div className="col-sm-6">
                                            <label for="country" style={{ marginTop: "20px" }}>Country</label>
                                            <Field type="text" component={renderField} id="country" name="country" validate={[required, name]} />
                                        </div>
                                        <div className="col-sm-6">
                                            <label for="zipcode" style={{ marginTop: "20px" }}>Zip code</label>
                                            <Field type="text" component={renderField} id="zipcode" name="zipcode" validate={[required]} />
                                        </div>
                                    </div>
                                    <label style={{ marginLeft: "16px", marginTop: "20px", fontSize: "20px" }}>Contact Info</label>
                                    <div class="form-group">
                                        <div className="col-sm-6">
                                            <label for="emailID">Email</label>
                                            <Field type="email" component={renderField} id="emailID" name="emailID" validate={[required, email]} />
                                        </div>
                                        <div className="col-sm-6">
                                            <label for="phonenum">Phone number</label>
                                            <Field type="number" component={renderField} id="phonenum" name="phonenum" validate={[required,validPhone]} />
                                        </div>
                                    </div>
                                    <div className={ (isRecruiter === "1") ? "hidden" : 'form-group' } style={{ marginLeft: "16px", width: "96%" }}>
                                        <label for="summary" style={{ marginTop: "10px" }}>Profile Summary</label>
                                        <Field type="text" component={renderField} id="summary" name="summary" />
                                    </div>
                                    {/*<h5 style={{ marginTop: "20px", marginLeft: "16px" }}>Upload Resume</h5>
    <div style={{ marginLeft: '18px' }}><FileUpload onResumeUpload={props.handleResume} letter="resume" /> {props.children[10]}</div> */}
                                    {uploadResume}
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary" >Save changes</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="modal fade vpmodal1" id="vpModal6" tabindex="-1" role="dialog" aria-labelledby="vpModalLabel6" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="vpModalLabel6" >{props.children[0]} {props.children[1]}</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} style={{ fontSize: '14px' }}>
                                <div class="modal-body2">
                                    <h4 style={{marginLeft: "30px", marginTop: "20px"}}>Contact Info</h4>
                                    <h5 style={{marginLeft: "30px", marginTop: "20px"}}>Email : {props.children[5]}</h5>
                                    <h5 style={{marginLeft: "30px", marginTop: "20px", marginBottom: "20px"}}>Phone number: {props.children[6]}</h5>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}


Introduction = reduxForm({
    // a unique name for the form
    form: 'introduction',
    // initialValues: data,     
})(Introduction)

Introduction = connect(
    state => ({
      initialValues: state.profile.profileData, // pull initial values from account reducer
      //values: state.login.loginData,
       
    }),
  )(Introduction);

function mapStateToProps(state){
    return {login: state.login.loginData,profile: state.profile.profileData}
}

export default connect(mapStateToProps,{})(Introduction);