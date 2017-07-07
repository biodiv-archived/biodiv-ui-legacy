import React, {Component} from 'react';
import {connect} from 'react-redux';
import ObservationListComponent from '../components/observation_list_component';

class ObservationList extends Component{
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
        {this.props.Observation.map(this.displayData)}
    </div>
  )
  }
}
function mapStateToProps(state){

return {Observation:state.Observation};
}
export default connect(mapStateToProps)(ObservationList)
