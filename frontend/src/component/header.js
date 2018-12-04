import React,{Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/actionCreators';
import axios from 'axios';
//import {nodeURL} from '../config';
import Usersearch from './homepage/usersearch'

class Header extends Component {
    state={
        navigate:null
    }
    submit=(e)=>{
        e.preventDefault();
        console.log("on Submit");
        let value = document.querySelector('input[name="usersearch"]').value;
        this.setState({navigate: <Redirect to={{
            pathname: '/usersearch',
            state: { id: value }
        }}/>
        })
    }
    logout=()=>{
        console.log("Logout")
        localStorage.clear();
        axios.post(`/logout`)
        .then(response=>{
            //obj.props.history.push('/logout');
            this.props.logout("success");
            this.setState({navigate : <Redirect to="/logout"/>})
        })
    }

    deleteAccount=()=>{
        alert("Do you really want to delete the account");
        console.log("emailID in delete account: ", this.props.login.emailID);
        axios.delete(`/deleteaccount`, {
            params: {
                id: this.props.login.emailID
            }
        })
            .then((response) => {
                console.log("response",response.data);
                console.log("Response Status: ", response.status);
                if (response.status === 200) {
                    this.setState({navigate : <Redirect to="/"/>})
                }
            });
    }

    render() {
        return (
            <div className="container-nav">
                <nav className="navbar navbar-inverse">
                    <div className="container">
                        <div className="navbar-header">
                            <img className="navbar-brand" alt="LinkedIn" src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca"></img>
                            <div className="row text-center" style={{marginTop: "5px"}}>
                                <div className="col-sm-4">
                                <form className='form-inline'>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="usersearch" placeholder="Search People" />
                                </div>  
                                <button onClick={this.submit} style={{visibility:'hidden'}}></button>
                                </form>
                                </div>
                                {this.state.navigate}
                                <div className="col-sm-1" style={{ float: "right" }}>
                                    <span className="glyphicon glyphicon-th" style={{color:'white'}}></span>
                                </div>
                                <div className="col-sm-1" style={{ float: "right" }}>
                                    <Link to="#"><span className="glyphicon glyphicon-user" style={{color:'white'}}></span></Link>
                                </div>
                                <div className="col-sm-1" style={{float: "right" }}>
                                    <Link to="/messages"><span className="glyphicon glyphicon-envelope" style={{ color: "white"}}></span></Link>
                                </div>
                                <div className="col-sm-1" style={{float: "right" }}>
                                    <Link to="/Jobsearch"><span className="glyphicon glyphicon-briefcase" style={{color: "white"}}></span></Link>
                                </div>
                                <div className="col-sm-2" style={{ float: "right" }}>
                                    <Link to="/connections"><span className="glyphicon glyphicon-user" style={{color:'white'}}></span></Link>
                                </div>
                                <div className="col-sm-1" style={{ float: "right" }}>
                                    <Link to="/feed"><span className="glyphicon glyphicon-home" style={{color:'white'}}></span></Link>
                                </div>
                                
                                <div className="col-sm-1" style={{ float: "right"}}>
                                    <span style={{color: "white"}}>work</span>
                                </div>
                                <div className="col-sm-1" style={{float: "right" }}>
                                    <li className="dropdown" style={{listStyle:'none'}}>
                                        <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#" style={{color:'white'}}>Me <i className="glyphicon glyphicon-triangle-bottom" style={{color:'white'}}></i></a>
                                        <ul className="dropdown-menu">
                                        <li><Link to={`/userprofile/${this.props.login.emailID}`}>View Profile</Link></li>
                                        <div style={{borderTop:"1px solid #f3f6f8",backgroundColor:'#f3f6f8'}}>
                                        <h5 style={{fontWeight:'600'}}>ACCOUNT</h5>
                                        </div>
                                        {/*Add condition for recruiter*/}
                                        {this.props.login.type==="1"?<li><Link to="/dashboard">Dashboard</Link></li> :null}
                                        {this.props.login.type==="0"?<li><Link to="/applicantdashboard">Dashboard</Link></li> :null}
                                        {this.props.login.type==="1"?<li><Link to="/myjob">My Posted Job</Link></li>:null}
                                        <li><Link to="#">Settings & Privacy</Link></li>
                                        <li><Link to="#">Help Center</Link></li>
                                        <li><Link to="#">Language</Link></li>
                                        <div style={{borderTop:"1px solid #f3f6f8",backgroundColor:'#f3f6f8'}}>
                                        <h5 style={{fontWeight:'600'}}>MANAGE</h5>
                                        </div>
                                        <li><Link to="#">Posts & Activity</Link></li>
                                        {this.props.login.type==="1"?
                                        <li><Link to="/postjob">Job Postings</Link></li>:null}
                                        <li><Link to="#" onClick={this.deleteAccount} style={{borderTop: '1px solid grey', borderBottom:'1px solid grey'}}>Delete Account</Link></li>
                                        <li><Link to="#" onClick={this.logout} style={{borderTop:'1px solid grey'}}>Sign out</Link></li>
                                        </ul>
                                    </li> 
                                </div>
                                <div className="col-sm-1" style={{float: "right" }}>
                                    <Link to="/messages"><span style={{ color: "white",}}>messaging</span></Link>
                                </div>
                                <div className="col-sm-1" style={{ float: "right" }}>
                                    <Link to="/Jobsearch"><span style={{color: "white"}}>Jobs</span></Link>
                                </div>
                                <div className="col-sm-2" style={{ float: "right" }}>
                                    <Link to="/connections"><span style={{color: "white"}}>My Network</span></Link>
                                </div>
                                <div className="col-sm-1" style={{ float: "right" }}>
                                <Link to="/feed"><span style={{color: "white"}}>Home</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
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

export default connect(mapStateToProps,mapDispatchToProps)(Header);
