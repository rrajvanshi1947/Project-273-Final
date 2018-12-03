import React, {Component} from 'react';
import Footer from './footer';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import {nodeURL} from '../../config';

class Loginpage extends Component {
    state={
        errMsg:'',
    }
    register=(values)=>{
        console.log(values);
        if(values.type === undefined){
            values.type = "0";
        }
        values["fullname"] = values["firstname"] + values["lastname"]
        axios.defaults.withCredentials = true;
        axios.post(`/signup`, values)
        .then(response=> {
            this.props.fetchLogin(response);
            if(response.status === 200){
                this.props.history.push('/feed');
                console.log("data",response.data);
            } else {
                this.setState({errMsg:'Email ID already exists'});
            }
        })
        .catch(err=>{
            this.setState({errMsg:'Email ID already exists'});
        })
    }
    login=(values)=>{
        //e.preventDefault();
        //let values = formHandle(this.loginform);
        axios.defaults.withCredentials = true;
        axios.post(`/signin`, values)
        .then(response=> {
            console.log(response.data)
            this.props.fetchLogin(response);
            if(response.status === 200){
                this.props.history.push('/feed');
            } else {
                alert('Username/Password is wrong.');
            }
        })
        .catch(err=>{
            alert('Username/Password is wrong.');
        })
    }
    render(){
        return (
            <div className= "container-nav">
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                    <img className="navbar-brand" alt="LinkedIn" src="https://static.licdn.com/sc/h/95o6rrc5ws6mlw6wqzy0xgj7y"></img>
                    </div>
                    <LoginForm onSubmit={this.login}/>
                    <div></div>
                </div>
            </nav>
            <div className="container-fluid Main">
                <div className = "col-sm-offset-4 col-sm-4 col-sm-offset-4" style={{marginTop:'30px',background:"white",marginBottom:'20px'}}>
                <h3 className="title text-center">Be great at what you do</h3>
                <h4 className="subtitle text-center">Get started - it's free.</h4>
                <div style={{border:"1px solid grey",marginBottom:"10px"}}></div>
                {(this.state.errMsg!== "")?
                <div className="alert alert-danger fade in">
        			<a href="#" className="close" data-dismiss="alert"></a>
        			<strong>Error!</strong> {this.state.errMsg}
    		    </div>:null}
                    <RegisterForm onSubmit={this.register} />
                </div>
                <Footer />
            </div>
            
            </div>
        )
    }
}
function mapStateToProps(state){
    return {login: state.login, error:state.login.error}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loginpage);