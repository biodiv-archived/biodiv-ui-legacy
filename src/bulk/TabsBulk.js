import React, {Component} from 'react';
import GroupsBulk from './GroupsBulk.js'

class TabsBulk extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
          <ul className="nav nav-tabs">
              <li className="active"><a href={"#_tab1"} data-toggle="tab">Groups</a></li>
          </ul>
          <div className="tab-content">
             <div className="tab-pane fade in active" id={"_tab1"}>
                   <div>
                   <GroupsBulk filterUrl={this.props.filterUrl} selectAll={this.props.selectAll} ids={this.props.ids}/>
                   </div>
             </div>
          </div>
      </div>
    )
  }
}

export default TabsBulk;
