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

import './register.css'
import {
        StyledText
      } from 'react-form';


var Recaptcha = require('react-recaptcha');

class ForgotPassword extends Component{

    constructor( props ) {
        super( props );
        var submittedValues = {};
        this.state = {
            submittedValues:submittedValues,
            defaultValues:{},
        };
    }
    componentWillMount(){
    }
    componentDidMount(){
      document.title = "Forgot password || "+this.props.title;
    }
    isAuthenticated(){
        const loggedIn = this.props.authenticated;
        if(loggedIn) {
            // if(this.props.location.state.from.pathname === "/map/upload"){
            //   this.props.history.push('/map/upload')
            // }
            this.props.closeModal ? this.props.closeModal() : this.props.history.push('/');

        }
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
         const validateEmail = ( email ) => {
             return !email ? 'Email is required.' : null;
         };

         return {
             email: validateEmail( values.email )
         };
     }

     warningValidator( values ) {
        return {
            email: null
         };
     }

     successValidator ( values, errors ) {
         const validateEmail = ( ) => {
          return !errors.email ? errors.email :errors.email;
         };
         return {
             email: validateEmail(values.email)
         };
     }

     handleSubmit(submittedValues){
         document.body.style.cursor = "wait";
         this.setState({loading:true});
         submittedValues['g-recaptcha-response'] = this.state.gRecaptchaResponse;

         this.setState({
             submittedValues: submittedValues,
             errors:{}
         })
         var options={
             method: 'POST',
             url :   Config.api.API_ROOT_URL+"/register/forgotPassword",
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
             if(Object.keys(this.state.errors).length>0){
               var msg = '';
               for(key in this.state.errors){
                 if(this.state.errors.hasOwnProperty(key)){
                   msg = msg + this.state.errors[key]
                 }
               }
               alert(msg );
             }
         })
     }

    resetRecaptcha() {
        this.recaptchaInstance.reset();
    };


    recaptchaCallback(response) {
    };

    recaptchaVerifyCallback(response) {
        this.setState({'gRecaptchaResponse':response});
    };

    recaptchaExpiredCallback(response) {
        this.setState({'gRecaptchaResponse':''});
    };

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
                                    <form onSubmit={formApi.submitForm} id="forgotPassword"  className="form-signin">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <label htmlFor="email">Email</label>
                                            </div>
                                            <div className="col-sm-9">
                                                <StyledText className="form-control" type="email" field="email" id="email" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <label htmlFor="Captcha" className="d-block"></label>
                                            </div>
                                            <div className="col-sm-9">
                                                <Recaptcha
                                                    sitekey={Config.api.googleRecaptchaKey}
                                                    type="image"
                                                    render="explicit"
                                                    verifyCallback={this.recaptchaVerifyCallback.bind(this)}
                                                    expiredCallback={this.recaptchaExpiredCallback.bind(this)}
                                                    onloadCallback={this.recaptchaCallback.bind(this)}
                                                />
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-sm-5"></div>
                                            <div className="col-sm-7">
                                                <button type="submit" className="mb-4 btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                        <br />
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
export default  withRouter(connect(mapStateToProps)(ForgotPassword));
