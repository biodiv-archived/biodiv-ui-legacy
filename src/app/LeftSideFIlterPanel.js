
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDrawer from 'react-drawer';

import 'react-drawer/lib/react-drawer.css';

import LeftSidebar from './LeftSidebar';
export default class LeftSideFIlterPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      position: 'left',
      noOverlay: true
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setNoOverlay = this.setNoOverlay.bind(this);
  }
  setPosition(e) {
    this.setState({position: e.target.value});
  }
  setNoOverlay(e) {
    this.setState({noOverlay: e.target.checked});
  }
  toggleDrawer() {
    this.setState({open: !this.state.open});
  }
  closeDrawer() {
    this.setState({open: false});
  }
  onDrawerClose() {
    this.setState({open: false});
  }
  render() {
    console.log("i called too");
    return (
      <div>
        <div>
            {!this.state.open ?<button className="btn btn-success btn-xs"
              style={{margin: 20,position:'fixed',zIndex:2010,top:'15%'}}
              onClick={this.toggleDrawer}
              disabled={this.state.open && !this.state.noOverlay}
              >
              <span>Filter</span>
            </button> :null}

        </div>
        <ReactDrawer
          open={this.state.open}
          position={this.state.position}
          onClose={this.onDrawerClose}
          noOverlay={this.state.noOverlay}>
          <button onClick={this.closeDrawer} style={{background:'#3c763d'}} className="btn btn-block btn-xs">Close</button>
          <LeftSidebar />
        </ReactDrawer>
      </div>
    );
  }
}
