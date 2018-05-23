import React, {Component} from 'react';
import GroupsBulk from './GroupsBulk.js'
import SpeciesBulk from './SpeciesBulk.js'

class TabsBulk extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
          <ul className="nav nav-tabs">
              <li className="active"><a href={"#_tab1"} data-toggle="tab">Groups</a></li>
              <li><a href={"#_tab2"} data-toggle="tab">Species groups</a></li>
          </ul>
          <div className="tab-content">
             <div className="tab-pane fade in active" id={"_tab1"}>
                   <div>
                   <GroupsBulk selectAllHack={this.props.selectAllHack} filterUrl={this.props.filterUrl} resetBulk={this.props.resetBulk} selectAllFunc={this.props.selectAllFunc} resetSelectAllFunc={this.props.resetSelectAllFunc} ids={this.props.ids} allObvs={this.props.allObvs}/>
                   </div>
             </div>
             <div className="tab-pane fade" id={"_tab2"}>
                <div>
                  <SpeciesBulk  selectAllHack={this.props.selectAllHack} filterUrl={this.props.filterUrl} resetBulk={this.props.resetBulk} selectAllFunc={this.props.selectAllFunc} resetSelectAllFunc={this.props.resetSelectAllFunc} ids={this.props.ids} allObvs={this.props.allObvs}/>
                </div>
             </div>
          </div>
      </div>
    )
  }
}

export default TabsBulk;
