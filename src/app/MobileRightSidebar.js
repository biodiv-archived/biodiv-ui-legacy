import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import LeftSidebar from './LeftSidebar';



export default class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    const sideList = (
      <div style={{width:'100%'}} >
      <LeftSidebar />
      </div>
    );
    return (
      <div>
        <button
          label="Open Drawer"
          onClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestClose={(open) => this.setState({open})}
        >
          {sideList}
        </Drawer>
      </div>
    );
  }
}
