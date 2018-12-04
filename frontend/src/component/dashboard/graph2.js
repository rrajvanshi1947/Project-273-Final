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

class Graph2 extends Component {
    constructor() {
        super();
        this.state = {
            graph2data: []
        };
    }
    componentDidMount() {
        console.log(this.props)
        console.log("Inside Graph2, props email: ", this.props.login.emailID);

        axios.get(`/graph2`, {
            params: {
                id: 4554
            }
        })
            .then((response) => {
                console.log("response", response.data);
                this.setState({
                    graph2data: this.state.graph2data.concat(response.data)
                });
            });
    }

    render() {
        console.log(typeof this.state.graph2data[0] !== "undefined" ? this.state.graph2data[0].count : null)
        var g2count0 = (typeof this.state.graph2data[0] !== "undefined" ? this.state.graph2data[0].count : null)
        var g2count1 = (typeof this.state.graph2data[1] !== "undefined" ? this.state.graph2data[1].count : null)
        var g2count2 = (typeof this.state.graph2data[2] !== "undefined" ? this.state.graph2data[2].count : null)
        var g2count3 = (typeof this.state.graph2data[3] !== "undefined" ? this.state.graph2data[3].count : null)
        var g2count4 = (typeof this.state.graph2data[4] !== "undefined" ? this.state.graph2data[4].count : null)
        var g2jobid0 = (typeof this.state.graph2data[0] !== "undefined" ? this.state.graph2data[0]._id : null)
        var g2jobid1 = (typeof this.state.graph2data[1] !== "undefined" ? this.state.graph2data[1]._id : null)
        var g2jobid2 = (typeof this.state.graph2data[2] !== "undefined" ? this.state.graph2data[2]._id : null)
        var g2jobid3 = (typeof this.state.graph2data[3] !== "undefined" ? this.state.graph2data[3]._id : null)
        var g2jobid4 = (typeof this.state.graph2data[4] !== "undefined" ? this.state.graph2data[4]._id : null)
        console.log("count: ", g2count0, g2count1, g2count2, g2count3, g2count4, g2jobid0, g2jobid1, g2jobid2, g2jobid3, g2jobid4);

        var g2data = {
            labels: [g2jobid0, g2jobid1, g2jobid2, g2jobid3, g2jobid4],
            columns: [
                ['No of applications', g2count0, g2count1, g2count2, g2count3, g2count4]
            ],
            series: [
                [g2count0, g2count1, g2count2, g2count3, g2count4]
            ]
        };

        var g2options = {
            width: 400,
            height: 300,
        };

        var g2type = 'Bar'

        return (
            <div>
                <h5>City wise application/month</h5>
                <div id="chartist" class="chartist" data-x-axis="City" data-y-axis="No of Applications">
                <ChartistGraph data={g2data} options={g2options} type={g2type} />
                </div>
            </div>
        )
    }
}
Graph2.propTypes = {
    login: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { login: state.login.loginData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Graph2);