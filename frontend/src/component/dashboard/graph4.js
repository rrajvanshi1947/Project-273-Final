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


class Graph4 extends Component {
    constructor() {
        super();
        this.state = {
            graph4data: []
        };
    }
    componentDidMount() {
        console.log(this.props)
        console.log("Inside Graph4, props email: ", this.props.login.emailID);
        axios.get(`/graph4`, {
            params: {
                id: this.props.login.emailID
            }
        })
            .then((response) => {
                console.log("response", response.data);
                this.setState({
                    graph4data: this.state.graph4data.concat(response.data)
                });
            });

    }

    render() {
        console.log(typeof this.state.graph4data[0] !== "undefined" ? this.state.graph4data[0].noofclicks : null)
        var g4noofclicks1 = (typeof this.state.graph4data[0] !== "undefined" ? this.state.graph4data[0].noofclicks : null)
        var g4noofclicks2 = (typeof this.state.graph4data[1] !== "undefined" ? this.state.graph4data[1].noofclicks : null)
        var g4noofclicks3 = (typeof this.state.graph4data[2] !== "undefined" ? this.state.graph4data[2].noofclicks : null)
        var g4noofclicks4 = (typeof this.state.graph4data[3] !== "undefined" ? this.state.graph4data[3].noofclicks : null)
        var g4noofclicks5 = (typeof this.state.graph4data[4] !== "undefined" ? this.state.graph4data[4].noofclicks : null)
        var g4jobid0 = (typeof this.state.graph4data[0] !== "undefined" ? this.state.graph4data[0].jobid : null)
        var g4jobid1 = (typeof this.state.graph4data[1] !== "undefined" ? this.state.graph4data[1].jobid : null)
        var g4jobid2 = (typeof this.state.graph4data[2] !== "undefined" ? this.state.graph4data[2].jobid : null)
        var g4jobid3 = (typeof this.state.graph4data[3] !== "undefined" ? this.state.graph4data[3].jobid : null)
        var g4jobid4 = (typeof this.state.graph4data[4] !== "undefined" ? this.state.graph4data[4].jobid : null)
        console.log("count: ",g4noofclicks1, g4noofclicks2, g4noofclicks3, g4noofclicks4, g4noofclicks5, g4jobid0, g4jobid1, g4jobid2, g4jobid3, g4jobid4);

        var g4data = {
            labels: [g4jobid0, g4jobid1, g4jobid2, g4jobid3, g4jobid4],
            columns: [
                ['No of applications', g4noofclicks1, g4noofclicks2, g4noofclicks3, g4noofclicks4, g4noofclicks5]
            ],
            series: [
                [g4noofclicks1, g4noofclicks2, g4noofclicks3, g4noofclicks4, g4noofclicks5]
            ]
        };

        var g4options = {
            width: 400,
            height: 300,
        };

        var g4type = 'Bar'

        return (
            <div>
                <h5>Clicks per Job Posting</h5>
                <div id="chartist" class="chartist" data-x-axis="Job Id" data-y-axis="No of Clicks">
                    <ChartistGraph data={g4data} options={g4options} type={g4type} />
                </div>
            </div>
        )
    }
}

Graph4.propTypes = {
    login: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { login: state.login.loginData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Graph4);
