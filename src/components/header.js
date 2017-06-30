import React, { Component} from 'react';
import mystyle from './style/headerstyle.css';
const Header =(props)=>{

  return (
    <div>
      {/*
      <div className="navbar navbar-inverse navbar-static-top" role="navigation">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" rel="home" href="/" title="Aahan Krish's Blog - Homepage">{props.title}</a>
        </div>

        <div className="collapse navbar-collapse navbar-ex1-collapse">

          <ul className="nav navbar-nav">
            <li><a href="/topic/notes/">/notes</a></li>
            <li><a href="/topic/dev/">/dev</a></li>
            <li><a href="/topic/good-reads/">/good-reads</a></li>
            <li><a href="/topic/art/">/art</a></li>
            <li><a href="/topic/bookmarks/">/bookmarks</a></li>
            <li><a href="/all-topics/">/all</a></li>
          </ul>

          <div className="col-sm-3 col-md-3 pull-right">
            <form className="navbar-form" role="search" >
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term" />
                  <div className="input-group-btn">
                    <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                  </div>
              </div>
            </form>

          </div>
        </div>
      </div>
       */}


       <nav className="navbar navbar-default navbar-inverse" role="navigation">
         <div  className="container-fluid bg-success">
           {/* Brand and toggle get grouped for better mobile display -->*/}
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>


      </button>
      <a className="navbar-brand" href="#">{props.title}</a>
    </div>

  {/*/  <!-- Collect the nav links, forms, and other content for toggling --> */}
    <div className="collapse navbar-collapse " id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li><a href="#">Species</a></li>
        <li><a href="#">Observation</a></li>
        <li><a href="#">Maps</a></li>
        <li><a href="#">Documents</a></li>
        <li><a href="#">Discussions</a></li>
        <li><a href="#">Groups</a></li>
        <li><a href="#">Pages</a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li className="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li className="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>

      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search"  />
        </div>
        <button type="submit" className="btn btn-default"><i className="fa fa fa-search"></i></button>
      </form>

{/*
      <div className="container navbar-form navbar-right">
        <div className="row">
            <div className="col-md-4 col-md-offset-3">
                <form action="" className="search-form">
                    <div className="form-group has-feedback">
                		<label for="search" className="sr-only"></label>
                		<input type="text" className="form-control" name="search" id="search" placeholder="" />
                  		<span className="glyphicon glyphicon-search form-control-feedback"></span>
                	</div>
                </form>
            </div>
        </div>
      </div>
      */}
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
      											 <label className="sr-only" for="exampleInputEmail2">Email address</label>
      											 <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required />
      										</div>
      										<div className="form-group">
      											 <label className="sr-only" for="exampleInputPassword2">Password</label>
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
      <div className="jumbotron ">
          <h2 className="display-3"> <span className="jumboh">{props.title}</span></h2>
      </div>
        </div>
  )
}
export default Header;
