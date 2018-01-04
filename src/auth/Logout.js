import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as AuthActions from './AuthActions';

class Logout extends Component {
    componentWillMount() {

        this.props.logout();
    }
    render() {
      var i;
      for (i = 0; i < localStorage.length; i++)   {
          console.log("after clear in logout",localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
      }
        return <div>Sorry to see you go...</div>;
    }
}

export default connect(null, AuthActions)(Logout);
