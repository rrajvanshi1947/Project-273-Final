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


class Graph1 extends Component {
    constructor() {
        super();
        this.state = {
            graph1data: []
        };
    }
    componentDidMount() {
        console.log(this.props)
        console.log("Inside Graph1, props email: ", this.props.login.emailID);
        axios.get(`/graph1`, {
            params: {
                id: this.props.login.emailID
            }
        })
            .then((response) => {
                console.log("response", response.data);
                this.setState({
                    graph1data: this.state.graph1data.concat(response.data)
                });
            });

    }

    render() {
        console.log(typeof this.state.graph1data[0] !== "undefined" ? this.state.graph1data[0].count : null)
        var g1count0 = (typeof this.state.graph1data[0] !== "undefined" ? this.state.graph1data[0].count : null)
        var g1count1 = (typeof this.state.graph1data[1] !== "undefined" ? this.state.graph1data[1].count : null)
        var g1count2 = (typeof this.state.graph1data[2] !== "undefined" ? this.state.graph1data[2].count : null)
        var g1count3 = (typeof this.state.graph1data[3] !== "undefined" ? this.state.graph1data[3].count : null)
        var g1count4 = (typeof this.state.graph1data[4] !== "undefined" ? this.state.graph1data[4].count : null)
        var g1count5 = (typeof this.state.graph1data[5] !== "undefined" ? this.state.graph1data[5].count : null)
        var g1count6 = (typeof this.state.graph1data[6] !== "undefined" ? this.state.graph1data[6].count : null)
        var g1count7 = (typeof this.state.graph1data[7] !== "undefined" ? this.state.graph1data[7].count : null)
        var g1count8 = (typeof this.state.graph1data[8] !== "undefined" ? this.state.graph1data[8].count : null)
        var g1count9 = (typeof this.state.graph1data[9] !== "undefined" ? this.state.graph1data[9].count : null)
        var g1jobid0 = (typeof this.state.graph1data[0] !== "undefined" ? this.state.graph1data[0]._id : null)
        var g1jobid1 = (typeof this.state.graph1data[1] !== "undefined" ? this.state.graph1data[1]._id : null)
        var g1jobid2 = (typeof this.state.graph1data[2] !== "undefined" ? this.state.graph1data[2]._id : null)
        var g1jobid3 = (typeof this.state.graph1data[3] !== "undefined" ? this.state.graph1data[3]._id : null)
        var g1jobid4 = (typeof this.state.graph1data[4] !== "undefined" ? this.state.graph1data[4]._id : null)
        var g1jobid5 = (typeof this.state.graph1data[5] !== "undefined" ? this.state.graph1data[5]._id : null)
        var g1jobid6 = (typeof this.state.graph1data[6] !== "undefined" ? this.state.graph1data[6]._id : null)
        var g1jobid7 = (typeof this.state.graph1data[7] !== "undefined" ? this.state.graph1data[7]._id : null)
        var g1jobid8 = (typeof this.state.graph1data[8] !== "undefined" ? this.state.graph1data[8]._id : null)
        var g1jobid9 = (typeof this.state.graph1data[9] !== "undefined" ? this.state.graph1data[9]._id : null)
        
        console.log("count: ", g1count0, g1count1, g1count2, g1count3, g1count4, g1count5, g1count6, g1count7, g1count8, g1count9, g1jobid0, g1jobid1, g1jobid2, g1jobid3, g1jobid5, g1jobid6, g1jobid7, g1jobid8, g1jobid9);

        var g1data = {
            labels: [g1jobid0, g1jobid1, g1jobid2, g1jobid3, g1jobid4, g1jobid5, g1jobid6, g1jobid7, g1jobid8, g1jobid9],
            columns: [
                ['No of applications', g1count0, g1count1, g1count2, g1count3, g1count4, g1count5, g1count6, g1count7, g1count8, g1count9]
            ],
            series: [
                [g1count0, g1count1, g1count2, g1count3, g1count4, g1count5, g1count6, g1count7, g1count8, g1count9]
            ]
        };

        var g1options = {
            width: 400,
            height: 300,
        };

        var g1type = 'Bar'

        return (
            <div>
                <h5>Job Posting vs Application/Month</h5>
                <div id="chartist" class="chartist" data-x-axis="Job Id" data-y-axis="No of Applications">
                <ChartistGraph data={g1data} options={g1options} type={g1type} />
                </div>
            </div>
        )
    }
}

Graph1.propTypes = {
    login: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { login: state.login.loginData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Graph1);


