import React, {Component} from 'react';
import './navigation.css'
import TabsBulk from './TabsBulk.js'

class Navigate extends React.Component {
  constructor(props){
    super(props);

    this.openNav = this.openNav.bind(this)
    console.log("navigation")
  }

  openNav(){
    console.log("gggggg")
    document.getElementById("mySidenav").style.height = "30%";
  }
  closeNav(){
    document.getElementById("mySidenav").style.height = "0";
    this.props.resetBulk();
    this.props.resetSelectAll();
  }

  render(){
    return(
      <div id="mySidenav" className="sidenav">
        <a className="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
        <TabsBulk filterUrl={this.props.filterUrl} ids={this.props.ids} selectAll={this.props.selectAll}/>
      </div>
    )
  }
}

export default Navigate;
