import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import {NavLink} from 'react-router-dom';
import * as AuthActions from './AuthActions';

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
        //this.props.authenticated?this.props.history.push("/observation/list"):null
    }

    isAuthenticated(){
      const loggedIn = this.props.authenticated;
      if(loggedIn) {
        this.props.closeModal ? this.props.closeModal() : null
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
        return (
          <div className="container">
            <div className="col-sm-3 hidden-xs"></div>
            <div  style={{backgroundColor: 'white'}} className="col-sm-6 col-xs-12">
              <br />
              <div className="row">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4">
                    <NavLink to="/register">Register</NavLink>|
                    <NavLink to="/forget_password">Forget Password</NavLink>
                  </div>
                  <div className="col-sm-4"></div>
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
                    <div className="col-sm-6"></div>
                    <div className="col-sm-4">
                      <button action="submit" className="btn btn-primary">Sign in</button>
                    </div>
                    <div className="col-sm-2"></div>
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
