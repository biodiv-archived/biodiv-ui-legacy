import React from 'react';
import {withRouter} from 'react-router-dom';
 class UserGroupHomePage extends React.Component {
  render() {
    let {groupName}=this.props.match.params;
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>{groupName}</h1>
        </div>
      </div>
    );
  }
}
export default withRouter(UserGroupHomePage)
