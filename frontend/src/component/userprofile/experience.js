import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';

//Validations
const required = value => (value || typeof value === '' ? undefined : 'Required');

const name = value =>
    value && !/^[a-zA-Z ]*$/.test(value) ? 'Invalid' : undefined;

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

//Form
let Experience = props => {
    const { handleSubmit } = props;
    console.log(props);
    if (props.children[5] === "true") {
        var hideDetails = (
            <button type="button" class="btn" data-toggle="modal" data-target="#vpModal4" style={{ float: "right", marginRight: "20px" }} >
                <span class="glyphicon glyphicon-pencil" style={{ fontSize: "20px", color: "#0073b1" }}></span>
            </button>
        )
    }
    return (
        <div style = {{ height: "150px", border: "1px solid lightgrey", marginTop: "10px" }}>
            <h4 style={{marginLeft: "40px"}}> Experience</h4>
            <h5 style={{marginLeft: "40px"}}>{props.children[1]} at {props.children[2]}</h5>
            <h5 style={{marginLeft: "40px"}}>{props.children[3]} {props.children[4]} to Present</h5>
            {hideDetails}

            <div class="modal fade" id="vpModal4" tabindex="-1" role="dialog" aria-labelledby="vpModalLabel4" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="vpModalLabel4">Add experience</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ fontSize: '14px' }}>
                            <div class="modal-body">
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="title">Title</label>
                                    <Field type="text" component={renderField} id="title" name="title" validate={[required]} />
                                </div>
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="company">Company</label>
                                    <Field type="text" component={renderField} id="company" name="company" validate={[required]} />
                                </div>
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="location">Location</label>
                                    <Field type="text" component={renderField} id="location" name="location" validate={[required]} />
                                </div>
                                
                                <div class="form-group">
                                    <div className="col-sm-6">
                                        <label for="month">From month</label>
                                        <Field type="number" component={renderField} id="month" name="month" validate={[required]} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label for="year">Year </label>
                                        <Field type="number" component={renderField} id="year" name="year" validate={[required]} />
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="industry" style={{ marginTop: "20px"}}>Industry</label>
                                    <Field type="text" component={renderField} id="industry" name="industry" validate={[required]} />
                                </div>
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="expdesc">Description</label>
                                    <Field type="text" component={renderField} id="expdesc" name="expdesc" validate={[required]} />
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" >Save changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
                
Experience = reduxForm({
    // a unique name for the form
    form: 'experience',    
})(Experience)

Experience = connect(
    state => ({
      initialValues: state.profile.profileData, // pull initial values from account reducer
      values: state.login.loginData,
    }),
  )(Experience);

function mapStateToProps(state){
    return {login: state.login.loginData,profile:state.profile.profileData}
}

export default connect(mapStateToProps,{})(Experience);