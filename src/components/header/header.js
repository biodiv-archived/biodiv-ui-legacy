import React, {Component} from 'react';
import mystyle from './style/headerstyle.css';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends React.Component {
    constructor(props) {
      super(props);
      const tokenData=JSON.parse(localStorage.getItem('token'));
      this.state={
        token:tokenData
      }
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
            <li><a href="#">Species Pages</a></li>
            <li><a href="#">Taxon Namelist</a></li>
            <li><a href="#">Species Traits</a></li>
          </ul>
        </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">Observation <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><NavLink to="/Observation/list">Observations</NavLink></li>
            <li><a href="#">Checklists</a></li>
            <li><a href="#">Datasets</a></li>
          </ul>
        </li>
        <li><a href="#">Maps</a></li>
        <li><a href="#">Documents</a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">Contribute<span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="#">Contribute to Species page</a></li>
            <li><a href="#">Add Observation</a></li>
            <li><a href="#"> Add Multiple Observations</a></li>
            <li><a href="#"> Add a list</a></li>
            <li><a href="#"> Add Documents</a></li>
          </ul>
        </li>
        <li><a href="#">Discussions</a></li>
        <li><a href="#">Groups</a></li>
        <li><a href="#">Pages</a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">More <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="#">Activity</a></li>
            <li><a href="#">Participants</a></li>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">About Us</a></li>
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

        {this.props.authenticated?<NavLink to="/signout">Logout {this.props.userData? this.props.userData.id:null} </NavLink>:<NavLink to="/login">Login</NavLink>}


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
    userData:state.auth.userData
  };
}

export default connect(mapStateToProps)(Header);
