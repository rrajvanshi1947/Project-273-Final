import React from 'react';
import { Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';

const fields = ['email','password']

//Validations
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

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
        <input {...input} className="form-control" type={type} placeholder={placeholder}/>
      </div>
      <div className="text-danger">
      {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
        </div>
    </div>
  )
  const radioField = ({
      input, type, value, name,
      meta: { touched, error, warning }
  }) => (
    <div>   
      <div>
        <input {...input} type={type} name={name} value={value} defaultChecked={true}/>
      </div>
    </div>
  )
//Form
let RegisterForm = props => {
    const {handleSubmit,pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit} style={{fontSize:'12px'}}>
                    <div className="form-group">
                        <label for="name">First Name</label>
                        <Field type="text" component={renderField} id="firstname" name="firstname" validate={[required]}/>
                    </div>
                    <div className="form-group">
                        <label for="name">Last Name</label>
                        <Field type="text" component={renderField} id="lastname" name="lastname" validate={[required]}/>
                    </div>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <Field type="email" component={renderField} id="emailID" name="emailID" validate={[required, email]}/>
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password</label>
                        <Field type="password" component={renderField} id="pwd" name="password" validate={[required]}/>
                    </div>
                    <div >
                        <label className="radio-inline"><Field type="radio" component= "input" name="type" value="0"/>Applicant</label>
                        <label className="radio-inline"><Field type="radio" component= "input" name="type" value = "1"/>Recruiter</label>   
                    </div>
                    <div className="text-center" style={{fontSize:"12px"}}>
                    <span>By clicking Join now, you agree to the LinkedIn User Agreement, </span>
                    <span>Privacy Policy, and Cookie Policy. </span>
                    </div>
                    <div>
                    <button type="submit" className="btn btn-primary form-control" style={{marginBottom:"10px"}}>Join Now</button>
                    </div>  
                </form>
    )
}

RegisterForm = reduxForm({
    // a unique name for the form
    form: 'registerform',
    // initialValues: data,     
})(RegisterForm)

export default RegisterForm;