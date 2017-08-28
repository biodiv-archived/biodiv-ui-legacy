import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import {login} from '../../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Login extends React.Component{
  constructor(props) {
    super(props);
    console.log("login called")
  }

  auth(e){
    e.preventDefault();
    var name=this.refs.name.value;
    var pass=this.refs.pass.value;
    this.props.login(name,pass);
            console.log(this.props.history)
    console.log(this.props.Login)
    this.props.Login!=="Bad credentials"?
    this.props.history.goBack():null
    }

  render(){
    return(
      <div className="well well-sm">
          <div className="row">
             <div className="col-md-12">
               Login via
               <div className="social-buttons">
                 <a href="#" className="btn btn-fb btn-primary btn-sm"><i className="fa fa-facebook"></i> Facebook</a>
                 <a href="#" className="btn btn-tw btn-primary btn-sm"><i className="fa fa-twitter"></i> Twitter</a>
               </div>
                               or
               <form className="form" role="form"  id="login-nav">
                   <div className="form-group">
                      <label  htmlFor="exampleInputEmail2">Email address</label>
                      <input type="email" ref="name" className="form-control" id="exampleInputEmail2" placeholder="Email address" required />
                   </div>
                   <div className="form-group">
                      <label  htmlFor="exampleInputPassword2">Password</label>
                      <input type="password" ref="pass" className="form-control" id="exampleInputPassword2" placeholder="Password" required />
                                            <div className="help-block text-right"><a href="">Forget the password ?</a></div>
                   </div>
                   <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block" onClick={this.auth.bind(this)}>Sign-In</button>
                   </div>
                   <div className="checkbox">
                      <label>
                      <input type="checkbox" /> keep me loggedIn
                      </label>
                   </div>
                </form>
             </div>
          </div>
          <div className="bottom text-center row">
            New here ? <NavLink to="/login/register" ><b>Join Us</b></NavLink>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state){

return {Login:state.Login};
}

function mapDispatchToProps(dispatch){

  return bindActionCreators({login},dispatch);
}

 export default connect(mapStateToProps,mapDispatchToProps)(Login);
