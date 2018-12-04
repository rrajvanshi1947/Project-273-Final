import React, { Component } from 'react';
import axios from 'axios';
import "./userprofile.css"
import Education from './education';
import Experience from './experience';
import Introduction from './introduction';
import PhotoUpload from './photo';
import Skills from './skills';
import Header from '../header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/actionCreators';
//import {nodeURL} from '../../config';
import Message from './messagepop';



class Userprofile extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            values: {},
            userprofile: [],
            isRecruiter: this.props.login.type,
            message:[],
            resumeurl:'',
            pending:false,
            remove:false,
            con:[]
        }
        this.submitDetails = this.submitDetails.bind(this);
    }

    //get the books data from backend  
    componentDidMount(){
        console.log(this.props)
        console.log("State: ", this.props.match.params.emailID);
        axios.get(`/userprofile`, {
            params: {
                id: this.props.match.params.emailID
            }
        })
            .then((res) => {
                console.log("response",res.data);
                this.props.updateProfile(res);
                //update the state with the response data
                console.log(res.data.connections)
                let connection = typeof res.data.connections !=="undefined"? res.data.connections:[];
                let connect = []
                for(let con of connection){
                    console.log(con)
                    if(con.emailID === this.props.login.emailID){
                        connect = con;
                    }
                }
                console.log(connection,connect);
                this.setState({
                    userprofile : [res.data],
                    con:connect
                });
                console.log("UserProfile",this.state.userprofile);
            });
        let data= {users :this.props.login!==undefined?this.props.login.emailID:null};
        console.log("testing messages")
        axios.get(`/messages`, {params: data})
        .then(res => {
            console.log(res.data)
            if(res.status===200 && res.data.length>0){
                let email=this.props.match.params.emailID;
                let msgValue = res.data.filter(user=>user.users[0] === email || user.users[1]===email);
                if(msgValue.length>0){
                    this.setState({message:msgValue[0].messages})
                } else {
                    this.setState({message:[]})
                }
                console.log(msgValue)
            }
        })
    }
    handleResume = (urlvalue) => {
        console.log("url value", urlvalue);
        let data = this.state.userprofile[0];
        data["resumeURL"] = urlvalue;
        this.setState({values: data});
        console.log("Data in handleResume: ", data);
    }

    Skills = (skillvalues) => {
        console.log(skillvalues);
        let data = this.state.userprofile[0];
        data["skill"] = skillvalues["skill"];
        this.setState({values:data});

    }

    Introduction = (introvalues) => {
        console.log("Intro",introvalues);
        let data = this.state.userprofile[0];
        data["firstname"] = introvalues["firstname"];
        data["lastname"] = introvalues["lastname"];
        data["headline"] = introvalues["headline"];
        data["adminID"] = introvalues["adminID"];
        data["city"] = introvalues["city"];
        data["state"] = introvalues["state"];
        data["country"] = introvalues["country"];
        data["zipcode"] = introvalues["zipcode"];
        data["emailID"] = introvalues["emailID"];
        data["phonenum"] = introvalues["phonenum"];
        data["summary"] = introvalues["summary"];
        data["company"] = introvalues["company"];
        this.setState({values:data});
    }

    Education = (eduvalues) => {
        console.log(eduvalues);
        let data = this.state.userprofile[0];
        console.log(data);

        data["school"] = eduvalues["school"];
        data["degree"] = eduvalues["degree"];
        data["fieldofstudy"] = eduvalues["fieldofstudy"];
        data["grade"] = eduvalues["grade"];
        data["activities"] = eduvalues["activities"];
        data["fromyear"] = eduvalues["fromyear"];
        data["toyear"] = eduvalues["toyear"];
        data["edudesc"] = eduvalues["edudesc"];
        this.setState({values:data});
    }

    Experience = (expvalues) => {
        console.log(expvalues);
        let data = this.state.userprofile[0];
        data["title"] = expvalues["title"];
        data["company"] = expvalues["company"];
        data["location"] = expvalues["location"];
        data["month"] = expvalues["month"];
        data["year"] = expvalues["year"];
        data["industry"] = expvalues["industry"];
        data["expdesc"] = expvalues["expdesc"];
        this.setState({values:data});
    }

    submitDetails = (e) => {
        console.log("Values inside submitDetials: ", this.state.values);
        if(this.state.values.firstname!==undefined){
        this.state.values["emailID"] =this.props.match.params.emailID;
        //axios.defaults.withCredentials = true;
        axios.post(`/userprofile`, this.state.values)
            .then(response => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    this.props.updateProfile(response);
                    this.setState({values:{}})
                    alert("User details updated successfully");
                    console.log("Success with status code ", response.status);
                } else {
                    console.log("Failure with status code ", response.status);
                }
            });
        } else {
            alert("Please make changes before clicking on Submit")
        }
    }

    send=()=>{
        let body = document.querySelector('[name="messageTextBox"]').value;
        console.log(body);
        console.log(this.props)
        if(body !==""){
            //add login id as sender id
        let data = {
            email:[this.props.login.emailID,this.state.userprofile[0].emailID],
            names: [`${this.props.login.firstname} ${this.props.login.lastname}`,`${this.state.userprofile[0].firstname} ${this.state.userprofile[0].lastname}`],
            images: [this.props.login.imageURL, this.state.userprofile[0].imageURL],
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
            this.setState({message:message})
        })
    }
    }

    connection=()=>{
        let data = [{
            emailID: this.props.login.emailID,
            firstname: this.props.login.firstname,
            lastname: this.props.login.lastname,
            company: this.props.login.company,
            location:this.props.login.location,
            imageURL:this.props.imageURL,
            buttons:"pending",
        },{
            emailID: this.state.userprofile[0].emailID,
            firstname: this.state.userprofile[0].firstname,
            lastname: this.state.userprofile[0].lastname,
            company: this.state.userprofile[0].company,
            location:this.state.userprofile[0].location,
            imageURL:this.state.userprofile[0].imageURL,
            buttons:"accept"
        }
    ]
        console.log(data)
        axios.post('/requestconnection',data)
        .then(response=>{
            if(response.status ===200){
                this.setState({pending:true})
            }
        })
    }

    accept=()=>{
        let data = [{
            emailID: this.props.login.emailID,
            buttons:"remove",
        },{
            emailID: this.state.userprofile[0].emailID,
            buttons:"remove"
        }]
        console.log(data)
        axios.post('/acceptconnection',data)
        .then(response=>{
            if(response.status ===200){
                this.setState({remove:true})
            }
        })
    }

    deleteCon=()=>{
        let data = [{
            emailID: this.props.login.emailID,
        },{
            emailID: this.state.userprofile[0].emailID,
        }]
        axios.post('/removeconnection',data)
        .then(response=>{
            if(response.status ===200){
                this.setState({remove:false,pending:false,con:[]})
            }
        })
    }
    
    render() {
        let userprofileDetails, userprofileDetails1, userprofileDetails2, userprofileDetails3, userprofileDetails4;
        console.log(this.state.userprofile)
        if(this.state.userprofile.length>0) {
        
        var upheadline = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.headline}</span>
            )
        })
        var upcity = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.city}</span>
            )
        })
        var upstate = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.state}</span>
            )
        })
        var upemailID = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.emailID}</span>
            )
        })
        var upphonenum = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.phonenum}</span>
            )
        })
        var upschool  = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.school}</span>
            )
        })
        var upfromyear = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.fromyear}</span>
            )
        })
        var uptoyear = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.toyear}</span>
            )
        })
        var uptitle = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.title}</span>
            )
        })
        var upcompany = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.company}</span>
            )
        })
        var upmonth = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.month}</span>
            )
        })
        var upyear = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.year}</span>
            )
        })
        var upskills = this.state.userprofile.map(userprofile => {
            return (
                <span>{userprofile.skill}</span>
            )
        })
        //Adding Jyothsna Changes Here
        var isemailMatch = "";
        console.log("this.props.match.params.emailID: ", this.props.match.params.emailID);
        console.log("this.props.login.emailID: ", this.props.login.emailID);
        if ((this.props.match.params.emailID === this.props.login.emailID) || (this.props.login.emailID === undefined)) {
            isemailMatch = "true";
        } else {
            isemailMatch = "false";
        }
        console.log("isemailMatch: ", isemailMatch);

        if ((this.props.match.params.emailID === this.props.login.emailID) ) {
            var submitBtn = (
                <button type="submit" className="btn btn-primary" onClick={this.submitDetails} style={{ marginTop: "20px", marginLeft: "420px", marginBottom: "30px" }}>Submit Changes</button>
            )
        } else {
            var submitBtn ='';
        }

        
        console.log("Image URL in userprofile: ", this.props.login.imageURL);
        console.log("Recruiter: ", this.state.isRecruiter);
        if((this.state.isRecruiter === "1") && (this.props.match.params.emailID === this.props.login.emailID) ) {
            userprofileDetails = <Introduction onSubmit={this.Introduction} value={this.state.userprofile[0]} pending={this.state.pending} connect={this.connection} remove={this.state.remove} deleteCon={this.deleteCon} but={this.state.con} accept={this.accept}>{this.state.userprofile[0].firstname}{this.state.userprofile[0].lastname}{upheadline}{upcity}{upstate}{upemailID}{upphonenum}{this.state.userprofile[0].type}{this.state.userprofile[0].imageURL}{isemailMatch}{this.state.userprofile[0].resumeURL}</Introduction> 
            userprofileDetails1 = <PhotoUpload>{this.props.match.params.emailID}{isemailMatch}</PhotoUpload>
        } else {
            console.log("Applicant")
        
            userprofileDetails = <Introduction onSubmit={this.Introduction} value={this.state.userprofile[0]} handleResume={this.handleResume} pending={this.state.pending} connect={this.connection} remove={this.state.remove} deleteCon={this.deleteCon} but={this.state.con} accept={this.accept}>{this.state.userprofile[0].firstname}{this.state.userprofile[0].lastname}{upheadline}{upcity}{upstate}{upemailID}{upphonenum}{this.state.userprofile[0].type}{this.state.userprofile[0].imageURL}{isemailMatch}{this.state.userprofile[0].resumeURL}</Introduction> 
            userprofileDetails1 = <PhotoUpload>{this.props.match.params.emailID}{isemailMatch}</PhotoUpload>
            userprofileDetails2 = <Education onSubmit={this.Education} > {upschool}{upfromyear}{uptoyear}{isemailMatch}</Education> 
            userprofileDetails3 = <Experience onSubmit={this.Experience} > {uptitle}{upcompany}{upmonth}{upyear}{isemailMatch}</Experience> 
            userprofileDetails4 = <Skills onSubmit={this.Skills} >{upskills}{isemailMatch}</Skills>
        }
    }
        return (
            <div>
                {console.log(this.state.userprofile.imageURL)}
                <Header />
                <div class="container">
                    <div class="col-sm-8">
                    <div style={{ border: "1px solid lightgrey", marginTop: "20px" }}>
                        <div class="vp-bg1">
                            <div class="col-sm-4 vp-bg2">
                                <img className="avatar img-circle img-thumbnail" src={this.state.userprofile.length>0 ?this.state.userprofile[0].imageURL:null} style={{ height:'200px',width:'200px',marginTop: "50px", marginLeft: "30px", border: "1px solid grey", borderRadius: "100%"}} />
                            </div>           
                        </div>
                        {userprofileDetails}
                    </div>
                        {userprofileDetails1}
                        {userprofileDetails2}
                        {userprofileDetails3}
                        {userprofileDetails4}
                    </div>
                </div>
                {submitBtn}
                <Message onSubmit={this.send} userToMsg={typeof this.state.userprofile!=='undefined'?this.state.userprofile[0]:null} messages={this.state.message}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {login: state.login.loginData, profile:state.profile.profileData}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Userprofile);
// export default Userprofile;