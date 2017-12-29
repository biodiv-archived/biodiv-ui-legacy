import React, {Component} from 'react';

import {NavLink,withRouter} from 'react-router-dom';
import {getGroupName} from './HeaderApi';

import {connect} from 'react-redux';
import $ from 'jquery';
import {Config} from '../../Config'
import style from './style/headerstyle.css';

import Banner from './Banner';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      groupName:undefined,
      groupDetails:{}
    }
  }
  setGroupName(){
    let groupName=this.props.location.pathname.split("/")[2];
    let groupsyntax=this.props.location.pathname.split("/")[1];
    if(groupsyntax==="group"){
      getGroupName(groupName).then(data=>{
      this.setState({
        groupDetails:data,
        groupName
      })
    })
  }
  else{
    //TO FOR IBP GROUP
  }
}
  componentDidMount(){
    this.setGroupName();
  }

  render() {
    let userGroupDetails=this.state.groupDetails?this.state.groupDetails.data:null;

    return (
      <div className="container-fluid">
        <div className="row">
        <nav className="navbar navbar-default navbar-inverse" role="navigation" style={{
          marginLeft: '15px',
          marginBottom: '10px',
          marginTop: '0px'
        }}>
          <div className="bg-default">
            <div className="navbar-header pull-left">
              <NavLink to="/" className="navbar-brand">{this.props.title}
              </NavLink>
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="navbar-collapse collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Species
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/species/list`}>Species Pages</NavLink>:<NavLink to={`/species/list`}>Species Pages</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/namelist/index/?taxon=872&parentId=872&classificationId=265799&ranksToFetch=0,1&statusToFetch=ACCEPTED,SYNONYM&positionsToFetch=RAW,WORKING,CLEAN`}>Taxon Namelist</NavLink>:<NavLink to={`/namelist/index/?taxon=872&parentId=872&classificationId=265799&ranksToFetch=0,1&statusToFetch=ACCEPTED,SYNONYM&positionsToFetch=RAW,WORKING,CLEAN`}>Taxon Namelist</NavLink>}
                    </li>
                    <li>
                    {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/trait/list/?max=&offset=0`}>Species Traits</NavLink>:<NavLink to={`/trait/list/?max=&offset=0`}>Species Traits</NavLink>}
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Observation
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/observation/list`}>Observations
                    </NavLink>:<NavLink to={`/observation/list`}>Observations</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/checklist/index`}>Checklists
                    </NavLink>:<NavLink to={`/checklist/index`}>Checklists</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/datasource/list`}>Datasets
                    </NavLink>:<NavLink to={`/datasource/list`}>Datasets</NavLink>}
                    </li>
                  </ul>
                </li>
                <li>
                  {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/map`}>Maps
                </NavLink>:<NavLink to={`/map`}>Maps</NavLink>}
                </li>
                <li>
                  {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/document/list`}>Documents
                </NavLink>:<NavLink to={`/document/list`}>Documents</NavLink>}

                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Contribute<span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/species/contribute`}>Contribute to Species page
                    </NavLink>:<NavLink to={`/species/contribute`}>Contribute to Species page</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/observation/create`}>Add Observation
                    </NavLink>:<NavLink to={`/observation/create`}>Add Observation</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/observation/bulkCreate`}>  Add Multiple Observations
                    </NavLink>:<NavLink to={`/observation/bulkCreate`}>  Add Multiple Observations</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/checklist/create`}>Add a list
                    </NavLink>:<NavLink to={`/checklist/create`}>Add a list</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/document/create`}>
                    Add Documents</NavLink>:<NavLink to={`/document/create`}>Add Documents</NavLink>}
                    </li>
                  </ul>
                </li>
                <li>
                  {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/discussion/list`}>Discussions
                </NavLink>:<NavLink to={`/discussion/list`}>Discussions</NavLink>}
                </li>
                <li>
                  {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/group/list`}>Groups
                </NavLink>:<NavLink to={`/group/list`}>Groups</NavLink>}
                </li>
                <li>
                  {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/page/4246006`}>Pages
                </NavLink>:<NavLink to={`/page/4246006`}>Pages</NavLink>}
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">More
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/activityFeed/list`}>Activity
                    </NavLink>:<NavLink to={`/activityFeed/list`}>Activity</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/user/list`}>Participants
                    </NavLink>:<NavLink to={`/user/list`}>Participants</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/chart/show`}>Dashboard
                    </NavLink>:<NavLink to={`/chart/show`}>Dashboard</NavLink>}
                    </li>
                    <li>
                      {this.state.groupName?<NavLink to={`/group/${this.state.groupName}/theportal`}>About
                    </NavLink>:<NavLink to={`/theportal`}>About</NavLink>}

                    </li>
                  </ul>
                </li>

                <li style={{
                  paddingTop: '10px'
                }}>

                  <form id="demo-2">
                    <input type="search" placeholder="Search"/>
                  </form>
                </li>
              </ul>

            </div>
            {/* <!-- /.navbar-collapse -->*/}

            <div className="nav navbar-header pull-right margintople margintopde ">
              {this.props.authenticated
                ? <div >
                    <NavLink to={`/user/show/${this.props.userData
                      ? this.props.userData.id
                      : null}`}>{this.props.userData
                        ? this.props.userData.id
                        : null}
                    </NavLink>
                    {`\u00A0`}
                    <NavLink to="/logout">Logout</NavLink>
                  </div>
                : <NavLink to="/login">Login</NavLink>}
            </div>

          </div>
        </nav>
      </div>
      <div className="row">
        <Banner userGroup={userGroupDetails} />
      </div>


      </div>
    )
  }
}
function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated, userData: state.auth.userData, UserProfile: state.UserProfile};
}

export default withRouter(connect(mapStateToProps)(Header));
