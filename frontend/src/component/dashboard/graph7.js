import React, {Component} from 'react';
import axios from 'axios';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import ChartistGraph from "react-chartist";
var Chartist = require("chartist");
  
  var ReactChart = React.createClass({
    componentDidMount: function () {
      this.updateChart(this.props.data);
    },
    updateChart: function (data) {
      return new Chartist.Bar('.chart', data);
    },
    render: function () {
      return (
        <div className="chart"></div>
      );
    }
  });
  
  export default ReactChart