import React, {Component} from 'react';
import './less.css'
import LeftSidebar from './LeftSidebar';

class Navigate extends React.Component {
  constructor(props){
    super(props);

    this.openNav = this.openNav.bind(this)
    //console.log("navigation")
  }

  openNav(){
      document.getElementById("mySidenav").style.width = "100%";
      document.getElementById("mySidenav").style.height = "0%";
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0%";
      document.getElementById("mySidenav").style.height = "0%";

  }

  render(){
    return(
      <div>
        <button className="closebtn btn btn-default"  onClick={this.openNav.bind(this)}>Click</button>

      <div id="mySidenav" className="sidenav">
        <div>
          <button className=" btn btn-warning"  onClick={this.closeNav.bind(this)}>Close</button>
          <LeftSidebar />

        </div>

      </div>
    </div>

    )
  }
}

export default Navigate;
