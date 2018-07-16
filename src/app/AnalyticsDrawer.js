import React from 'react';
import PropTypes from 'prop-types';

import Drawer from 'material-ui/Drawer';



class TemporaryDrawer extends React.Component {
    constructor(props){
      super()
      this.state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
      };
    }


  toggleDrawer(side, open){
    this.setState({
      [side]: open
    });
  }

  render() {
    return (
      <div>
        <button  className="btn btn-primary" onClick={this.toggleDrawer('right', true)}>Open Right</button>
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
          </div>
        </Drawer>
      </div>
    );
  }
}



export default (TemporaryDrawer);
