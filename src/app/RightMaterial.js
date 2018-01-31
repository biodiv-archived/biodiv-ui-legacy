import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
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
import UniqueSpecies from '../observation/UniqueSpecies.js'

const styleSheet = {
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
}

class UndockedDrawer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: {
        top: false,
        left: false,
        bottom: false,
        right: false,
      },
      UniqueSpeciesOpen:false
    };
  }




  toggleDrawer (side, open) {
    const drawerState = {};
    drawerState[side] = open;
    this.setState({ open: drawerState,UniqueSpeciesOpen:!this.state.UniqueSpeciesOpen });
  };

  handleRightOpen () {this.toggleDrawer('right', true);}
  handleRightClose () {this.toggleDrawer('right', false);}

  render() {
    console.log(this.props.filterParams)
    const sideList = (
      <div >
            <UniqueSpecies params={this.props.filterParams}/>
      </div>
    );

    return (
      <div>
        <button className="btn btn-primary btn-xs"  onClick={this.handleRightOpen}>Click!</button>
        <Drawer
          anchor="right"
          open={this.state.open.right}
          onRequestClose={this.handleRightClose}
        >

          {this.state.UniqueSpeciesOpen==true?sideList:null}
        </Drawer>
      </div>
    );
  }
}

UndockedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(UndockedDrawer);
