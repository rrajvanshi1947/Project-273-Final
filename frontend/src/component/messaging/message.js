import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Header from "../header";
import axios from 'axios';
import moment from 'moment';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
//import {nodeURL} from '../../config';

class Message extends Component{
    state = {
        message:[],
        showMsg:[],
        userDetail:[],
        nameDetail:[],
        imageDetail:[],
        text:'',
        active:0
    }
    componentDidMount(){
        let data= {users :this.props.login!==undefined?this.props.login.emailID:null};
        console.log("testing messages")
        axios.get(`/messages`, {params: data})
        .then(response => {
            console.log(response.data)
            if(response.status===200 && response.data.length>0){
                let msgValue = response.data[0].messages;
                let names= response.data[0].names;
                let images= response.data[0].images;
                let user = response.data[0].users;
                this.setState({message:response.data, showMsg: msgValue,userDetail:user,nameDetail:names,imageDetail:images})
                console.log(response.data)
            }
        })
    }
    send=()=>{
        let body = document.querySelector('[name="messageTextBox"]').value;
        console.log(this.state.userDetail);
        if(body !==""){
            //add login id as sender id
        let data = {
            email:this.state.userDetail,
            names: this.state.nameDetail,
            images: this.state.imageDetail,
            messages: [{
                author:`${this.props.login.firstname} ${this.props.login.lastname}`,  //login name
                body: body,
                createdAt: Date.now()
            }]    
        }
        axios.post(`/message`,data)
        .then(response=>{
            console.log(response.data.messages)
            let data = response.data.messages;
            let final = this.state.message.filter(user=> user.users!==this.state.userDetail)
            final.push(response.data);
            this.setState({message:final,showMsg:data,text:'',active:final.length-1})
        })
    }
    }

    showMessage=(index)=>{
        console.log(index);
        let data = this.state.message[index].messages;
        let user = this.state.message[index].users;
        this.setState({showMsg: data,userDetail:user,active:index});
    }
    changeHandler=(e)=>{
        this.setState({text:e.target.value});
    }
    render() {
        let listMsg = this.state.message.map((msg,index)=>{
            return (
            <Link to="#" id={index} className= {this.state.active === index? "tab-active col-sm-12":"col-sm-12"} onClick={this.showMessage.bind(this,index)} style={{color:'black',borderBottom:'1px solid grey'}}>
                <div id = {`${index}`} className="row-bordered">
                <div className= 'row col-sm-4' style={{float:'left',marginTop:"30px"}}>
                    <img className="avatar img-circle img-thumbnail" style={{width:'60px',height:'60px'}}/>   
                </div>
                <div className = 'row col-sm-8' style={{marginTop:"20px", width:"230px",marginBottom:"20px"}}>
                    <span style={{float:'right',marginRight:"0px"}}>{moment(msg.messages[msg.messages.length-1].createdAt).format("DD MMM HH:MM")}</span>
                    <h5>{msg.users.filter(user=>user!==this.props.login.emailID)}:</h5>
                    <p>{msg.messages[msg.messages.length-1].body.substring(0,30)}..</p>
                </div>
                </div>
                </Link>
            )
        })
        let userMessages = this.state.showMsg.map(msg=>{
            return (  
                <div>
                <div className= 'col-sm-2' style={{float:'left',marginTop:"30px"}}>
                    <img className="avatar img-circle img-thumbnail" style={{width:'40px',height:'40px'}}/>
                   
                </div>
                <div className = 'col-sm-10' style={{marginTop:"20px"}}>
                <span style={{float:'right'}}>{moment(msg.createdAt).format("DD MMM HH:MM")}</span>
                    <h5>{msg.author}:</h5>
                    <p>{msg.body}</p>
                </div>
                </div>
            )
          })

        return (
            <div>
                <Header />
                <div className="col-sm-8" style={{border:'1px solid grey', marginLeft:'80px',marginTop:'50px',height:'550px'}}>  
                <div className="col-sm-5" style={{borderRight:'1px solid grey',height:"100%"}}>
                <div className="col-sm-12" style={{borderBottom:'1px solid grey',marginRight:'0',width:"330px"}}>
                <h4>Messaging
                    <Link to ="#"><span className="glyphicon glyphicon-edit" style={{float:'right'}}></span></Link>
                </h4>   
                </div>
                <div className="col-sm-12" style={{borderBottom:'1px solid grey',marginRight:'0',width:"330px"}}>
                    <form onSubmit={this.search}>
                        <i className="glyphicon glyphicon-search" style={{top:'30px',paddingLeft:'5px'}}></i>
                        <input type="search" name="search" className="searchbar form-control" placeholder="Search messages" style={{top:0,paddingLeft:'20px',border:'none'}}></input> 
                
                    </form>  
                </div>
                {listMsg}
                </div>
                <div className="row col-sm-7">

                <div className="col-sm-12" style={{borderBottom:'1px solid grey'}}>
                    <h5 style={{paddingLeft:"20px"}}>{this.state.userDetail.filter(user=>user!==this.props.login.emailID)}</h5>
                </div>
                
                <div className="converse col-sm-12">
                    {userMessages}
                </div>
            </div>   
                   
                 <div style={{position:'fixed',left:"445px",bottom:'80px'}}>
                <div className = "col-sm-9" style={{borderTop:"1px solid grey",borderBottom:"1px solid grey"}}>
                    <textarea className="form-control" name ="messageTextBox" onChange={this.changeHandler} rows="5" placeholder="Write a message" style={{width:"450px",border:'none'}} value={this.state.text}/>
                </div>
                <div className="col-sm-9" style={{marginTop:"20px"}}>
                    <span className="glyphicon glyphicon-picture" style={{fontSize:'24px',color:"grey"}}></span>
                    <span className="glyphicon glyphicon-paperclip" style={{fontSize:'24px',color:"grey",paddingLeft:"20px"}}></span>
                    <span><i className='far fa-grin-alt' style={{fontSize:'24px',paddingLeft:"20px"}}></i></span>
                    <button onClick={this.send} className="btn btn-primary btn-sm" style={{float:"right"}}>Send</button>
                </div>
                </div>    
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

export default connect(mapStateToProps,mapDispatchToProps)(Message);