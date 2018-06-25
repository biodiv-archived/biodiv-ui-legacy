import React,{Component} from 'react';
import { Form, Text, Radio, RadioGroup, Select, Checkbox,Field } from 'react-form';
import {NavLink} from 'react-router-dom';
//import {Recaptcha} from 'react-recaptcha';
import {connect} from 'react-redux';

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

var Recaptcha = require('react-recaptcha');
//import Recaptcha from 'react-recaptcha';
 const profession = [
   {
     label: 'Agriculture',
     value: 'Agriculture'
   },
   {
     label: 'Business',
     value: 'Business'
   },
   {
     label: "Education",
     value: 'Education'
   },
   {
     label: "Government",
     value: 'Government'
   },
   {
     label: "Research",
     value: 'Research'
   },
   {
     label: "Student",
     value: 'Student'
   },
   {
     label: "Other",
     value: 'Other'
   }
 ];
const institutions=[
    {
      label:"Corporation",
      value:"Corporation"
    },
    {
      label:"Government",
      value:"Government"
    },
    {
      label:"Non Government Organization",
      value:"Non Government Organization"
    },
    {
      label:"Educational Institution",
      value:"Educational Institution"
    },
    {
      label:"Other",
      value:"Other"
    }
];

class BasicForm extends Component {

     constructor( props ) {
         super( props );
         var submittedValues = {};
         this.state = {
           submittedValues:submittedValues,
           defaultValues:{},
         };
     }

    getUrlParams(){
       let pathname= document.location.pathname;
         let newparams = queryString.parse(document.location.search);
         if(pathname=="/register"){
            let defaultValues={};
           if(newparams.name){
             defaultValues["name"]=newparams.name;
           }
           if(newparams.email){
             defaultValues["email"]=newparams.email;
           }
           this.setState({
              defaultValues
           })

         }

     }
     componentWillMount(){
       this.getUrlParams();

     }
     componentDidMount(){

         MapSelector();

     }

     onSubmitFailure (errors, formApi, onSubmitError ) {
       //console.log(errors)
       var key
       var msg = '';
       for(key in errors){
         if(errors.hasOwnProperty(key) && errors[key]!=null){
           msg =  msg + errors[key] + "\n"
         }
       }
       alert(msg)
       console.log("failed onSubmit")
       console.log(msg)
     }

     errorValidator ( values )  {
       //console.log("error",values)
         const validateName = ( name ) => {
             return !name ? 'Name is required.' : null;
         };
         const validateEmail = ( email ) => {
             return !email ? 'Email is required.' : null;
         };
         const validatePassword = ( password ) => {
             return !password ? 'Password is required.' : null;
         };
         const validatePassword2 = ( password2 ) => {
             return !password2 ? 'Password2 is required.' : null;
         };
         const validateLocation = ( location ) => {
             return !location ? 'Location is required.' : null;
         };

         const validateMapLocation = ( mapLocation )=>{
           return  document.getElementById('gmap').value == null ? 'Location is required.' : null;
         }

         return {
             name: validateName(values.name),
             email: validateEmail( values.email ),
             password: validatePassword( values.password ),
             password2: validatePassword2( values.password2 ),
             location: validateLocation( values.location ),
             mapLocation:validateMapLocation(values.mapLocation)
         };
     }

     warningValidator( values ) {
         const validateName = ( name ) => {
             return name && name.length < 2 ? 'Name must be longer than 2 characters.' : null;
         };
         /*         const validateEmail = ( email ) => {
             return email && email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? 'Email is invalid.' : null;
         };*/
         const validatePassword = ( password ) => {
             return password && password.length < 6 ? 'Password must be longer than 6 characters.' : null;
         };
         const validatePassword2 = ( password2 ) => {
             return values.password && password2 && (values.password === password2) ? null : 'Passwords should match.';
         };
        return {
            name: validateName(values.name),
            email: null,//validateEmail( values.email ),
            password: validatePassword( values.password ),
            password2: validatePassword2( values.password2 ),
            location: null,//validateLocation( values.location )
         };
     }

     successValidator ( values, errors ) {
       //console.log("success",values,errors)
         const validateName = ( ) => {
             return !errors.name ? null : errors.name;
         };
         const validateEmail = ( ) => {
          return !errors.email ? errors.email :errors.email;
         };
         const validatePassword = ( ) => {
             return !errors.password ? null : errors.password;
         };
         const validatePassword2 = ( ) => {
             return !errors.password2 ? null : errors.password2;
         };
         const validateLocation = ( ) => {
             return !errors.location ? null : errors.location;
         };
         const validateMapLocation = () => {
            return !errors.mapLocation ? null : errors.mapLocation;
         }
         return {
             name: validateName( values.name ),
             email: validateEmail(values.email),
             password: validatePassword( values.password ),
             password2: validatePassword( values.password2 ),
             location: validateLocation( values.location ),
             mapLocation:validateMapLocation(values.mapLocation)
         };
     }

