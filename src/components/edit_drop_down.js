import React from 'react';
import {connect} from 'react-redux';
import {fetchEditUserGroupData} from '../actions/index'
class EditDropDown extends React.Component {
  constructor(){
    super();

  }

  render() {
    {console.log("this.props"),this.props.EditUserGroupData}
    return (
      <div>
          {this.props.groupName}
          <input list="browsers" />
          <datalist id="browsers">

          </datalist>
      </div>
    )
  }
}
function mapStateToProps(state){
return {EditUserGroupData:state.EditUserGroupData};
}
export default connect(mapStateToProps,{fetchEditUserGroupData})(EditDropDown);
