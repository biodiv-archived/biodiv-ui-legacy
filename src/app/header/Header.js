import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import $ from 'jquery';

import style from './style/headerstyle.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container-fluid">
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
                      <a href="https://pamba.strandls.com/species/list">Species Pages</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/namelist/index/?taxon=872&parentId=872&classificationId=265799&ranksToFetch=0,1&statusToFetch=ACCEPTED,SYNONYM&positionsToFetch=RAW,WORKING,CLEAN">Taxon Namelist</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/trait/list/?max=&offset=0">Species Traits</a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Observation
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      <NavLink to="/Observation/list">Observations</NavLink>
                    </li>
                    <li>
                      <a href="#">Checklists</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/datasource/list">Datasets</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://pamba.strandls.com/map">Maps</a>
                </li>
                <li>
                  <a href="https://pamba.strandls.com/document/list">Documents</a>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Contribute<span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      <a href="https://pamba.strandls.com/species/contribute">Contribute to Species page</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/observation/create">Add Observation</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/observation/bulkCreate">
                        Add Multiple Observations</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/checklist/create">
                        Add a list</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/document/create">
                        Add Documents</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://pamba.strandls.com/discussion/list">Discussions</a>
                </li>
                <li>
                  <a href="https://pamba.strandls.com/group/list">Groups</a>
                </li>
                <li>
                  <a href="https://pamba.strandls.com/page/4246006">Pages</a>
                </li>

                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">More
                    <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu" role="menu">
                    <li>
                      <a href="https://pamba.strandls.com/activityFeed/list">Activity</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/user/list">Participants</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/chart/show">Dashboard</a>
                    </li>
                    <li>
                      <a href="https://pamba.strandls.com/theportal">About Us</a>
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

        <div className="jumbotron" style={{
          marginLeft: '15px',
          marginBottom: '10px',
          marginTop: '0px'
        }}>

          <h2 className="">
            <span className="jumbotron"></span>
          </h2>

        </div>

      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log("state inside header", state.auth)
  return {authenticated: state.auth.authenticated, userData: state.auth.userData, UserProfile: state.UserProfile};
}

export default connect(mapStateToProps)(Header);
