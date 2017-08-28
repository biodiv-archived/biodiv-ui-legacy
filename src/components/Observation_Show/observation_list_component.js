import React, {Component} from 'react';
import objstyle from './objstyle.css';
import ListComponent from './listView';
import GridComponent from './gridView';
class ObservationListComponent extends Component{
  render(){
    console.log("this.props.count",this.props.count)
   return(
   <div>
    {this.props.objs.length?
      this.props.view?<ListComponent   objsa={this.props.objs} />:<GridComponent objsa={this.props.objs} />:
    <div style={{height:'600px',width:'660x'}} className="container-fluid">
        <div className="row">
          <div className="col-sm-5">
          </div>
           <div className={`col-sm-2 loader`}>
           </div>
           <div className="col-sm-5">
           </div>
        </div>
    </div>
   }

   </div>
   )
  }
}
export default ObservationListComponent;
