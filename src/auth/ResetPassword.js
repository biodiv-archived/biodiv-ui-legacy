import React,{Component} from 'react';
import { Form, Text, Radio, RadioGroup, Select, Checkbox,Field } from 'react-form';
import { reduxForm } from 'redux-form';
import {NavLink,withRouter} from 'react-router-dom';
//import {Recaptcha} from 'react-recaptcha';
import {connect} from 'react-redux';
import {REGISTER_MESSAGE} from './AuthConstants';

import LocationSuggest from './LocationSuggest';
import MapSelector from './MapSelector';
import axios from 'axios';
import { Config } from '../Config';
import queryString from 'query-string';
import {
    StyledText,
    StyledTextArea,
    StyledRadio,
    StyledRadioGroup,
    StyledSelect,
    StyledCheckbox
} from 'react-form';

import './register.css'

class ResetPassword extends Component{

    constructor( props ) {
        super( props );
        this.state = {};
    }

    isAuthenticated(){
        const loggedIn = this.props.authenticated;
        if(loggedIn) {
            this.props.closeModal ? this.props.closeModal() : this.props.history.push('/');

        }
    }

    componentWillMount(){
    }

    onSubmitFailure (errors, formApi, onSubmitError ) {
        var key
        var msg = '';
        for(key in errors){
            if(errors.hasOwnProperty(key) && errors[key]!=null){
                msg =  msg + errors[key] + "\n"
            }
        }
        alert(msg)
    }

    errorValidator ( values )  {
        const validatePassword = ( password ) => {
            return !password ? 'Password is required.' : null;
        };
        const validatePassword2 = ( password2 ) => {
            return !password2 ? 'Password2 is required.' : null;
        };

        return {
            password: validatePassword( values.password ),
            password2: validatePassword2( values.password2 )
        };
    }

    warningValidator( values ) {
        const validatePassword = ( password ) => {
            return password && password.length < 6 ? 'Password must be longer than 6 characters.' : null;
        };
        const validatePassword2 = ( password2 ) => {
            return values.password && password2 && (values.password === password2) ? null : 'Passwords should match.';
        };
        return {
            password: validatePassword( values.password ),
            password2: validatePassword2( values.password2 ),
        };
    }

    successValidator ( values, errors ) {
        const validatePassword = ( ) => {
            return !errors.password ? null : errors.password;
        };
        const validatePassword2 = ( ) => {
            return !errors.password2 ? null : errors.password2;
        };
        return {
            password: validatePassword( values.password ),
            password2: validatePassword( values.password2 )
        };
    }


    handleSubmit(submittedValues){
        let pathname= document.location.pathname;
        let newparams = queryString.parse(document.location.search);
        submittedValues['t'] =  newparams.t;
        document.body.style.cursor = "wait";
        this.setState({loading:true});

        this.setState({
            submittedValues: submittedValues,
            errors:{}
        })
        var options={
            method: 'POST',
            url :   Config.api.API_ROOT_URL+"/register/resetPassword",
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
            data:queryString.stringify(submittedValues),
            json: 'true'
        }
        var errors ;
        var me = this;
        axios(options).then((response)=>{
            document.body.style.cursor = "default";
            me.setState({loading:false, registerMessage:response.data.msg});
            //window.scrollTo(0, 0);
        }).catch((response)=>{
            document.body.style.cursor = "default";
            this.setState({loading:false});

            errors = {};
            if(response.response.status == 400) {
                //var error;
                var i;


                for( i=0;i< response.response.data.length;i++) {

                    errors[response.response.data[i].path] = response.response.data[i].message;
                }
            }

            me.successValidator(submittedValues, errors);

            this.setState({
                submittedValues: submittedValues,
                errors:errors
            })
            var key;
            if(response.response.data.success == false || Object.keys(this.state.errors).length>0){
                var msg = '';
                if(response.response.data.msg)
                    msg += response.response.data.msg;
                for(key in this.state.errors){
                    if(this.state.errors.hasOwnProperty(key)){
                        msg = msg + this.state.errors[key]
                    }
                }
                alert(msg);
            }
        })
    }
    
    renderAlert() {
        if (this.state.registerMessage) {
            return (
                <div className="alert alert-info">
                    {this.state.registerMessage}
                </div>
            );
        }
    }



    render(){
        let defaultValues=this.state.defaultValues
        let me = this;
        return(
            <div className="container">
                <div className="signin-wrapper">
                    {this.isAuthenticated()}
                    <div className="row">
                        <div className="container col-sm-12">
                            { this.state.registerMessage ? (
                                me.renderAlert()
                            ) : (
                                <div>

                                    <Form 
                                        onSubmitFailure={this.onSubmitFailure}
                                        dontValidateOnMount={true}
                                        validateOnSubmit={true}
                                        defaultValues={defaultValues}
                                        validateError={this.errorValidator}
                                        validateWarning={this.warningValidator}
                                        validateSuccess={this.successValidator}
                                        onSubmit={this.handleSubmit.bind(this)}>
                                        { formApi => (
                                            <form onSubmit={formApi.submitForm} id="resetPassword"  className="form-signin">

                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label htmlFor="name">Password</label>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <StyledText type="password" className="form-control" field="password" id="password" />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label htmlFor="name">Password Again</label>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <StyledText className="form-control" type="password" field="password2" id="password2" />
                                                    </div>
                                                </div>


                                                <div className="row">
                                                    <div className="col-sm-5"></div>
                                                    <div className="col-sm-7">
                                                        <button type="submit" className="mb-4 btn btn-primary">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </Form>
                                </div>)}
                            </div>
                        </div>
                    </div>
            </div>

        )
    }
}

function mapStateToProps(state){
    return {
        dispatch:state.dispatch,
        authenticated: state.auth.authenticated,
        loginAlertMessage : state.auth.error, 
        PublicUrl:state.PublicUrl
    };
}
export default  withRouter(connect(mapStateToProps)(ResetPassword));
