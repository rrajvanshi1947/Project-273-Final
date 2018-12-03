
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';

//Validations
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

//Form
let Skills = props => {
    const { handleSubmit } = props;
    if (props.children[1] === "true") {
        var hideDetails = (
            <button type="button" class="btn" data-toggle="modal" data-target="#vpModal5" style={{ float: "right", marginRight: "20px"}} >
            <span class="glyphicon glyphicon-pencil" style={{ fontSize: "20px", color: "#0073b1" }}></span>
        </button>
        )
    }
    return (
        <div style={{ height: "150px", border: "1px solid lightgrey", marginTop: "10px" }}>
            <h4 style={{marginLeft: "40px"}}> Skills</h4>
            <h5 style={{marginLeft: "40px"}}> {props.children[0]} </h5>
                
            {hideDetails}

            <div class="modal fade" id="vpModal5" tabindex="-1" role="dialog" aria-labelledby="vpModalLabel5" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="vpModalLabel5">Add Skills</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} style={{ fontSize: '14px' }}>
                            <div class="modal-body1" style={{marginTop: "20px"}}>
                                <div className="form-group" style={{ marginLeft: "16px", width: "96%" }}>
                                    <label for="skill">Enter the Skills</label>
                                    <Field type="text" component={renderField} id="skill" name="skill" validate={[required]} />
                                </div>
                            </div>
                            <div class="modal-footer">
                                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                 <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
                        
Skills = reduxForm({
    // a unique name for the form
    form: 'skills',
    // initialValues: data,     
})(Skills)

Skills = connect(
    state => ({
      initialValues: state.profile.profileData, // pull initial values from account reducer
      //values: state.login.loginData,
    }),
  )(Skills);

function mapStateToProps(state){
    return {login: state.login.loginData,profile: state.profile.profileData}
}

export default connect(mapStateToProps,{})(Skills);