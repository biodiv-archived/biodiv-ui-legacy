import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchObservations} from '../actions/index';
import ObservationListComponent from '../components/observation_list_component';

 class GetObservations extends Component{
    constructor(props){
      super(props);
      this.state={
        count:0
      }
      {this.props.fetchObservations()}
      this.loadMore=this.loadMore.bind(this);
    }

    displayData(objs,index){
      return(
        <div>
          <ObservationListComponent objs={objs} index={index}/>
        </div>
      )
    }

loadMore(){
  let count=this.state.count;
  count=count+1;
  this.setState({
    count:count
  })
  this.props.fetchObservations(count);
}
  render(){
    return(
       <div>
              {this.props.Observation.map(this.displayData)}
             <button onClick={this.loadMore} type="submit" className="btn btn-secondry">LoadMore</button>
       </div>
    )
  }
}
function mapStateToProps(state){

return {Observation:state.Observation};
}

function mapDispatchToProps(dispatch){

  return bindActionCreators({fetchObservations},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(GetObservations);
