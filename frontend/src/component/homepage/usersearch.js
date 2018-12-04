import React,{Component} from 'react';
import Header from '../header';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import {nodeURL} from '../../config';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import Message from '../userprofile/messagepop';

class Usersearch extends Component{
    state = {
        users: [],
        messageUser:[],
        mess:[]
    }
    componentDidMount(){
        console.log(this.props.location.state.id)
        let value = this.props.location.state.id;
        axios.get(`/usersearch`,{params:{id:value}})
        .then(response=>{
            console.log(response.data)
            let data = response.data.filter(user=> user.emailID !== this.props.login.emailID)
            this.setState({users:data})
        })
        let data= {users :this.props.login!==undefined?this.props.login.emailID:null};
        console.log("testing messages")
        axios.get(`/messages`, {params: data})
        .then(response => {
            console.log(response.data)
            if(response.status===200 && response.data.length>0){
                let msgValue = response.data;
                this.setState({mess:msgValue})
                console.log(response.data)
            }
        })
    }
    submit=(e)=>{
        e.preventDefault();
        console.log("on Submit");
        let value = document.querySelector('input[name="usersearch"]').value;
        axios.get(`/usersearch`,{params:{id:value}})
        .then(response=>{
            console.log(response.data)
            let data = response.data.filter(user=> user.emailID !== this.props.login.emailID)
            this.setState({users:data})
        })
    }
    //Adding Jyothsna changes
    getViews = (user_email) => {
        //e.preventDefault();
        console.log("On click get views");
        console.log(this.props);
        console.log(this.props.login.emailID)
        const data = {
            emailID : user_email
        }
        axios.post(`/getviews`,  data)
        .then(response => {
            console.log("Response: ", response.data);
            //this.props.history.push(`/userprofile/${user_email}`)

        })
    }

    getData(id){
        let data = this.state.users[id];
        let email = this.state.users[id].emailID;
        console.log(email)
        let msg = this.state.mess.filter(user=>user.users[0] === email || user.users[1]===email);
        console.log(msg)
        if(msg.length>0) {
            msg = msg[0].messages;
            this.setState({messageUser:data,mess:msg})
        } else{
            this.setState({messageUser:data,mess:[]});
        }
    }
    send=()=>{
        let body = document.querySelector('[name="messageTextBox"]').value;
        console.log(body);
        if(body !==""){
            //add login id as sender id
        let data = {
            email:[this.props.login.emailID,this.state.messageUser.emailID],
            names: [`${this.props.login.firstname} ${this.props.login.lastname}`,`${this.state.messageUser.firstname} ${this.state.messageUser.lastname}`],
            images: [this.props.login.imageURL, this.state.messageUser.imageURL],
            messages: [{
                author:`${this.props.login.firstname} ${this.props.login.lastname}`,  //login name
                body: body,
                createdAt: Date.now()
            }]    
        }
         axios.post(`/message`,data)
        .then(response=>{
            console.log(response.data.messages)
            let message = response.data.messages;
            console.log("Message",message)
            this.setState({mess:message})
        })
    }
    }
    render(){
        return (
            <div>
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
            
            <h3>People found</h3>
            <div className="col-sm-8" style={{marginLeft:"50px",marginTop:'50px',border:'1px solid grey'}}>
            <h5>Showing {this.state.users.length} results</h5>
            {this.state.users?this.state.users.map((user,index)=>
            <div className="item">
            <div className="item-sub col-sm-12">
            <div className="col-sm-2">
            <img src={user.imageURL!=='undefined'?user.imageURL:null} alt={user.firstname} className="avatar img-circle img-thumbnail" style={{marginTop:"20px",marginLeft:'30px',width:'80px',height:'80px'}}/>
            </div>
            <div className="col-sm-10" style={{marginTop:"20px",paddingBottom:"30px",borderBottom:"1px solid grey"}}>
            <div className="header-item">
               <Link onClick ={this.getViews(user.emailID)} to={`/userprofile/${user.emailID}`} style={{fontSize:'16px'}}><strong>{`${user.firstname} ${user.lastname}`}</strong></Link> 
            </div>
            <button id = {index} onClick ={()=>this.getData(index)} className="btn btn-default btn-md" data-toggle="modal" data-target="#vpMessage1" style={{border:"1px solid #0073b1",float:'right', color:"#0073b1"}}><strong>Message</strong></button>
            <span>{`${user.headline} at ${user.company}`}</span>
            <p>{user.location}</p>
            </div>
            </div>
            </div>):null}
            <Message onSubmit={this.send} userToMsg={this.state.messageUser} messages={this.state.mess}/>
            </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Usersearch);