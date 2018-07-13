import React,{Component} from 'react';
import axios from 'axios';
import { Config } from '../Config';
import queryString from 'query-string';

class VerifyRegistration extends Component {

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
        this.verifyRegistration();
    }

    verifyRegistration() {
        let pathname= document.location.pathname;
        let newparams = queryString.parse(document.location.search);
        var options={
            method: 'GET',
            url :   Config.api.API_ROOT_URL+"/register/verifyRegistration",
            params : {
                't':newparams.t
            },
            json: 'true'
        }

        var me = this;
        axios(options).then((response)=>{
            document.body.style.cursor = "default";
            console.log(response);
            me.setState({loading:false, registerMessage:response.data.msg});
        }).catch((response)=>{
            document.body.style.cursor = "default";
            me.setState({loading:false, registerError:response.response.data.message});
        })

    }

  render(){
    return(
        <div className="container">
            {this.isAuthenticated()}
            { this.state.registerMessage ? (
                <div className="alert alert-info">
                    {this.state.registerMessage}
                </div>

            ) :'' }
            {this.state.registerError ? (
                <div className="alert alert-danger">
                    {this.state.registerError}
                </div>
            ) : ''}
        </div>
    )
  }
}

export default VerifyRegistration