     handleSubmit(submittedValues){

         var mapDiv = document.getElementById('gmap');
         submittedValues.latitude = mapDiv.value.lat();
         submittedValues.longitude = mapDiv.value.lng();
         submittedValues['g-recaptcha-response'] = this.state.gRecaptchaResponse;
         //TODO:if webaddress is present in url then add in request param
         console.log(this.props.PublicUrl);
         submittedValues['webaddress'] = this.props.PublicUrl.groupName;
         
         this.setState({
             submittedValues: submittedValues,
             errors:{}
         })
         var options={
             method: 'POST',
             url :   Config.api.API_ROOT_URL+"/register",
             headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
             data:queryString.stringify(submittedValues),
             json: 'true'
         }
         var errors ;
         var me = this;
         axios(options).then((response)=>{

             alert(response.data.msg);
             this.props.history.push('/login');
             //this.setState({modalIsOpen: false});
         }).catch((response)=>{

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
        console.log(response)
        this.setState({'gRecaptchaResponse':response});
    };
    recaptchaExpiredCallback(response) {
        this.setState({'gRecaptchaResponse':''});
    };


   render() {
       let fbLink = "https://www.facebook.com/dialog/oauth?response_type=code&client_id="+Config.api.fbId+"&redirect_uri="+Config.api.API_ROOT_URL+"/login/callback?client_name=facebookClient&scope=email,user_location&state=biodiv-api-state";
       let googleLink = "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id="+Config.api.googleId+"&redirect_uri="+Config.api.API_ROOT_URL+"/login/callback?client_name=google2Client&access_type=offline&scope=email";
       let defaultValues=this.state.defaultValues
       return (
        <div className="container">
         <div className="signin-wrapper">
                 <div className="row">
                     <div className="col-sm-12 col-xs-12 form-signin-heading"><NavLink to="/login">Login</NavLink> | <NavLink to="/register">Register</NavLink> </div>
                 </div>
             <Form
                  onSubmitFailure={this.onSubmitFailure}
                 dontValidateOnMount={true}
                 validateOnSubmit={true}
                 defaultValues={defaultValues}
                  validateError={this.errorValidator}
                  validateWarning={this.warningValidator}
                  validateSuccess={this.successValidator}
                 onSubmit={this.handleSubmit.bind(this)}>
                 { formApi => {
                     return (
                         <form onSubmit={formApi.submitForm} id="registerForm" class="form-signin">
                             <div className="row">
                                 <div className="col-sm-3">
                                     <label htmlFor="name">Name</label>
                                 </div>
                                 <div className="col-sm-9">
                                     <StyledText className="form-control" field="name" id="name"/>
                                 </div>
                             </div>

                             <div className="row">
                                 <div className="col-sm-3">
                                     <label htmlFor="name">Email</label>
                                 </div>
                                 <div className="col-sm-9">
                                     <StyledText className="form-control" type="email" field="email" id="email" />
                                 </div>
                             </div>

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
                                 <div className="col-sm-3">
                                     <label htmlFor="name">Gender</label>
                                 </div>
                                 <div className="col-sm-9">

                                     <StyledRadioGroup field="sexType">
                                         { group => (
                                             <div>
                                                 <Radio group={group} value="male" id="male" className="mr-3 d-inline-block" />
                                                 <label htmlFor="male" className="mr-2">Male</label>
                                                 {'                 '}
                                                 <Radio group={group} value="female" id="female" className="d-inline-block" />
                                                 <label htmlFor="female" className="mr-2">Female</label>

                                             </div>
                                         )}
                                     </StyledRadioGroup>

                                 </div>
                             </div>

                             <div className="row">
                                 <div className="col-sm-3">
                                     <label htmlFor="profession" className="d-block">Profession</label>
                                 </div>
                                 <div className="col-sm-9">
                                     <StyledSelect className="form-control" field="occupationType" id="profession" options={profession} style={{'width':'100%'}} />
                                 </div>
                             </div>

                             <div className="row">
                                 <div className="col-sm-3">
                                     <label htmlFor="institution" className="d-block">Institution</label>
                                 </div>
                                 <div className="col-sm-9">
                                     <StyledSelect className="form-control" field="institutionType" id="institution" options={institutions}  style={{'width':'100%'}}/>
                                 </div>
                             </div>

                             <div className="row">
                                 <StyledText type="text" className="controls form-control" field="mapLocation" id="pac-input" placeholder="Enter a location" />
                                 <div className="col-sm-3">
                                     <label htmlFor="location" className="d-block">Location</label>
                                 </div>
                                 <div className="col-sm-9">
                                     <div  className="form-control" id="gmap">
                                     </div>
                                     <div id="infowindow-content">
                                     </div>
                                 </div>
                             </div>

                             <div className="row">
                                 <div className="col-sm-3">
                                     <label htmlFor="location" className="d-block">Location Title</label>
                                 </div>
                                 <div className="col-sm-9">
                                     <StyledText type="text" className="form-control" field="location" id="location-name" placeholder="Enter a name or choose from map above" />
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
                                 <div className="col-sm-9">
                                     By registering you agree to our <a className="ibpLink" href={Config.api.IBP_URL+"/page/4250246"}>Terms &amp; Conditions</a> and <a className="ibpLink" href={Config.api.IBP_URL+"/page/12651147"}>Privacy Policy</a> on the use of our site
                                 </div>
                                 <div className="col-sm-3">
                                     <button id="registerButton" type="submit" className="mb-4 btn btn-block btn-primary pull-right">Register</button>
                                 </div>
                             </div>

                         </form>
                     )}}
                 </Form>

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
function mapStateToProps(state){
return {PublicUrl:state.PublicUrl};
}

function mapDispatchToProps(dispatch){
  return null;
}

 export default connect(mapStateToProps)(BasicForm);
