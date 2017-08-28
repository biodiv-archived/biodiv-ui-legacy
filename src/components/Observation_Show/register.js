import React, {Component} from 'react';
import {register} from '../../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Register extends React.Component{
  constructor(props) {
    super(props);
  }

  register(e){
    e.preventDefault();
    this.props.register("args")
            console.log(this.props.history)
    this.props.history.goBack();
  }

  render(){
    return(
      <div className="well well-sm">
          <div className="row">
             <div className="col-md-12">
                    <h2>Create Account</h2>
               <form className="form" role="form"   id="login-nav">
                   <div className="form-group">
                      <label  htmlFor="Email">Email address</label>
                      <input type="email" className="form-control" id="Email" placeholder="Email address" required />
                   </div>
                   <div className="form-group">
                      <label  htmlFor="InputPassword">Password</label>
                      <input type="password"  className="form-control" id="InputPassword" placeholder="Password" required />
                   </div>
                   <div className="form-group">
                      <label  htmlFor="InputPassword2">Password-again</label>
                      <input type="password"  className="form-control" id="InputPassword2" placeholder="Password again" required />
                   </div>
                   <div className="form-group">
                      <label  htmlFor="Name">Name</label>
                      <input type="name" className="form-control" id="Name" placeholder="Name" required />
                   </div>
                   <div className="form-group">
                      <label  htmlFor="Location">Location</label>
                      <input type="location" className="form-control" id="Location" placeholder="Location" required />
                   </div>
                   <div className="form-group">
                      <label  htmlFor="Sex">Sex</label>
                      <select name="sexType" className="input-large" id="sexType" placeholder="Select sex Type">
                            <option value="">Select One...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                      </select>
                   </div>
                   <div className="form-group">
                      <label  htmlFor="Occupation">Occupation</label>
                      <select name="occupationType" className="input-large" id="occupationType" placeholder="placeholder.occupation.select">
                            <option value="">Select One...</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Business">Business</option>
                            <option value="Education">Education</option>
                            <option value="Government">Government</option>
                            <option value="Research">Research</option>
                            <option value="Student">Student</option>
                            <option value="Other">Other</option>
                      </select>
                   </div>
                   <div className="form-group">
                      <label  htmlFor="Institution">Occupation</label>
                      <select name="institutionType" className="input-large" id="institutionType" placeholder="placeholder.institution.select">
                            <option value="">Select One...</option>
                            <option value="Corporation">Corporation</option>
                            <option value="Government">Government</option>
                            <option value="Non_governmental_organization">Non governmental organization</option>
                            <option value="Educational_institution">Educational institution</option>
                            <option value="Other">Other</option>
                      </select>
                   </div>
                   <div className="form-group ">
                      <label  htmlFor="Captcha" >
                            <img src="https://pamba.strandls.com/biodiv/jcaptcha/jpeg/imageCaptcha?id=1503465258" height="50px" width="100px"/>
                      </label>
                      <input type="captcha" className="form-control" id="Captcha" placeholder="Captcha" required  />
                   </div>
                   <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block" onClick={this.register.bind(this)}>Register</button>
                   </div>
                </form>
             </div>
          </div>
      </div>
    )
  }
}
function mapStateToProps(state){

}

function mapDispatchToProps(dispatch){

  return bindActionCreators({register},dispatch);
}

 export default connect(mapStateToProps,mapDispatchToProps)(Register);
