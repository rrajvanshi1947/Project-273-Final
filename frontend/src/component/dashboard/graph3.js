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

class Graph3 extends Component {
    constructor() {
        super();
        this.state = {
            graph3data: []
        };
    }
    componentDidMount() {
        console.log(this.props)
        console.log("Inside Graph3, props email: ", this.props.login.emailID);
        axios.get(`/graph3`, {
            params: {
                id: this.props.login.emailID
            }
        })
            .then((response) => {
                console.log("response", response.data);
                this.setState({
                    graph3data: this.state.graph3data.concat(response.data)
                });
            });
    }

    render() {
        console.log(typeof this.state.graph3data[0] !== "undefined" ? this.state.graph3data[0].count : null)
        var g3count0 = (typeof this.state.graph3data[0] !== "undefined" ? this.state.graph3data[0].count : null)
        var g3count1 = (typeof this.state.graph3data[1] !== "undefined" ? this.state.graph3data[1].count : null)
        var g3count2 = (typeof this.state.graph3data[2] !== "undefined" ? this.state.graph3data[2].count : null)
        var g3count3 = (typeof this.state.graph3data[3] !== "undefined" ? this.state.graph3data[3].count : null)
        var g3count4 = (typeof this.state.graph3data[4] !== "undefined" ? this.state.graph3data[4].count : null)
        var g3jobid0 = (typeof this.state.graph3data[0] !== "undefined" ? this.state.graph3data[0]._id : null)
        var g3jobid1 = (typeof this.state.graph3data[1] !== "undefined" ? this.state.graph3data[1]._id : null)
        var g3jobid2 = (typeof this.state.graph3data[2] !== "undefined" ? this.state.graph3data[2]._id : null)
        var g3jobid3 = (typeof this.state.graph3data[3] !== "undefined" ? this.state.graph3data[3]._id : null)
        var g3jobid4 = (typeof this.state.graph3data[4] !== "undefined" ? this.state.graph3data[4]._id : null)
       
        console.log("count: ", g3count0, g3count1, g3count2, g3count3, g3count4, g3jobid0, g3jobid1, g3jobid2, g3jobid3, g3jobid4);

        var g3data = {
            labels: [g3jobid0, g3jobid1, g3jobid2, g3jobid3, g3jobid4],
            columns: [
                ['No of applications', g3count0, g3count1, g3count2, g3count3, g3count4]
            ],
            series: [
                [g3count0, g3count1, g3count2, g3count3, g3count4]
            ]
        };

        var g3options = {
            width: 400,
            height: 300,
        };

        var g3type = 'Bar'

        return (
            <div>
                <h5>Top 5 job posting with less number of applications</h5>
                <div id="chartist" class="chartist" data-x-axis="Job Id" data-y-axis="No of Applications">
                <ChartistGraph data={g3data} options={g3options} type={g3type} />
                </div>
            </div>
        )
    }
}
Graph3.propTypes = {
    login: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { login: state.login.loginData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Graph3);