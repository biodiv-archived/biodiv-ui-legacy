import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import LeftSidebar from './LeftSidebar';

import style from './mobile_right_sidebar.css';

class TemporaryDrawer extends React.Component {
  constructor(){
    super()
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    }

  }


  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };


  render() {
    const { classes } = this.props;

    const sideList = (
      <div>
      <LeftSidebar />
      </div>
    );



    return (
      <div>
        <button   className=" floatButton btn btn-xs btn-primary hidden-sm hidden-md hidden-lg" onClick={this.toggleDrawer('left', true)}>Filter</button>

        <Drawer open={this.state.left}  onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <button className="btn btn-danger btn-block" onClick={this.toggleDrawer('left',false )}>Close</button>

            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}


export default TemporaryDrawer;
