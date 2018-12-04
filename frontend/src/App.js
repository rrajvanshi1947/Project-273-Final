import React, { Component } from 'react';
import './App.css';
import './feed.scss';
import Router from './router';
import {connect} from 'react-redux';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import * as actionCreators from './actions/actionCreators';
//import {nodeURL} from './config';

class App extends Component {
  state = {
    login : {}
 }

 componentWillMount() {
   let obj = this;
   axios.get(`/session`)
   .then(response=>{
     console.log(response.data);
     obj.props.sessionAction( response.data );
   })
 }
  render() {
    return (
      <div className="App">
        <Router/>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return { user : state.user  };
}

function mapDispatchToProps(dispatch) {
 return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
