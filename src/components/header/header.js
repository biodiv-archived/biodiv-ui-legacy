import React  from 'react';
import mystyle from './style/headerstyle.css';
const Header =(props)=>{

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
      <a className="navbar-brand" href="#">{props.title}</a>
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
            <li><a href="#">Observations</a></li>
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
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span className="caret"></span></a>
			       <ul id="login-dp" className="dropdown-menu">
      				 <li>
      					 <div className="row">
      							<div className="col-md-12">
      								Login via
      								<div className="social-buttons">
      									<a href="#" className="btn btn-fb btn-primary btn-sm"><i className="fa fa-facebook"></i> Facebook</a>
      									<a href="#" className="btn btn-tw btn-primary btn-sm"><i className="fa fa-twitter"></i> Twitter</a>
      								</div>
                                      or
      								<form className="form" role="form" method="post" action="login"  id="login-nav">
      										<div className="form-group">
      											 <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
      											 <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required />
      										</div>
      										<div className="form-group">
      											 <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
      											 <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required />
                                                   <div className="help-block text-right"><a href="">Forget the password ?</a></div>
      										</div>
      										<div className="form-group">
      											 <button type="submit" className="btn btn-primary btn-block">Sign in</button>
      										</div>
      										<div className="checkbox">
      											 <label>
      											 <input type="checkbox" /> keep me logged-in
      											 </label>
      										</div>
      								 </form>
      							</div>
      							<div className="bottom text-center">
      								New here ? <a href="#"><b>Join Us</b></a>
      							</div>
      					 </div>
      				</li>
			    </ul>
        </li>
      </ul>

    </div> {/* <!-- /.navbar-collapse -->*/}
  </div> {/*<!-- /.container-fluid -->*/}
</nav>
      <div className="jumbotron">
          <h2 className="display-3"> <span className="jumboh"></span></h2>
      </div>
</div>
  )
}
export default Header;
