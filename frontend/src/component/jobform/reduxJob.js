import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import FileUpload from '../resume/resume';
import FileUpload1 from '../resume/cover';
import '../userprofile/userprofile.css';

//Validations
const required = value => (value || typeof value === '' ? undefined : 'Required');

//const required= value=>value;
const name = value =>
    value && !/^[a-zA-Z ]*$/.test(value) ? 'Invalid' : undefined;

const renderField = ({
    input,
    label,
    type,
    value,
    placeholder,
    meta: { touched, error, warning }
}) => (
        <div>
            <div>
                <input {...input} className="form-control" type={type} value={value} placeholder={placeholder} />
            </div>
            <div className="text-danger">
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
const field1 =({ 
input,
label,
type,
value,
placeholder,
onResumeUpload,
letter,
meta: { touched, error, warning }
}) => (
    <div>
        <div>
        <FileUpload onResumeUpload={onResumeUpload} letter={letter}/>
        </div>
        <div className="text-danger">
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const field2 =({ 
    input,
    label,
    type,
    value,
    placeholder,
    onCoverletterUpload,
    letter,
    meta: { touched, error, warning }
    }) => (
        <div>
            <div>
            <FileUpload1 onCoverletterUpload={onCoverletterUpload} letter={letter}/>
            </div>
            <div className="text-danger">
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )


const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined;


let ApplyJob = props => {
    const { handleSubmit,submitting,pristine,reset } = props;
    console.log(props)
    return (
            <div class="modal fade" id="vpModal3" tabindex="-1" role="dialog" aria-labelledby="vpModalLabel4" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="vpModalLabel3">
                            {typeof props.job!=="undefined"?
                            <center>
                                {props.job.company}
                                {props.job.job_title}
                            </center>:null}
                            </h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
        <div className="modal-body" style={{border:'1px solid grey',background:'white'}}>
        {props.applicationid!==null ?
            <div className="alert alert-success fade in">
                <a href="#" className="close" data-dismiss="alert"></a>
                <strong>Success!</strong> {`APPLICATION  ID: ${props.applicationid}`}
            </div>:null}
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <div className="col-sm-6">
                            <label for="firstname">First Name</label>
                            <Field type="text" component={renderField} className="form-control"  id="firstname" name="firstname" validate={[name]}/>
                        </div>
                        <div className="col-sm-6">
                            <label for="lastname">Last Name</label>
                            <Field type="text"  component={renderField} className="form-control" id="lastname" name="lastname" validate={[ name]}/>
                        </div>
                    </div>
                    <div className="form-group col-sm-6" >
                        <label for="Designation" style={{ marginTop: "20px" }}>Designation</label>
                        <Field style={{ height: "60px" }} component={renderField} type="text" className="form-control" id="designation" name="designation" validate={[]}/>
                    </div>
                    <div className="form-group col-sm-6">
                        <label for="city" style={{ marginTop: "20px" }}>City</label>
                        <Field type="text" className="form-control" component={renderField} id="city" name="city" validate={[]}/>
                    </div>
                    <div className="form-group col-sm-6">
                        <label for="state" style={{ marginTop: "20px" }}>State</label>
                        <Field type="text" className="form-control" component={renderField} id="state" name="state" validate={[]}/>
                    </div>
                    <div className="form-group col-sm-6">
                        <label for="country" style={{ marginTop: "20px" }}>Country/Region</label>
                        <Field type="text" component={renderField} className="form-control" id="country" name="country" validate={[]}/>
                    </div>

                    <div className="form-group col-sm-6">
                        <label for="zipcode" style={{ marginTop: "20px" }}>ZIP code</label>
                        <Field type="number" component={renderField}  className="form-control" id="zipcode" name="zipcode" validate={[]} />
                    </div>

                    <div className="form-group col-sm-6">
                        <label for="emailID" style={{ marginTop: "20px" }}>Email Address</label>
                        <Field type="text" component={renderField} className="form-control" id="emailID" name="emailID" validate={[ email]} />
                    </div>
                    <div className="form-group col-sm-6">
                        <label for="phonenum" style={{ marginTop: "20px" }}>Contact Information</label>
                        <Field type="number" component={renderField} className="form-control" id="phonenum" name="phonenum" validate={[]} />
                    </div>
                    <div className="col-sm-12">
                    <h5 style={{marginLeft:'18px'}}><b>Resume</b></h5>
                    <h5 style={{marginLeft:'18px'}}>PDF format accepted</h5>
                    <div style={{marginLeft:'18px'}}><FileUpload component={field1} onResumeUpload={props.handleResume} letter="resume"/></div>
                    </div>
                    <div className="col-sm-12">
                    <h5 style={{marginLeft:'18px'}}><b>Cover letter(Optional)</b></h5>
                    <h5 style={{marginLeft:'18px'}}>PDF format accepted</h5>
                    <div style={{marginLeft:'18px'}}><FileUpload1 onCoverletterUpload={props.handleCoverletter} letter="coverletter"/></div>
                    </div>

                    <div className="form-group col-sm-12">
                        <label for="authorization" style={{ marginTop: "20px" }}>Are you legally authorized to work in US?</label>
                        <div>
                        <label className="radio-inline"><Field type="radio"  component="input" name="work" value="Yes"/> Yes</label>
                        <label className="radio-inline"><Field type="radio" component="input" name="work" value="No"/> No</label>
                        </div>
                    </div>
                    <div className="form-group col-sm-12">
                        <label for="authorization" style={{ marginTop: "20px" }}>Will you now, or in the future, require sponsorship for employment 
                    visa status (e.g. H-1B visa status)?</label>
                    <div>
                    <label className="radio-inline"><Field type="radio" component="input" name="sponsorship" value="Yes"/> Yes</label>
                    <label className="radio-inline"><Field type="radio" name="sponsorship" component="input" value="No"/> No</label>
                    </div>
                    </div>
                    
                    <div className="form-group col-sm-12">
                       <label for="summary" style={{ marginTop: "20px" }}>Summary</label>
                        <Field style={{height: "100px"}} type="text" component={renderField} className="form-control" id="summary" name="summary" />
                    </div>
                    <div className="modal-footer col-sm-12" style={{float:'right'}}>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </form>
                </div>
                </div>
                </div>
                </div>               
                    )
                }
                
ApplyJob = reduxForm({
    // a unique name for the form
    form: 'jobform', 
})(ApplyJob)

ApplyJob = connect(
    state => ({
        initialValues: state.login.loginData, // pull initial values from account reducer
        //values: state.login,
    })
)(ApplyJob)

function mapStateToProps(state){
    return {login: state.login.loginData,applyForm:state.apply.applyForm}
}

export default connect(mapStateToProps,{})(ApplyJob);
