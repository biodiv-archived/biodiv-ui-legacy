import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserGroupList extends Component{
constructor(){
  super()
}
displayData(objs,index){
  return(
    <div>
      <ObservationListComponent objs={objs} index={index}/>
    </div>
  )
}


render(){
  return(
    <div>
        {this.props.GetUserG.map(this.displayData)}
    </div>
  )
  }
}
function mapStateToProps(state){

return {Observation:state.Observation};
}
export default connect(mapStateToProps)(ObservationList)
