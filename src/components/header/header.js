import React, {Component} from 'react';
import mystyle from './style/headerstyle.css';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
    constructor(props) {
      super(props);
      
    }
  render(){
  return (
    <div>
       <nav className="navbar navbar-default navbar-inverse" role="navigation">
         <div  className="container-fluid bg-default">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <NavLink to="/" className="navbar-brand" >{this.props.title}
    </NavLink>
    </div>

    <div className="collapse navbar-collapse " id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">Species <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="https://pamba.strandls.com/species/list">Species Pages</a></li>
            <li><a href="https://pamba.strandls.com/namelist/index/?taxon=872&parentId=872&classificationId=265799&ranksToFetch=0,1&statusToFetch=ACCEPTED,SYNONYM&positionsToFetch=RAW,WORKING,CLEAN">Taxon Namelist</a></li>
            <li><a href="https://pamba.strandls.com/trait/list/?max=&offset=0">Species Traits</a></li>
          </ul>
        </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">Observation <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><NavLink to="/Observation/list">Observations</NavLink></li>
            <li><a href="#">Checklists</a></li>
            <li><a href="https://pamba.strandls.com/datasource/list">Datasets</a></li>
          </ul>
        </li>
        <li><a href="https://pamba.strandls.com/map">Maps</a></li>
        <li><a href="https://pamba.strandls.com/document/list">Documents</a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">Contribute<span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="https://pamba.strandls.com/species/contribute">Contribute to Species page</a></li>
            <li><a href="https://pamba.strandls.com/observation/create">Add Observation</a></li>
            <li><a href="https://pamba.strandls.com/observation/bulkCreate"> Add Multiple Observations</a></li>
            <li><a href="https://pamba.strandls.com/checklist/create"> Add a list</a></li>
            <li><a href="https://pamba.strandls.com/document/create"> Add Documents</a></li>
          </ul>
        </li>
        <li><a href="https://pamba.strandls.com/discussion/list">Discussions</a></li>
        <li><a href="https://pamba.strandls.com/group/list">Groups</a></li>
        <li><a href="https://pamba.strandls.com/page/4246006">Pages</a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">More <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="https://pamba.strandls.com/activityFeed/list">Activity</a></li>
            <li><a href="https://pamba.strandls.com/user/list">Participants</a></li>
            <li><a href="https://pamba.strandls.com/chart/show">Dashboard</a></li>
            <li><a href="https://pamba.strandls.com/theportal">About Us</a></li>
          </ul>
        </li>
      </ul>

      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search"  />
        </div>
        <button type="submit" className="btn btn-default"><i className="fa fa fa-search"></i></button>
      </form>
      <ul className="nav navbar-nav navbar-right">
        <li className="login">

         {this.props.authenticated?
           <div style={{paddingTop:'15px'}}>
           <NavLink to={`/user/show/${this.props.userData? this.props.userData.id:null}`}>{this.props.userData? this.props.userData.id:null} </NavLink>
           {`\u00A0`}
           <NavLink to="/signout">Logout</NavLink>
         </div>
          :<NavLink to="/login">Login</NavLink>}
        </li>
      </ul>

    </div> {/* <!-- /.navbar-collapse -->*/}
  </div> {/*<!-- /.container-fluid -->*/}
</nav>
      <div className="jumbotron ">
          <h2 className="display-3"> <span className="jumbotron"></span></h2>
      </div>
</div>
  )
}
}
function mapStateToProps(state) {
  console.log("state inside header", state.auth)
  return {
    authenticated: state.auth.authenticated,
    userData:state.auth.userData,
    UserProfile:state.UserProfile
  };
}

export default connect(mapStateToProps)(Header);
