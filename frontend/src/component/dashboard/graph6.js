import React, { Component } from 'react';
import axios from 'axios';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import ChartistGraph from "react-chartist";
import './graph.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../actions/actionCreators';
var Chartist = require("chartist");


class Graph6 extends Component {
    constructor() {
        super();
        this.state = {
            appliedjobs: '',
            savedjobs: ''
        };
    }
    componentDidMount() {
        console.log(this.props)
        console.log("Inside Graph6, props email: ", this.props.login.emailID);
        axios.get(`/graph6`, {
            params: {
                id: "San Jose"
            }
        })
            .then((response) => {
                console.log("response", response.data);
                this.setState({
                    appliedjobs: response.data
                });
            });

        axios.get(`/graph6sj`, {
            params: {
                id: "San Jose"
            }
        })
            .then((response) => {
                console.log("response", response.data);
                this.setState({
                    savedjobs: response.data
                });
            });

    }

    render() {
        console.log("Jobs: ", this.state.appliedjobs, this.state.savedjobs);
        var g6data = {
            labels: ['complete form', 'half-filled form', 'read form'],
            columns: [
                ['y', this.state.appliedjobs, this.state.savedjobs, 15]
            ],
            series: [
                [this.state.appliedjobs, this.state.savedjobs, 15]
            ]
        };

        var g6options = {
            width: 400,
            height: 300,
        };

        var g6type = 'Bar'

        return (
            <div>
                <h5>Trace Diagram for users</h5>
                <div id="chartist" class="chartist" data-x-axis="details on form" data-y-axis="">
                    <ChartistGraph data={g6data} options={g6options} type={g6type} />
                </div>
            </div>
        )
    }
}

Graph6.propTypes = {
    login: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { login: state.login.loginData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Graph6);
