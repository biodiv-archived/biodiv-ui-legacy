import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as AuthActions from './AuthActions';

class Logout extends Component {
    componentWillMount() {

        this.props.logout();
        var i;
        for (i = 0; i < localStorage.length; i++)   {
            console.log("after clear in logout",localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
        }
    }
    componentDidMount(){
      document.title = "Logout || "+this.props.title;
    }

    render() {

        return <div>Sorry to see you go...</div>;
    }
}

export default connect(null, AuthActions)(Logout);
