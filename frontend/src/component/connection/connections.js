import React, { Component } from 'react';
import axios from 'axios';
import "./connections.css";
import Header from '../header';
import Invitations from './invitations';
import ViewConnections from './viewconnections';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../actions/actionCreators';

class Connections extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            connections: [],invitation:[]
        }
    }

    componentDidMount(){
        console.log(this.props.login)
        axios.get(`/connections`, {params:{
            emailID:this.props.login.emailID
        }}
        )
                .then((response) => {
                    console.log("response",response.data);
                    let invite=[];
                    let connect=[];
                    if(response.data[0].connections.length>0){
                    for(let con of response.data[0].connections){
                        if(con.buttons==="accept" || con.buttons==="pending"){
                            invite.push(con)
                        } else if(con.buttons==="remove"){
                            connect.push(con)
                        }
                    }
                }
                console.log(invite,connect)
                //update the state with the response data
                this.setState({
                    connections : connect,
                    invitation:invite
                });
                console.log("Connection details",this.state.connections);
            });
    }

    render() {
        let invitationdetails = this.state.invitation.map(connections => {
            return (
                <Invitations emailID={connections.emailID} imageURL={connections.imageURL} firstname={connections.firstname} lastname={connections.lastname} company={connections.company} location={connections.location}></Invitations>
            )
        })
        let connectiondetails = this.state.connections.map(connections => {
            return (
                <ViewConnections emailID={connections.emailID} imageURL={connections.imageURL} firstname={connections.firstname} lastname={connections.lastname} company={connections.company} location={connections.location}></ViewConnections>
            )
        })
        return (
            <div>
                <Header />
                <div class="container">
                    <div>
                        <div class="col-sm-6" style={{border:'1px solid grey'}}>
                            <h4>Invitations</h4>
                            {invitationdetails}    
                        </div>
                        <div class="col-sm-6" style={{border:'1px solid grey'}}>
                            <h4>Connections</h4>
                            {connectiondetails}
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

export default connect(mapStateToProps,mapDispatchToProps)(Connections);