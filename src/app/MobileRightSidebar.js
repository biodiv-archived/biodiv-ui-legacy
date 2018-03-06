import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import LeftSidebar from './LeftSidebar';

class SideBar extends Component {

constructor(props) {
  super(props);
  this.state = {
      left: false
  };
  this.toggleDrawer=this.toggleDrawer.bind(this);
  this.handleRightOpen=this.handleRightOpen.bind(this)
  this.handleRightClose=this.handleRightClose.bind(this)
}

  toggleDrawer ( open) {
    this.setState({
      left:open
    });
  };

  handleRightOpen () {
    this.toggleDrawer( true);
  }
  handleRightClose (){
     this.toggleDrawer( false);
   }

  render() {


    const sideList = (
      <div >
        <h1>hey</h1>
      </div>
    );

    return (
      <div>
        <button  style={{position:'fixed',zIndex:'1000'}} className="btn btn-primary btn-xs pull-right"  onClick={this.handleRightOpen}>Filters</button>
        <Drawer
          anchor="left"
          open={this.state.left}
          onRequestChange={this.handleRightClose}
          width='100%'
          >
          {sideList}
        </Drawer>
      </div>
    );
  }
}

export default SideBar;
