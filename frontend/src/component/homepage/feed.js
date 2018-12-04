import React, {Component} from 'react';
import Header from '../header';
import { connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import FeedDisplay from './FeedDisplay';
import * as actionCreators from '../../actions/actionCreators';

class Feed extends Component {
    render() {
        return (
            <div>
            <Header/>
<FeedDisplay/>
            
            </div>
        )
    }
}

Feed.propTypes = {
    login: PropTypes.object.isRequired  
}

function mapStateToProps(state){
    return {login: state.login.loginData}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Feed);
