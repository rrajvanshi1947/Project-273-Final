import React, {Component} from 'react';
import Header from '../header';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../actions/actionCreators';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

const data = {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 20, 10, 40, 15, 25]
  ],
  type: 'bar'
};

const data4 = {
    rows: [
        ['data1', 'data2', 'data3'],
        [90, 120, 300],
        [40, 160, 240],
        [50, 200, 290],
        [120, 160, 230],
        [80, 130, 300],
        [90, 220, 320]
      ],
      data: {
        labels: true
      }
}

const data1 = {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ],
    type: 'pie'
};
const data2 = {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ],
};


class Dashboard extends Component {
    render() {
        return (
            <div className="text-center">
                <Header/>
                <h2>Welcome to your Dashboard</h2>
                <div className="col-sm-4">
                    <h5>Job Posting vs Application/Month</h5>
		            <C3Chart data={data4}/>
		
                </div>
                <div className="col-sm-4">
                    <h5>City wise application/month</h5>
		            <C3Chart data={data}/>
		
                </div>
                <div className="col-sm-4">
                    <h5>Top 5 job posting with less number of applications</h5>
		            <C3Chart data={data}/>
		
                </div>
                <div className="col-sm-12" style ={{border:"1px solid grey"}}></div>
                <div className="col-sm-4">
                    <h5>Clicks per Job Posting</h5>
		            <C3Chart data={data1}/>
		
                </div>
                <div className="col-sm-4">
                    <h5>Saved Jobs per Application</h5>
		            <C3Chart data={data}/>
		
                </div>
                <div className="col-sm-4">
                    <h5>Trace Diagram for users</h5>
		            <C3Chart data={data2}/>
		
                </div>
                <div className="col-sm-12" style ={{border:"1px solid grey"}}></div>
                <div className="col-sm-4">
                    <h5>Profile Views/Day</h5>
		            <C3Chart data={data}/>
		
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login.loginData}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);