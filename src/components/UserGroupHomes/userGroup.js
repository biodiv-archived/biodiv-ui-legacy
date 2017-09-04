import React, {Component} from 'react';
class UserGroupHome extends Component{

callObseravtion(groupName){
return <h1>{groupName}</h1>
}
  render(){
    const {groupName}=this.props.match.params
    return(
      <div>
        {this.callObseravtion(groupName)}
      </div>
    )
  }
}
export default UserGroupHome
