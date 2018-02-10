import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
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
        console.log('redirecting to previous location')
        //        this.props.authenticated?window.history.go(-1):null
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
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="form-group">
                    <label>Email:</label>
                    <Field name="email"
                        type="email" component={renderInput} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <Field name="password"
                        type="password" component={renderInput} />
                </div>
                {this.isAuthenticated()}
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </Form>
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
