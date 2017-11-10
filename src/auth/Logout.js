import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as AuthActions from './AuthActions';

class Logout extends Component {
    componentWillMount() {
      
        this.props.logout();
    }
    render() {
        return <div>Sorry to see you go...</div>;
    }
}

export default connect(null, AuthActions)(Logout);
