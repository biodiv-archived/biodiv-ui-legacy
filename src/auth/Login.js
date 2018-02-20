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
                    <div className="col-sm-5"></div>
                    <div className="col-sm-5">
                      <button action="submit" className="btn btn-primary">Sign in</button>
                    </div>
                    <div className="col-sm-2"></div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-sm-6">
                      <a target="_blank" href="https://www.facebook.com/login.php?skip_api_login=1&api_key=115305755799166&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.10%2Fdialog%2Foauth%3Fredirect_uri%3Dhttp%253A%252F%252Fapi.local.ibp.org%252Flogin%252Fcallback%253Fclient_name%253DfacebookClient%26state%3Dbiodiv-api-state%26scope%3Duser_likes%252Cuser_about_me%252Cuser_birthday%252Cuser_education_history%252Cemail%252Cuser_hometown%252Cuser_relationship_details%252Cuser_location%252Cuser_religion_politics%252Cuser_relationships%252Cuser_website%252Cuser_work_history%26response_type%3Dcode%26client_id%3D115305755799166%26ret%3Dlogin%26logger_id%3D7a4c3278-f44e-89ec-8aaa-5bce47a177ab&cancel_url=http%3A%2F%2Fapi.local.ibp.org%2Flogin%2Fcallback%3Fclient_name%3DfacebookClient%26error%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3Dbiodiv-api-state%23_%3D_&display=page&locale=en_GB&logger_id=7a4c3278-f44e-89ec-8aaa-5bce47a177ab" className="btn btn-block btn-social btn-facebook">
                        <span className="fa fa-facebook"></span> Sign in with Facebook
                      </a>
                    </div>
                    <div className="col-sm-6">
                      <a className="btn btn-block btn-social btn-google">
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
