import React, { Component } from 'react';
import Header from '../header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../actions/actionCreators';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import axios from 'axios';
import ChartistGraph from "react-chartist";
import './graph.css';

class ApplicantDashboard extends Component {
    constructor() {
        super();
        this.state = {
            graph7data: []
        };
    }
    componentDidMount() {
        console.log(this.props);
        console.log(this.props.login.emailID);
        axios.get(`/graph7`, {
            params: {
                id: this.props.login.emailID
            }
        })
            .then((response) => {
                console.log("response", response.data.noofviews);
                this.setState({
                    graph7data: response.data.noofviews
                });
            });

    }

    render() {
        console.log(typeof this.state.graph7data[0] !== "undefined" ? this.state.graph7data[0] : null)
        var g7arr = this.state.graph7data;
        console.log(g7arr[0]);

        var g7data = {
            labels: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7', 'Day8', 'Day9', 'Day10', 'Day11', 'Day12', 'Day13', 'Day14', 'Day15', 'Day16', 'Day17', 'Day18', 'Day19', 'Day20', 'Day21', 'Day22', 'Day23', 'Day24', 'Day25', 'Day26', 'Day27', 'Day28', 'Day29', 'Day30'],
            columns: [
                ['No of applications', g7arr[0], g7arr[1], g7arr[2], g7arr[3], g7arr[4], g7arr[5], g7arr[6], g7arr[7], g7arr[8], g7arr[9], g7arr[10], g7arr[11], g7arr[12], g7arr[13], g7arr[14], g7arr[15], g7arr[16], g7arr[17], g7arr[18], g7arr[19], g7arr[20], g7arr[21], g7arr[22], g7arr[23], g7arr[24], g7arr[25], g7arr[26], g7arr[27], g7arr[28], g7arr[29] ]
            ],
            series: [
                [g7arr[0], g7arr[1], g7arr[2], g7arr[3], g7arr[4], g7arr[5], g7arr[6], g7arr[7], g7arr[8], g7arr[9], g7arr[10], g7arr[11], g7arr[12], g7arr[13], g7arr[14], g7arr[15], g7arr[16], g7arr[17], g7arr[18], g7arr[19], g7arr[20], g7arr[21], g7arr[22], g7arr[23], g7arr[24], g7arr[25], g7arr[26], g7arr[27], g7arr[28], g7arr[29]]
            ]
        };

        var g7options = {
            width: 1300,
            height: 500,
        };

        var g7type = 'Bar'

        return (
            <div className="text-center">
                <Header />
                <h2>Welcome to your Dashboard</h2>
                <h5>Profile Views/Day</h5>
                <div id="chartist" class="chartist" data-x-axis="Days" data-y-axis="No of Views">
                    <ChartistGraph data={g7data} options={g7options} type={g7type} />
                </div>
            </div>
        )
    }
}

ApplicantDashboard.propTypes = {
    login: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { login: state.login.loginData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantDashboard);