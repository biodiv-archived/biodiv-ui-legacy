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
      PublicUrl:this.props.PublicUrl
    }
  }

  componentDidMount(){

  }


  render() {
    //console.log("authenticayted or not",this.props.authenticated)
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
                      <NavLink to={`/${this.props.PublicUrl}species/list`}>Species Pages</NavLink>
                    </li>
                    <li>
                    { <NavLink to={`/${this.props.PublicUrl}namelist/index/?taxon=872&parentId=872&classificationId=265799&ranksToFetch=0,1&statusToFetch=ACCEPTED,SYNONYM&positionsToFetch=RAW,WORKING,CLEAN`}>Taxon Namelist</NavLink>}
                    </li>
                    <li>
                  <NavLink to={`/${this.props.PublicUrl}trait/list/?max=&offset=0`}>Species Traits</NavLink>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Observation
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      <NavLink to={`/${this.props.PublicUrl}observation/list`}>Observations
                    </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/${this.props.PublicUrl}checklist/index`}>Checklists
                    </NavLink>
                    </li>
                    <li>
                      {<NavLink to={`/${this.props.PublicUrl}datasource/list`}>Datasets
                    </NavLink>}
                    </li>
                  </ul>
                </li>
                <li>
                  {<NavLink to={`/${this.props.PublicUrl}map`}>Maps
                </NavLink>}
                </li>
                <li>
                  {<NavLink to={`/${this.props.PublicUrl}document/list`}>Documents
                </NavLink>}

                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Contribute<span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      {<NavLink to={`/${this.props.PublicUrl}species/contribute`}>Contribute to Species page
                    </NavLink>}
                    </li>
                    <li>
                      {<NavLink to={`/${this.props.PublicUrl}observation/create`}>Add Observation
                    </NavLink>}
                    </li>
                    <li>
                      {<NavLink to={`/${this.props.PublicUrl}observation/bulkCreate`}>  Add Multiple Observations
                    </NavLink>}
                    </li>
                    <li>
                      {<NavLink to={`/${this.props.PublicUrl}checklist/create`}>Add a list
                    </NavLink>}
                    </li>
                    <li>
                      {<NavLink to={`/${this.props.PublicUrl}document/create`}>
                    Add Documents</NavLink>}
                    </li>
                  </ul>
                </li>
                <li>
                  {<NavLink to={`/${this.props.PublicUrl}discussion/list`}>Discussions
                </NavLink>}
                </li>
                <li className="dropdown">
                  {<NavLink className="dropdown-toggle" data-toggle="dropdown" to={`/${this.props.PublicUrl}group/list`}>Groups<span className="caret"></span></NavLink>}
                    <ul className="dropdown-menu pre-scrollable" style={{'height':'500px','width':'200px'}} role="menu">

                    {this.props.UserGroupList?this.props.UserGroupList.map((item,index)=>{
                      return (
                        <div key={index} style={{'border':'1px'}}>
                          <NavLink to={`/group/${item.webaddress}/show`}><li><img src={`/biodiv/userGroups/${item.icon}`} height="30px" width="30px"/>{item.name}</li> </NavLink >
                        </div>
                      )
                    }):"Loading...."}
                    </ul>
                </li>
                <li>
                  {<NavLink to={`/${this.props.PublicUrl}page/4246006`}>Pages
                </NavLink>}
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">More
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      {<NavLink to={`/${this.props.PublicUrl}activityFeed/list`}>Activity
                    </NavLink>}
                    </li>
                    <li>
                      {<NavLink to={`/${this.props.PublicUrl}user/list`}>Participants
                    </NavLink>}
                    </li>
                    <li>
                      {<NavLink to={`/${this.props.PublicUrl}chart/show`}>Dashboard
                    </NavLink>}
                    </li>
                    <li>
                    <NavLink to={`/${this.props.PublicUrl}theportal`}>About
                    </NavLink>

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
        <Banner userGroupList={this.props.UserGroupList} groupName={this.props.groupName} />
      </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userData: state.auth.userData,
    UserProfile: state.UserProfile,
    UserGroupList:state.UserGroupList,
    PublicUrl:state.PublicUrl.url,
    groupName:state.PublicUrl.groupName
  };
}

export default withRouter(connect(mapStateToProps)(Header));
