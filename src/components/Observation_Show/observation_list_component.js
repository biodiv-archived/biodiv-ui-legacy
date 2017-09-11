import React, {Component} from 'react';
import objstyle from './objstyle.css';
import ListComponent from './listView';
import GridComponent from './gridView';
import {connect} from 'react-redux';

class ObservationListComponent extends Component{
  render(){
    console.log(this.props.Observation.count,"ccccccccccccccccccccccccccccccccc")
    console.log("this.props.count",this.props.count)
   return(

   <div>
    {
      this.props.view?<ListComponent   objsa={this.props.objs} />:<GridComponent objsa={this.props.objs} />
      }
      {this.props.Observation.count?null :<div style={{height:'600px',width:'660x'}} className="container-fluid">
        <div className="row">
          <div className="col-sm-5">
          </div>
           <div className={`col-sm-2 loader`}>
           </div>
           <div className="col-sm-5">
           </div>
        </div>
    </div>}
    

   </div>
   )
  }
}
function mapStateToProps(state){
return {Observation:state.Observation};
}
export default connect(mapStateToProps)(ObservationListComponent);
