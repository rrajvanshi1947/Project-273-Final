import React, { Component } from 'react';
import Header from '../header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../actions/actionCreators';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import axios from 'axios';
import Graph1 from './graph1';
import Graph2 from './graph2';
import Graph3 from './graph3';
import Graph5 from './graph5';
import Graph4 from './graph4';
import Graph6 from './graph6';

class Dashboard extends Component {
    render() {
        console.log(this.props);
        console.log("Inside dasboard, props email: ", this.props.login.emailID);
        return (
            <div className="text-center">
                <Header />
                <h2>Welcome to your Dashboard</h2>
                <div className="col-sm-4">
                    <Graph1/>
                </div>
                <div className="col-sm-4">
                   <Graph2 />
                </div>
                <div className="col-sm-4">
                    <Graph3/>
                </div>
                <div className="col-sm-12" style={{ border: "1px solid grey", marginTop: "20px", marginBottom: "20px" }}></div>
                <div className="col-sm-4">
                    <Graph4/>
                </div>
                <div className="col-sm-4">
                  <Graph5/>
                </div>
                <div className="col-sm-4">
                    <Graph6/> 
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    login: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { login: state.login.loginData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);