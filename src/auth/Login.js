import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import {NavLink} from 'react-router-dom';
import * as AuthActions from './AuthActions';
import { Config } from '../Config';

const renderInput = field => {
    const { input, type } = field;
    return (
        <div>
            <input {...input} type={type} className="form-control"/>
        </div>
    );
}

class Login extends Component {

    handleFormSubmit({ email, password }) {
        this.props.login({ email, password });
    }

    isAuthenticated(){
        const loggedIn = this.props.authenticated;
        if(loggedIn) {
            this.props.closeModal ? this.props.closeModal() : this.props.history.push('/');
        }
    }

    renderAlert() {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{errorMessage}
                </div>
            );
        }
    }

    render(){
        const { handleSubmit } = this.props;
        let fbLink = "https://www.facebook.com/dialog/oauth?response_type=code&client_id="+Config.api.fbId+"&redirect_uri="+Config.api.API_ROOT_URL+"/login/callback?client_name=facebookClient&scope=email,user_location,user_website&state=biodiv-api-state";
        let googleLink = "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id="+Config.api.googleId+"&redirect_uri="+Config.api.API_ROOT_URL+"/login/callback?client_name=google2Client&access_type=offline&scope=email";
       return (
          <div className="container">
            <div className="col-sm-3 hidden-xs"></div>
            <div  style={{backgroundColor: 'white'}} className="col-sm-6 col-xs-12">
              <br />

              <div className="row">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-8">
                    <NavLink to="/register">Register</NavLink>|
                    <NavLink to="/register/forgotPassword">Forgot Password</NavLink>
                  </div>
                  <div className="col-sm-2"></div>
              </div>
              <br />
              <div className="row">
                <div className="container col-sm-12">
                <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="row">
                <div className="col-sm-3">
                  <label>Email:</label>
                </div>
                <div className="col-sm-9">
                  <Field name="email"
                      type="email" className="form-control" component={renderInput} />
                </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-3">
                    <label>Password:</label>
                  </div>
                  <div className="col-sm-9">
                    <Field name="password"
                        type="password" className="form-control" component={renderInput} />
                  </div>
                </div>
                <br />
                    {this.isAuthenticated()}
                    {this.renderAlert()}
                  <div className="row">
                    <div className="col-sm-5"></div>
                    <div className="col-sm-5">
                      <button action="submit" className="btn btn-primary">Sign in</button>
                    </div>
                    <div className="col-sm-2"></div>
                  </div>
                  <br />
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
                </Form>
                </div>
              </div>
              <br />
            </div>
            <div className="col-sm-2 hidden-xs"></div>

          </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
         authenticated: state.auth.authenticated
     };
}

Login = reduxForm({
 form: 'login'
})(Login);
export default  connect(mapStateToProps, AuthActions)(Login);
