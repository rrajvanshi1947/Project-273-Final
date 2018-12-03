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
let Education = props => {
    const { handleSubmit } = props;
    console.log("Props : ", props.children)
    if (props.children[4] === "true") {
        var hideDetails = (
            <button type="button" class="btn" data-toggle="modal" data-target="#vpModal3" style={{ float: "right", marginRight: "20px"}} >
                    <span class="glyphicon glyphicon-pencil" style={{ fontSize: "20px", color: "#0073b1" }}></span>
                </button>
        ) 
    }
    return (
        <div style={{ height: "150px", border: "1px solid lightgrey", marginTop: "10px" }}>
                <h4 style={{marginLeft: "40px"}}> Education</h4>
                <h5 style={{marginLeft: "40px"}}>{props.children[1]}</h5>
                <h5 style={{marginLeft: "40px"}}>{props.children[2]} - {props.children[3]}</h5>

                {hideDetails}

                <div class="modal fade" id="vpModal3" tabindex="-1" role="dialog" aria-labelledby="vpModalLabel3" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="vpModalLabel3">Add education</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <form onSubmit={handleSubmit} style={{ fontSize: '14px' }}>
                            <div class="modal-body">
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="school">School</label>
                                    <Field type="text" component={renderField} id="school" name="school" validate={[required, name]} />
                                </div>
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="degree">Degree</label>
                                    <Field type="text" component={renderField} id="degree" name="degree" validate={[required, name]} />
                                </div>
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="fieldofstudy">Field of Study</label>
                                    <Field type="text" component={renderField} id="fieldofstudy" name="fieldofstudy" validate={[required, name]} />
                                </div>
                                <div className="form-group" style={{ width: "50%", marginLeft: "16px", width: "96%" }}>
                                    <label for="grade">Grade</label>
                                    <Field type="text" component={renderField} id="grade" name="grade" validate={[required]} />
                                </div>
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="activities">Activities</label>
                                    <Field type="text" component={renderField} id="activities" name="activities" validate={[required]} />
                                </div>
                                <div class="form-group">
                                    <div className="col-sm-6">
                                        <label for="fromyear">From Year</label>
                                        <Field type="number" component={renderField} id="fromyear" name="fromyear" validate={[required]} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label for="toyear">To Year (or expected) </label>
                                        <Field type="number" component={renderField} id="toyear" name="toyear" validate={[required]} />
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="edudesc" style={{marginTop: "20px"}}>Description</label>
                                    <Field type="text" component={renderField} id="edudesc" name="edudesc" validate={[required]} />
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
                
Education = reduxForm({
    // a unique name for the form
    form: 'education',   
})(Education)

Education = connect(
    state => ({
      initialValues: state.profile.profileData, // pull initial values from account reducer
      //values: state.login,
    })
)(Education)

function mapStateToProps(state){
    return {login: state.login.loginData,profile: state.profile.profileData}
}

export default connect(mapStateToProps,{})(Education);