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

class Graph5 extends Component {
    constructor() {
        super();
        this.state = {
            graph5data: []
        };
    }
    componentDidMount() {
        console.log(this.props)

        axios.get(`/graph5`, {
            params: {
                id: "mani@gmail.com"
            }
        })
            .then((response) => {
                console.log("response", response.data);
                this.setState({
                    graph5data: this.state.graph5data.concat(response.data)
                });
            });

    }

    render() {
         console.log(typeof this.state.graph5data[0] !== "undefined" ? this.state.graph5data[0].count : null)
        var g5count0 = (typeof this.state.graph5data[0] !== "undefined" ? this.state.graph5data[0].count : null)
        var g5count1 = (typeof this.state.graph5data[1] !== "undefined" ? this.state.graph5data[1].count : null)
        var g5count2 = (typeof this.state.graph5data[2] !== "undefined" ? this.state.graph5data[2].count : null)
        var g5count3 = (typeof this.state.graph5data[3] !== "undefined" ? this.state.graph5data[3].count : null)
        var g5count4 = (typeof this.state.graph5data[4] !== "undefined" ? this.state.graph5data[4].count : null)
        var g5jobid0 = (typeof this.state.graph5data[0] !== "undefined" ? this.state.graph5data[0]._id : null)
        var g5jobid1 = (typeof this.state.graph5data[1] !== "undefined" ? this.state.graph5data[1]._id : null)
        var g5jobid2 = (typeof this.state.graph5data[2] !== "undefined" ? this.state.graph5data[2]._id : null)
        var g5jobid3 = (typeof this.state.graph5data[3] !== "undefined" ? this.state.graph5data[3]._id : null)
        var g5jobid4 = (typeof this.state.graph5data[4] !== "undefined" ? this.state.graph5data[4]._id : null)

        console.log("count: ", g5count0, g5count1, g5count2, g5count3, g5count4, g5jobid0, g5jobid1, g5jobid2, g5jobid3, g5jobid4);

        var g5data = {
            labels: [g5jobid0, g5jobid1, g5jobid2, g5jobid3, g5jobid4],
            columns: [
                ['No of applications', g5count0, g5count1, g5count2, g5count3, g5count4]
            ],
            series: [
                [g5count0, g5count1, g5count2, g5count3, g5count4]
            ]
        };

        var g5options = {
            width: 400,
            height: 300,
        };

        var g5type = 'Bar'

        return (
            <div>
                <h5>Saved Jobs per Application</h5>x
                <div id="chartist" class="chartist" data-x-axis="Job Id" data-y-axis="No of Applications">
                <ChartistGraph data={g5data} options={g5options} type={g5type} />
                </div>
            </div>
        )
    }
}
Graph5.propTypes = {
    login: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return { login: state.login.loginData }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Graph5);