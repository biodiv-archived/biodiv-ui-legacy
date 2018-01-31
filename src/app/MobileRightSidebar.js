import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import BackspaceIcon from 'material-ui-icons/Backspace';
import Chip from 'material-ui/Chip';
import style from './mobile_right_sidebar.css';
import LeftSidebar from './LeftSidebar';
import {ClearObservationPage} from '../actions/index';
const styles = {
  list: {
    width: 100,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
};

class SideBar extends Component {

constructor(props) {
  super(props);
  this.state = {
    open: {
      left: false
    }
  };
}



  clearFilter(){


  }
  toggleDrawer (side, open) {
    const drawerState = {};
    drawerState[side] = open;
    this.setState({ open: drawerState });
  };

  handleRightOpen () {this.toggleDrawer('left', true);}
  handleRightClose () {this.toggleDrawer('left', false);}

  render() {
    const classes = this.props.classes;

    const sideList = (

      <div className="container">
      <div className="row">
      <div className="btn btn-success input-block-level col-xs-6">
      <a  onClick={this.handleRightClose}> ApplyFilter </a>
      </div >
      <div className="btn btn-warning input-block-level col-xs-4">
      <a  onClick={this.clearFilter.bind(this)}> Clear  </a>
      </div >
       <div className="btn btn-danger input-block-level col-xs-2">
      <a  onClick={this.handleRightClose}> X </a>
      </div >
      </div>
      <div className="row">
      <LeftSidebar />
      </div>
      </div>
    );

    return (
      <div>
        <button  style={{position:'fixed',zIndex:'2'}} className="btn btn-primary btn-xs pull-right"  onClick={this.handleRightOpen}>Filters</button>
        <Drawer
          anchor="left"
          open={this.state.open.left}
          onRequestClose={this.handleRightClose}
          width='20%'
          >
          {sideList}
        </Drawer>
      </div>
    );
  }
}




export default connect(null,{ClearObservationPage})(SideBar);
