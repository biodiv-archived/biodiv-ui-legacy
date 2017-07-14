import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchObservations} from '../actions/index';

 class GetObservations extends Component{
    constructor(props){
      super(props);
      this.state={
        count:0
      }
      {this.props.fetchObservations()}
      this.loadMore=this.loadMore.bind(this);
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
             <button onClick={this.loadMore} type="submit" className="btn btn-secondry">LoadMore</button>
       </div>
    )
  }
}
function mapDispatchToProps(dispatch){

  return bindActionCreators({fetchObservations},dispatch);
}
export default connect(null, mapDispatchToProps)(GetObservations);
