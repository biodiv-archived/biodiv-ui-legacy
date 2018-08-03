import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import {NavLink,withRouter} from 'react-router-dom';
import * as AuthActions from './AuthActions';
import { Config } from '../Config';

import queryString from 'query-string';

import './register.css'

const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type} className="form-control"/>
        </div>
    );
}

class Login extends Component {

    componentWillMount() {
        let pathname= document.location.pathname;
        if(pathname == "/login/checkauth") {
            let credentials = queryString.parse(document.location.search);
            this.props.setCredentials(credentials);
        }
    }

    handleFormSubmit({ email, password }) {
        this.props.login({ email, password });
    }

    isAuthenticated(){
        const loggedIn = this.props.authenticated;
        //console.log(this.props.location.state.from.pathname)
        if(loggedIn) {
            // if(this.props.location.state.from.pathname === "/map/upload"){
            //   this.props.history.push('/map/upload')
            // }
                this.props.closeModal ? this.props.closeModal() : this.props.history.push('/');

        }
    }

    renderAlert() {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
            );
        }
    }

    componentDidMount(){
      document.title="Login || "+this.props.title
    }

    render(){
        const { handleSubmit } = this.props;
        let fbLink = "https://www.facebook.com/dialog/oauth?response_type=code&client_id="+Config.api.fbId+"&redirect_uri="+Config.api.API_ROOT_URL+"/login/callback?client_name=facebookClient&scope=email,user_location&state=biodiv-api-state";
        let googleLink = "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id="+Config.api.googleId+"&redirect_uri="+Config.api.API_ROOT_URL+"/login/callback?client_name=google2Client&access_type=offline&scope=email";
       return (
        <div className="container">
         <div className="signin-wrapper">
             <div className="row">
                     <div className="col-sm-12 col-xs-12 form-signin-heading"><a href= {`/${this.props.PublicUrl.url}login/auth`}>Login</a> | <a href= {`/${this.props.PublicUrl.url}register`}>Register</a> </div>
             </div>

             <div className="row">
                <div className="container col-sm-12">
                <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}  class="form-signin">
                <div className="row">
                <div className="col-sm-3">
                  <label>Email:</label>
                </div>
                <div className="col-sm-9">
                  <Field name="email"
                      type="email" className="form-control" component={renderInput} />
                </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <label>Password:</label>
                  </div>
                  <div className="col-sm-9">
                    <Field name="password"
                        type="password" className="form-control" component={renderInput} />
                        <a href= {`/${this.props.PublicUrl.url}register/forgotPassword`}>Forgot Password?</a>
                  </div>
                </div>
                    {this.isAuthenticated()}
                    {this.renderAlert()}
                  <div className="row">
                      <button action="submit" className="btn btn-lg btn-primary btn-block">Login</button>
                  </div>
                </Form>
                </div>
              </div>

              <div className="row orWrapper" style={{}}>
                  <span class="or text-muted">
                      OR
                  </span>
              </div>


              <div className="row">
                  <div className="col-sm-6">
                      <a className="btn btn-block btn-social btn-facebook" href={fbLink} >
                          <span className="fa fa-facebook"></span> Sign in with Facebook
                      </a>
                  </div>
                  <div className="col-sm-6">
                      <a className="btn btn-block btn-social btn-google" href={googleLink}>
                          <span className="fa fa-google"></span> Sign in with Google
                      </a>
                  </div>
              </div>


            </div>

          </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        PublicUrl:state.PublicUrl,
        authenticated: state.auth.authenticated
    };
}

Login = reduxForm({
    form: 'login'
})(Login);
export default   withRouter(connect(mapStateToProps, AuthActions)(Login));
